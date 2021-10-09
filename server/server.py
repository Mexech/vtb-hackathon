from flask import Flask
import firebase_admin
from firebase_admin import credentials
from pathlib import Path
from flask import request
import csv
import json
import pandas as pd

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)

@app.route("/test")
def test():
    return {"shit": ["piss1", "piss2"]}

@app.route("/getjson")
def getjson():
    url = request.args.get('url')
    c = pd.read_csv(url)
    out = c.to_numpy()
    return {"data": json.dumps(out.tolist())}

if __name__ == "__main__":
    app.run(debug=True)
