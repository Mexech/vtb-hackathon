from flask import Flask
import firebase_admin
from firebase_admin import credentials
from pathlib import Path

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)


@app.route("/test")
def test():
    return {"shit": ["piss1", "piss2"]}


if __name__ == "__main__":
    app.run(debug=True)