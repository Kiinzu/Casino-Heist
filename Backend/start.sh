rm -rf ./instance/casino_heist.db
python3 database.py
python3 insert_challenges.py
python3 app.py