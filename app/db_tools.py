import csv
import sqlite3

DB_FILE = "data.db"

db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor() # Create the tables if they dont exist yet
c.executescript(""" 
    create TABLE if NOT EXISTS UFO_sightings("datetime" text, "state" text, "country" text, "comments" text, "lattitude" text, "longitude" text);
    create TABLE if NOT EXISTS Alcohol_Consumption("State" text, "Year" text, "Per_capita_consumption" text);
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

import csv
import sqlite3

DB_FILE = "data.db"

db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor() # Create the tables if they dont exist yet
c.executescript(""" 
    create TABLE if NOT EXISTS ufo_sightings(id int primary key, state text, lat text, lon text);
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

# def populate_ufo(filename):
#     open

