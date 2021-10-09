from flask import Flask
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from pathlib import Path
<<<<<<< HEAD
import json
import pandas as pd
=======
from flask import request
import csv
import json
import pandas as pd
import numpy as np
>>>>>>> table
from io import StringIO

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'vtb-hackathon.appspot.com'
})

app = Flask(__name__)

@app.route("/test")
def test():
    return {"shit": ["piss1", "piss2"]}


<<<<<<< HEAD
@app.route("/api/getmetadata/<uid>/<filename>")
def get_metadata(uid, filename):
    raw_csv = storage.bucket().blob(uid+'/'+filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    return json.dumps({"rows": df.shape[0]})
=======
@app.route("/api/getdataset/<uid>/<filename>")
def get_dataset(uid, filename):
    raw_csv = storage.bucket().blob(uid+'/'+filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    data = df.head().to_dict("records")
    return {"columns": [{'title': c, 'field': c} for c in df.head().columns], "data": data}
>>>>>>> table


if __name__ == "__main__":
    app.run(debug=True)
