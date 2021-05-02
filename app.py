from flask import Flask, request, render_template
app = Flask(__name__)

@app.route("/")
def Initial_Menu():
    return render_template("Menu.html")

@app.route("/game", methods = ["POST"])
def Game():
    color = request.form['color']
    return render_template("Game.html", color=color)