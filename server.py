import mysql.connector
from flask import Flask, request, render_template

def getTenBestResults():
    mydb = mysql.connector.connect(host='localhost', user='root', password='abcd', database='tictactoe')
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM (SELECT * FROM tictactoe ORDER BY score DESC LIMIT 10) sub ORDER BY score DESC")

    myresult = mycursor.fetchall()

    mydb.close()
    return myresult

def insertResult(name, score):
    mydb = mysql.connector.connect(host='localhost', user='root', password='abcd', database='tictactoe')
    mycursor = mydb.cursor()

    sqlCommand = "INSERT INTO tictactoe (player, score) VALUES (%s, %s)"
    val = (name, int(score))

    mycursor.execute(sqlCommand, val)
    mydb.commit()

    mydb.close()

app=Flask(__name__)

@app.route("/")
def start_page():
    return render_template("game.html")

@app.route("/game.html")
def gamne_page():
    return render_template("game.html")

@app.route("/results.html", methods=['GET'])
def process():
    player = request.args.get('player')
    score = request.args.get('score')
    insertResult(player, score)
    result=getTenBestResults()
    print(result)
    # return render_template("results.html", result=result)
    return result

if __name__ == "__main__":
    app.run(port=8080)
