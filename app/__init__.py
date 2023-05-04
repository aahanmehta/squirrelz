from flask import Flask, render_template, request, session, redirect, url_for, make_response, db_tools, random, requests

app = Flask(__name__)    #create Flask object

@app.route('/')
def homepage():
    return render_template('home.html')

if __name__ == "__main__": #false if this file imported as module
    app.debug = True 
    app.run()