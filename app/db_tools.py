import csv
import sqlite3
import json

DB_FILE = "data.db"

states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

db = sqlite3.connect(DB_FILE, check_same_thread=False)
c = db.cursor() # Create the tables if they dont exist yet
c.executescript("""
    create TABLE if NOT EXISTS UFO_sightings("datetime" text, "state" text, "country" text, "comments" text, "lattitude" text, "longitude" text);
    create TABLE if NOT EXISTS Alcohol_Consumption("State" text, "Year" text, "Per_capita_consumption" text);
    create TABLE if NOT EXISTS Car_Accidents("ID" text, "Severity" text, "Latitude" text, "Longitude" text, "Distance" text, "State" text);
    create TABLE if NOT EXISTS info(state text primary key, UFO_sightings int, car_accidents int, drunkenness int);
""")

c.close()
class mydict(dict):
    """Helper function to replace dict single quotes with double quotes for json parsing"""
    def __str__(self):
        return json.dumps(self)
def count_UFO(state):
    state = state.lower()
    c = db.cursor()
    c.execute("SELECT count(*) FROM UFO_sightings WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    return result[0]
    
def count_car(state):
    c = db.cursor()
    c.execute("SELECT count(*) FROM Car_Accidents WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    return result[0]

def count_drunk(state):
    #avg data from all years of state
    c = db.cursor()
    c.execute("SELECT avg(Per_capita_consumption)FROM Alcohol_Consumption WHERE state = ?", (state,))
    result = c.fetchone()
    c.close()
    if(result == None):
        return None
    print(result)
    return result[0]

def populate_info():
    c = db.cursor()
    for state in states:
        alc = count_drunk(state)
        ufo = count_UFO(state)
        accident = count_car(state)
        c.execute("INSERT INTO info values(?, ?, ?, ?)", (state, ufo, accident, alc,))
        # print(state,ufo,accident,alc)
    db.commit()
    c.close()
    

def get_info(state):
    c = db.cursor()
    c.execute("SELECT * FROM info WHERE State = ?",(state,))
    result = c.fetchone()
    c.close()
    return result
    

def alc_info():
    alcohol_us = {}
    x = 0
    for state in states:
        alcohol_us[x] = {"STATE":state, "drunks_per_capita":count_drunk(state)}
        x += 1
    alc_us_json = mydict(alcohol_us)
    return alc_us_json
    
def scatter_us_accident():
    scatter = {}
    x = 0
    for state in states:
        scatter[x] = {"STATE":state, "ethanol_per_capita":count_drunk(state), "car_accidents":count_car(state)}
        x +=1 
    scatter_us_accident_json = mydict(scatter)
    return scatter_us_accident_json
    
def scatter_us_ufo():
    scatter = {}
    x = 0
    for state in states:
        scatter[x] = {"STATE":state, "ethanol_per_capita":count_drunk(state), "ufo_sightings":count_UFO(state)}
        x +=1 
    scatter_us_ufo_json = mydict(scatter)
    return scatter_us_ufo_json

def get_ufo_year(state, year):
    state = state.lower()
    c = db.cursor()
    yr = '%'+str(year)+'%'
    #print(state)
    q = (state, yr,)
    ##print(q)
    c.execute("SELECT count(*) FROM UFO_sightings WHERE state = ? AND datetime LIKE ?", q)
    result = c.fetchone()
    ##print("here " + str(result))
    c.close()
    return result[0]
def get_ethanol_year(state, year):
    state = state.lower()
    c = db.cursor()
    yr = '%'+str(year)+'%'
    #print(state)
    q = (state, yr,)
    print(q)
    c.execute("SELECT Per_capita_consumption FROM Alcohol_Consumption WHERE state = ? AND Year LIKE ?", q)
    result = c.fetchone()
    ##print("here " + str(result))
    c.close()
    if result == None:
        return None;
    return result[0]


def get_state_ufo(state):
    scatter = {}
    x = 1941
    while x < 2015:
        scatter[x-1941] = {"Year":x, "ethanol_per_capita":get_ethanol_year(state,x), "sightings":get_ufo_year(state, x)}
        x +=1 
    scatter_us_ufo_json = mydict(scatter)
    return scatter_us_ufo_json
    
    
#populate_info()
#print(get_info('OH'))
#print(count_UFO('OH'))

#print(alc_info())
# print(scatter_us_accident())
#print(count_car('OH'))
#print(get_state_ufo('ny'))
print(get_ethanol_year('wy', 1977))



