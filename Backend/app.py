from flask import Flask, request, jsonify, g
from pathlib import Path
import sqlite3
import uuid
import os
import binascii
import hashlib
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import time

# //////////////////////////////////
# /////     Configuration      /////
# //////////////////////////////////

#defining Flask
app = Flask(__name__)

# Add CORS so the frontend can fetch data
CORS(app)

# Path to the SQLite database
# DATABASE_PATH = 'os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance', 'casino_heist.db')'
DATABASE_PATH = Path('./instance/casino_heist.db')

# creating a path to the database directly
def get_db():
    """Open a new database connection if there is none yet."""
    if 'db' not in g:
        g.db = sqlite3.connect(DATABASE_PATH)
        g.db.row_factory = sqlite3.Row  # To return rows as dictionaries
    return g.db

# if not used anymore it will close the path to the db
@app.teardown_appcontext
def close_db(exception):
    """Close the database connection at the end of the request."""
    db = g.pop('db', None)
    if db is not None:
        db.close()

# //////////////////////////////////
# /////      SECRET_KEY        /////
# //////////////////////////////////

# Generate a 32-byte random secret key
def generate_secret_key():
    return binascii.hexlify(os.urandom(32)).decode()

SECRET_KEY = generate_secret_key()

# //////////////////////////////////
# /////      Generation        /////
# //////////////////////////////////

def generate_token(user_id, username):
    payload = {
        "user_id": user_id,
        "user": username,
        "exp": time.time() + 43200
    }
    # print(payload)
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

# //////////////////////////////////
# /////      Validation        /////
# //////////////////////////////////

# endpoint to validate JWT token
@app.route('/validate-token', methods=['POST'])
def validate_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'Authorization header is missing'}), 400

    token = auth_header.split(" ")[1] if " " in auth_header else None
    if not token:
        return jsonify({'error': 'Token is missing'}), 400

    try:
        # Decode the token
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded.get('user_id')  # Assuming user_id is stored in the JWT

        # Check if the token is in the whitelist and fetch the expiration date
        expiration = get_token_expiration(user_id, token)
        if expiration is None:
            return jsonify({'error': 'Token is not whitelisted'}), 401

        # print("this is expiration", expiration)
        # print(time.time(), expiration)
        if expiration < time.time():
            return jsonify({'error': 'Expired'}), 401
        print(f'Token decoded: {decoded}')
        return jsonify({'message': 'Token is valid', 'user': decoded['user']}), 200
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

# @dev - get token expiration from the database
def get_token_expiration(user_id, token):
    try:
        db = get_db()
        cursor = db.execute('SELECT expiration FROM Whitelist WHERE userId = ? AND jwt = ?', (user_id, token))
        result = cursor.fetchone()
        
        # Return the expiration date if found, otherwise None
        return result['expiration'] if result else None
    
    except Exception as e:
        print(f"Error fetching tokens for user {user_id}: {e}")
        return []
    
# //////////////////////////////////
# /////        Routes          /////
# //////////////////////////////////

# Route to register a new user
@app.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # Validate input
        if not username or not email or not password or not confirm_password:
            return jsonify({'error': 'Missing fields'}), 400

        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400
        
        # Generate a unique UUID for the user
        user_id = str(uuid.uuid4())

        # Hash the password for security
        hashed_password = generate_password_hash(password)

        # Insert the user into the database
        db = get_db()
        
        cursor = db.execute("SELECT challengeId FROM Challenges")
        challengesId = cursor.fetchall()
        challenge_ids = [row[0] for row in challengesId]
        challenge_ids.sort()

        try:
            db.execute(
                'INSERT INTO User (userId, userHandler, userEmail, userPassword) VALUES (?, ?, ?, ?)',
                (user_id, username, email, hashed_password)
            )
            for challenge_id in challenge_ids:
                try:
                    cursor.execute('''
                        INSERT INTO ChallengeCompletion (userId, challengeId)
                        VALUES (?, ?)
                    ''', (user_id, challenge_id))
                except sqlite3.IntegrityError:
                    print(f"ChallengeCompletion for challengeId {challenge_id} already exists.")
            db.commit()
            return jsonify({'message': 'User registered successfully'}), 201
        except sqlite3.IntegrityError:
            return jsonify({'error': 'Username or email already exists'}), 400

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during registration'}), 500

# Route to log in an existing user
@app.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json() 
        username = data.get('username')
        password = data.get('password')

        # Validate input
        if not username or not password:
            return jsonify({'error': 'Missing fields'}), 400

        # Fetch the user from the database using the username
        db = get_db()
        cursor = db.execute('SELECT * FROM User WHERE userHandler = ?', (username,))
        user = cursor.fetchone()

        if user is None or not check_password_hash(user['userPassword'], password):
            return jsonify({'error': 'Invalid username or password'}), 401

        user_id = user['userId']
        token = generate_token(user_id, username)
        try:
            token.decode()
        except(UnicodeDecodeError, AttributeError):
            pass
        print(token)
        decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        # print(decoded)
        # Calculate the expiration time (24 hours from now)
        expiration_time = int(decoded['exp'])

        # Store the token and its expiration time in the database
        db.execute('DELETE FROM Whitelist WHERE userId = ?', (user_id,))
        db.execute(
            'INSERT INTO Whitelist (userId, jwt, expiration) VALUES (?, ?, ?)',
            (user_id, token, expiration_time)
        )
        db.commit()
        print(decoded)
        print(expiration_time)

        return jsonify({"message": "Login successful", "token": token}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during login'}), 500

# Route to log out an existing user
@app.route('/logout', methods=['POST'])
def logout_user():
    try:
        token = request.headers.get('Authorization').split()[1]

        # Validate that the token exists in the whitelist
        db = get_db()
        cursor = db.execute(
            'SELECT * FROM Whitelist WHERE jwt = ?', (token,)
        )
        whitelisted_token = cursor.fetchone()

        if whitelisted_token is None:
            return jsonify({'error': 'Invalid or missing token'}), 401

        # Remove the token from the whitelist
        db.execute(
            'DELETE FROM Whitelist WHERE jwt = ?',
            (token,)
        )
        db.commit()

        return jsonify({"message": "Logout successful"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred during logout'}), 500

# Flask route to return all challenges
# reconfigure challenge
@app.route('/Challenge', methods=['GET'])
def get_challenges():
    # Execute raw SQL query to fetch challenges
    db = get_db()
    cursor = db.execute('SELECT challengeId, challengeCode, challengeName, challengeDifficulty, challengeTag FROM Challenges')  # Fetch all challenges
    challenges = cursor.fetchall()  # Get all results

    # Convert Row objects to a list of dictionaries
    challenges_list = [dict(challenge) for challenge in challenges]

    return jsonify(challenges_list)

@app.route('/featured-walkthrough', methods=['POST'])
def get_featured_walktrough():
    # Get the JWT from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    
    # Get the challenge code from the request body
    data = request.get_json()
    challenge_code = data.get('challengeCode')

    # Execute raw SQL query to fetch Contributors
    db = get_db()
    cursor = db.execute('SELECT challengeCode, Name, Link FROM Contributor WHERE challengeCode = ?', (challenge_code,))
    contributors = cursor.fetchall()

    contributors_list = [dict(contributor) for contributor in contributors]

    return jsonify(contributors_list), 200

@app.route('/verify-flag', methods=['POST'])
def verify_flag():
    # Get the JWT from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    data = request.get_json()  # Get the JSON data from the request
    flag = data.get('flag')  # Extract the flag from the JSON
    challenge_code = data.get('challengeCode').strip()  # Extract challengeCode from the JSON

    # Hash the submitted flag
    hashed_flag = hashlib.sha256(flag.encode()).hexdigest()

    # Query the database for the challengeId using the challengeCode
    db = get_db()
    cursor = db.execute('SELECT challengeId, challengeFlag FROM Challenges WHERE challengeCode = ?', (challenge_code,))
    challenge = cursor.fetchone()

    if challenge:
        challenge_id = challenge['challengeId']  # Get the challengeId
        correct_hashed_flag = challenge['challengeFlag']  # Get the hashed flag from the database

        if hashed_flag == correct_hashed_flag:
            # If the hashed flag is correct, update the ChallengeCompletion table
            db.execute('''
                UPDATE ChallengeCompletion
                SET challengeCompletion = 1
                WHERE userId = ? AND challengeId = ?
            ''', (user_id, challenge_id))
            db.commit()  # Commit the changes
            return jsonify({'message': 'Flag is correct! Challenge completed.'}), 200
        else:
            return jsonify({'message': 'Incorrect flag! Please try again.'}), 200
    else:
        return jsonify({'message': 'Challenge not found.'}), 404
    
@app.route('/hint/<string:challengeCode>/<int:hintNumber>', methods=['POST'])
def get_hint(challengeCode, hintNumber):
    # Get the JWT from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    db = get_db()
    # Fetch the challenge hints from the Challenges table based on challengeCode
    cursor = db.execute('SELECT challengeHintOne, challengeHintTwo, challengeHintThree FROM Challenges WHERE challengeCode = ?', (challengeCode,))
    challenge = cursor.fetchone()

    if not challenge:
        return jsonify({'error': 'Challenge not found'}), 404

    # Determine which hint to return
    if hintNumber == 1:
        hint = challenge['challengeHintOne']
        update_query = 'UPDATE ChallengeCompletion SET useHintOne = 1 WHERE userId = ? AND challengeId = ?'
    elif hintNumber == 2:
        hint = challenge['challengeHintTwo']
        update_query = 'UPDATE ChallengeCompletion SET useHintTwo = 1 WHERE userId = ? AND challengeId = ?'
    elif hintNumber == 3:
        hint = challenge['challengeHintThree']
        update_query = 'UPDATE ChallengeCompletion SET useHintThree = 1 WHERE userId = ? AND challengeId = ?'
    else:
        return jsonify({'error': 'Invalid Hint Number'}), 400

    # Get the challenge ID based on the challengeCode
    challenge_cursor = db.execute('SELECT challengeId FROM Challenges WHERE challengeCode = ?', (challengeCode,))
    challenge_id_row = challenge_cursor.fetchone()

    if not challenge_id_row:
        return jsonify({'error': 'Challenge ID not found'}), 404

    challenge_id = challenge_id_row['challengeId']

    # Check if the challenge is already completed (challengeCompletion == 1)
    completion_cursor = db.execute('SELECT challengeCompletion FROM ChallengeCompletion WHERE userId = ? AND challengeId = ?', (user_id, challenge_id))
    completion_status = completion_cursor.fetchone()

    if not completion_status:
        return jsonify({'error': 'Challenge completion status not found'}), 404

    # Always provide the hint, but only update if challengeCompletion == 0
    if completion_status['challengeCompletion'] == 0:
        # Update the ChallengeCompletion table with the hint usage
        db.execute(update_query, (user_id, challenge_id))
        db.commit()

    # Return the hint regardless of challenge completion status
    return jsonify({'hint': hint}), 200

# To use the Walktrough, it will get updated
@app.route('/update-walkthrough', methods=['POST'])
def update_walkthrough():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    # Get the challenge code from the request body
    data = request.get_json()
    challenge_code = data.get('challengeCode')

    # Fetch the challengeId from the database using the challengeCode
    db = get_db()
    cursor = db.execute('SELECT challengeId FROM Challenges WHERE challengeCode = ?', (challenge_code,))
    challenge = cursor.fetchone()

    if challenge is None:
        return jsonify({'error': 'Challenge not found'}), 404

    challenge_id = challenge['challengeId']

    # Fetch the challengeCompletion value from the database
    cursor = db.execute('SELECT challengeCompletion FROM ChallengeCompletion WHERE userId = ? AND challengeId = ?', (user_id, challenge_id))
    result = cursor.fetchone()

    # Check if challengeCompletion is 0 before performing the update
    if result is not None and result[0] == 0:
        # Perform the update if challengeCompletion is 0
        cursor = db.execute('''
            INSERT INTO ChallengeCompletion (userId, challengeId, useWalkthrough)
            VALUES (?, ?, 1)
            ON CONFLICT(userId, challengeId) DO UPDATE SET useWalkthrough = 1
        ''', (user_id, challenge_id))
        db.commit()
        return jsonify({'message': 'success'}), 200
    else:
        print("Challenges is already completed, no update needed.")
        return jsonify({'message': 'success'}), 200

@app.route('/challenge-status/<string:challengeCode>', methods=['GET'])
def challengeStatus(challengeCode):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    
    db = get_db()

    cursor = db.execute('SELECT challengeId FROM Challenges WHERE challengeCode = ?', (challengeCode,))
    print(challengeCode)
    challenge_id = cursor.fetchone()[0]
    print(challenge_id)


    cursor = db.execute('SELECT challengeCompletion FROM ChallengeCompletion WHERE userId = ? AND challengeId = ?', (user_id, challenge_id,))
    challenge_status = cursor.fetchone()[0]

    return jsonify({
        "isSolved" : challenge_status
    }), 200


@app.route('/profile', methods=['GET'])
def Profile():
    # Get the JWT from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    db = get_db()

    # Fetch all challenges
    cursor = db.execute('SELECT challengeId, challengeCode, challengeName FROM Challenges')
    challenges = cursor.fetchall()

    # Fetch challenge completion status for the user
    cursor = db.execute('SELECT challengeId, challengeCompletion, useHintOne, useHintTwo, useHintThree, useWalkthrough FROM ChallengeCompletion WHERE userId = ?', (user_id,))
    completions = cursor.fetchall()

    # Create a dictionary for faster lookup of completed challenges
    completion_dict = {
        completion['challengeId']: {
            "challenge_completion": completion['challengeCompletion'],
            "use_hint_one": completion['useHintOne'],
            "use_hint_two": completion['useHintTwo'],
            "use_hint_three": completion['useHintThree'],
            "use_walkthrough": completion['useWalkthrough'],
        }
        for completion in completions
    }

    # Prepare a list of all challenges with their status
    # print(completion_dict)
    challenge_statuses = []
    for challenge in challenges:
        challenge_id = challenge['challengeId']

        # Check if this challenge is completed by the user
        if challenge_id in completion_dict:
            completion_data = completion_dict[challenge_id]

            # Calculate the completion status based on hint and walkthrough usage
            completion_status = completion_data['challenge_completion']
            if completion_status == 1:
                print(completion_status)
                if completion_data['use_hint_one']:
                    completion_status += 1
                if completion_data['use_hint_two']:
                    completion_status += 1
                if completion_data['use_hint_three']:
                    completion_status += 1
                if completion_data['use_walkthrough']:
                    completion_status = 5

        else:
            # If not completed, set the default values for an unsolved challenge
            completion_status = 0  # Not solved
            completion_data = {
                "use_hint_one": 0,
                "use_hint_two": 0,
                "use_hint_three": 0,
                "use_walkthrough": 0
            }

        challenge_statuses.append({
            "challengeId": challenge_id,
            "challengeCode": challenge['challengeCode'],
            "challengeName": challenge['challengeName'],
            "completion_status": completion_status
        })

    # Sort the challenge_statuses list by challenge_id
    challenge_statuses.sort(key=lambda x: x['challengeId'])

    # Return the user info and challenge completion statuses
    cursor = db.execute('SELECT userHandler, userEmail, avatar FROM User WHERE userId = ?', (user_id,))
    user = cursor.fetchone()

    if user is None:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "username": user['userHandler'],
        "email": user['userEmail'],
        "avatar": user['avatar'],
        "challenge_completions": challenge_statuses
    }), 200


# Route to update avatar selection
@app.route('/avatar-select', methods=['POST'])
def avatar_select():
    data = request.get_json()
    avatar = data.get('avatar')
    
    if not avatar:
        return jsonify({"message": "No avatar selected"}), 400

    # Get the JWT from the Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({'error': 'Authorization header missing or malformed'}), 401

    token = auth_header.split(" ")[1]

    # Decode the JWT to get the user ID
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = decoded_token.get('user_id')
        if user_id is None:
            return jsonify({'error': 'User ID not found in token'}), 401

    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401

    # Sanitation, dict[] (AvatarList)
    # dict [ name, Code ]
    # Code BE -> Code BE
    # Code FE -> SHA256 + Salt (?) 
    # Compare
    # Valid? UPDATE, else? 401

    db = get_db()
    cursor = db.execute("UPDATE User SET avatar = ? WHERE userId = ?", (avatar, user_id))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"message": "User not found"}), 404
    db.close()

    return jsonify({"message": "Avatar updated successfully!"}), 200

if __name__ == '__main__':
    app.run(debug=True)