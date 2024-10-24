import sqlite3
import os

# Path to the SQLite database file
DATABASE_PATH = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance', 'casino_heist.db')

# Connect to the SQLite Database
conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

# Function to fetch available challenge codes
def fetch_challenge_codes():
    cursor.execute("SELECT challengeCode FROM Challenges WHERE challengeDifficulty = 'common'")
    challenge_codes = cursor.fetchall()
    if challenge_codes:
        return [code[0] for code in challenge_codes]  # Extract the codes from the tuples
    else:
        print("No challenges found in the database.")
        return []

# Function to insert data into the Contributor table
def insert_contributor(challenge_code, name, link):
    try:
        cursor.execute('''
        INSERT INTO Contributor (challengeCode, Name, Link)
        VALUES (?, ?, ?)
        ''', (challenge_code, name, link))
        conn.commit()
        print("Contributor added successfully!")
    except sqlite3.IntegrityError as e:
        print(f"Error occurred: {e}")

# Function to display challenge codes and get user input for contributor details
def get_user_input():
    # Fetch and display available challenge codes
    challenge_codes = fetch_challenge_codes()
    if not challenge_codes:
        return  # No challenges available, exit the function
    
    print("Available challenge codes:")
    for idx, code in enumerate(challenge_codes):
        print(f"{idx + 1}. {code}")

    # Let the user select a challenge code
    try:
        selected_idx = int(input("Select a challenge code by number: ")) - 1
        if selected_idx < 0 or selected_idx >= len(challenge_codes):
            print("Invalid selection.")
            return
        
        selected_challenge_code = challenge_codes[selected_idx]
        name = input("Enter contributor name: ")
        link = input("Enter contributor link: ")
        
        insert_contributor(selected_challenge_code, name, link)
    
    except ValueError:
        print("Please enter a valid number.")

# Call the function to get user input
get_user_input()

# Close the connection
conn.close()