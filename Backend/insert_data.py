import sqlite3
import os
from data import challenges, Contributors

# Path to the SQLite database file
DATABASE_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'casino_heist.db')

def create_challenges_table():
    # Connect to the SQLite database
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Create Challenges Table if it does not exist
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Challenges (
        challengeId INTEGER PRIMARY KEY,
        challengeName TEXT NOT NULL,
        challengeCode TEXT NOT NULL UNIQUE,
        challengeDifficulty TEXT NOT NULL,
        challengeTag TEXT NOT NULL,
        challengeFlag TEXT NOT NULL,
        challengeHintOne TEXT NOT NULL,
        challengeHintTwo TEXT NOT NULL,
        challengeHintThree TEXT NOT NULL
    )
    ''')

    conn.commit()
    conn.close()

def insert_challenges():
    # Connect to the SQLite database
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    # Iterate over the dataset and insert each challenge into the Challenges table
    for challenge in challenges:
        cursor.execute('''
        INSERT INTO Challenges (challengeId, challengeName, challengeCode, challengeDifficulty, challengeTag, challengeFlag, challengeHintOne, challengeHintTwo, challengeHintThree)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            challenge['challengeId'],
            challenge['challengeName'],
            challenge['challengeCode'],
            challenge['challengeDifficulty'],
            challenge['challengeTag'],
            challenge['challengeFlag'],
            challenge['challengeHintOne'],
            challenge['challengeHintTwo'],
            challenge['challengeHintThree']
        ))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()
    print("Challenges inserted into the database successfully.")

def insert_contributors():
    # Connect to the SQLite database
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    for contributor in Contributors:
        cursor.execute('''
        INSERT INTO Contributor (challengeCode, Name, Link)
        VALUES (?, ?, ?)
        ''', (
            contributor['challengeCode'],
            contributor['Name'],
            contributor['Link']
        ))
    conn.commit()
    conn.close()
    print("Contributors inserted into the database succesfully.")

# def dummy_creds():
#     conn = sqlite3.connect(DATABASE_PATH)
#     cursor = conn.cursor()

#     userId = '70b122c0-f9e4-4455-93c8-601ef3155862'
#     userHandler = 'test'
#     userEmail = 'test@gmail.com'
#     password = 'scrypt:32768:8:1$IpYNhP9QJS9HBekm$ebe94ec51e971bbe9c110b09d2501939f5eb091f4c1ff9d9bf99c0ab516664d75a30c8e9004c75cab5c4e535636088a3b202a0232db9278709ee65610e2b3201'
#     avatar = 'aangtheairbender'

#     cursor.execute('''
#         INSERT INTO User (userId, userHandler, userEmail, userPassword, avatar) VALUES (?, ?, ?, ?, ?)
#     ''', (
#         userId,
#         userHandler,
#         userEmail,
#         password,
#         avatar
#     ))
#     conn.commit()
#     conn.close()
#     print(f"Dummy user of\nusername: {userHandler}\npassword: {password} ")

if __name__ == "__main__":
    # Create the Challenges table if it doesn't exist
    create_challenges_table()
    # Insert challenges from the dataset
    insert_challenges()
    insert_contributors()
    # dummy_creds()