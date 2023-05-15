from flask import Flask             #facilitate flask webserving
from flask import render_template, request   #facilitate jinja templating
from flask import session, redirect, url_for, make_response        #facilitate form submission
from db_tools import alc_info, count_drunk

app = Flask(__name__)    #create Flask object

@app.route('/')
def homepage():
    return render_template('home.html')

@app.route('/form-submit', methods=['POST'])
def handleFormSubmission():
    #print(request.form)
    state = request.form['sel_name']
    return "Avg Drunks per Capita for " + state + ": " + str(count_drunk(state))

@app.route('/agg-data-drunk', methods=['GET'])
def agg_data_drunk():
    print("here")
    return alc_info()



if __name__ == "__main__": #false if this file imported as module
    app.debug = True 
    app.run(host='0.0.0.0')
