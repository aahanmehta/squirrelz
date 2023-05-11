from flask import Flask             #facilitate flask webserving
from flask import render_template, request   #facilitate jinja templating
from flask import session, redirect, url_for, make_response        #facilitate form submission

app = Flask(__name__)    #create Flask object

@app.route('/home')
def homepage():
    return render_template('home.html')

@app.route('/filter')A
def filter():
    return 11
##@app.route('/<state>')
##def subpage():
##    return render_template('state.html')

if __name__ == "__main__": #false if this file imported as module
    app.debug = True 
    app.run(host='0.0.0.0')
