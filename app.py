from flask import Flask, jsonify, render_template
import pandas as pd 

app = Flask(__name__)

@app.route("/")
def index(): 
    return render_template("index.html")


@app.route("/api/fraud_address")
def api_fraud_address():

    df = pd.read_csv('Fraud_address.csv')
    output_data = df.to_dict()
    return jsonify(output_data)

@app.route("/api/fraud_personal")
def api_fraud_personal():

    df = pd.read_csv('Fraud_Personal.csv')
    output_data = df.to_dict()
    return jsonify(output_data)
   
@app.route("/api/Fraud_Merch")
def api_Fraud_Merch():

    df = pd.read_csv('Fraud_Merch.csv')
    output_data = df.to_dict()
    return jsonify(output_data)

if __name__ == "__main__":
    app.run()