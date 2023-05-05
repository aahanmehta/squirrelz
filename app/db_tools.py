import csv
import sqlite3

DB_FILE = "data.db"

db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor() # Create the tables if they dont exist yet
c.executescript(""" 
    create TABLE if NOT EXISTS info(state text primary key, UFO_sightings int, car_accidents int, drunkenness int);
""")
c.close()

def get_UFO(state):
    c = db.cursor()
    c.execute("select UFO_sightings FROM info WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    return result[0]
    
def get_car(state):
    c = db.cursor()
    c.execute("select car_accidents FROM info WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    return result[0]

def get_drunk(state):
    c = db.cursor()
    c.execute("select drunkenness FROM info WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    return result[0]


