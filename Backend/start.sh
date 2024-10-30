#!/bin/bash

rm -rf ./instance/casino_heist.db
pip3 install -r ./requirements.txt
python3 database.py
python3 insert_data.py
python3 app.py