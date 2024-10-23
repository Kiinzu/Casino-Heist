import sqlite3
import os

# Ensure the instance directory exists
instance_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
if not os.path.exists(instance_dir):
    os.makedirs(instance_dir)

# Path to the SQLite database file inside the instance directory
DATABASE_PATH = os.path.join(instance_dir, 'casino_heist.db')

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect(DATABASE_PATH)
cursor = conn.cursor()

# Create User Table
# - generate usedId with unique ID (uuid)
# - password is hash from werkzeug
cursor.execute('''
CREATE TABLE IF NOT EXISTS User (
    userId TEXT PRIMARY KEY,
    userHandler TEXT NOT NULL,
    userEmail TEXT NOT NULL UNIQUE,
    userPassword TEXT NOT NULL,
    avatar TEXT
)
''')

# Create Challenges Table
# - remove autoincrement, already have our own ID
# - challengeFlag is from SHA256
# - make json return everything (app)
# - hint's on front end (?)
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

# Create ChallengeCompletion Table

cursor.execute('''
CREATE TABLE IF NOT EXISTS ChallengeCompletion (
    userId TEXT NOT NULL,
    challengeId INTEGER NOT NULL,
    challengeCompletion INTEGER DEFAULT 0, -- 0 for incomplete, 1 for complete
    useHintOne INTEGER DEFAULT 0,         -- 0 for not used, 1 for used
    useHintTwo INTEGER DEFAULT 0,         -- 0 for not used, 1 for used
    useHintThree INTEGER DEFAULT 0,       -- 0 for not used, 1 for used
    useWalkthrough INTEGER DEFAULT 0,     -- 0 for not used, 1 for used
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE,
    FOREIGN KEY (challengeId) REFERENCES Challenges(challengeId) ON DELETE CASCADE,
    PRIMARY KEY (userId, challengeId)
)
''')

# Create Whitelist Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS Whitelist (
    userId TEXT PRIMARY KEY,
    jwt TEXT NOT NULL,
    expiration DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId) ON DELETE CASCADE
)
''')

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database and tables created successfully.")