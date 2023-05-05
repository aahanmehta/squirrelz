from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)

@app.route("/")       
def hello_world():
    print(__name__)
    return "No hablo queso!"

if __name__ == "__main__": #false if this file imported as module
    #enable debugging, auto-restarting of server when this file is modified
    app.debug = True
    app.run()
