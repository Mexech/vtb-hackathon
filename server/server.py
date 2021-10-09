from flask import Flask, request
import firebase_admin
from pathlib import Path
import pandas as pd
import numpy as np
from io import StringIO
from firebase_admin import credentials, storage
from pathlib import Path
from flask_restful import Resource, Api, reqparse
import os, json
# from multiprocessing import Process, Queue
from queue import Queue
from io import StringIO


cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'vtb-hackathon.appspot.com'
})

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('uid')
parser.add_argument('code')
parser.add_argument('filename')


class Feature(Resource):
    def post(self):
        data = parser.parse_args()
        code = data["code"]
        filename = data["filename"]
        uid = data["uid"]
        d_frame = self.__get_df(uid, filename)

        result = self.__execute_code(code, d_frame)

        return result

    def __get_df(self, uid: str, filename: str):
        # Getting data set from url
        raw_csv = storage.bucket().blob(uid + '/' + filename).download_as_text()

        # Refactoring to data frame
        f = StringIO(raw_csv)
        df = pd.read_csv(f, sep=",")
        return df

    def __execute_code(self, code: str, df: pd.DataFrame):

        # Put code from frontend into executable python file
        with open('runner.py', mode='w') as f:
            f.writelines(code)
        import runner

        result = runner.run(df)
        return df.head().to_dict("records")


api.add_resource(Feature, '/api')

@app.route("/test")
def test():
    return {"test": ["res1", "res2"]}


@app.route("/api/getmetadata/<uid>/<filename>")
def get_metadata(uid, filename):
    raw_csv = storage.bucket().blob(uid+'/'+filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    return json.dumps({"rows": df.shape[0]})

    
@app.route("/api/getdataset/<uid>/<filename>")
def get_dataset(uid, filename):
    raw_csv = storage.bucket().blob(uid+'/'+filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    data = df.head().to_dict("records")
    return {"columns": [{'title': c, 'field': c} for c in df.head().columns], "data": data}


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
