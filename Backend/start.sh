#!/bin/bash

rm -rf ./instance/casino_heist.db
python3 database.py
python3 insert_data.py
python3 app.py