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
import importlib
import runner

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'vtb-hackathon.appspot.com'
})

app = Flask(__name__)
api = Api(app)
current_df = None

parser = reqparse.RequestParser()
parser.add_argument('uid')
parser.add_argument('code')
parser.add_argument('filename')


class Feature(Resource):
    def post(self):
        global current_df
        data = parser.parse_args()
        code = data["code"]
        filename = data["filename"]
        uid = data["uid"]
        df = self.__get_df(uid, filename)
        result = self.__execute_code(code, df)
        df.append(result)
        current_df = df
        data = df.head(100).to_dict("records")
        return {"columns": [{'title': c, 'field': c} for c in df.head().columns], "data": data}

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
        importlib.reload(runner)

        return runner.run(df)


# NewFeature creating

nf_parser = reqparse.RequestParser()
nf_parser.add_argument('uid', type=str, help="User ID for link")
nf_parser.add_argument('link_src', type=str, help="Name of source table")
nf_parser.add_argument('link_dst', type=str, help="Name of destination table")
nf_parser.add_argument('features', help="List of features from src table", action='append')


class NewFeature(Resource):
    def post(self):
        args = nf_parser.parse_args()
        # uid = args["uid"]
        # link_src = uid + '/' + args["link_src"]
        # link_dst = uid + '/' + args["link_dst"]
        link_src = args["link_src"]
        link_dst = args["link_dst"]
        features = args["features"]
        new_ftrs = self.get_features(link_src, features)
        e == self.append_features(link_dst, new_ftrs)
        if e:
            return {'result': f'{e}'}
        else:
            return {"result": "Success"}

    def get_features(self, link, features):
        raw_csv = storage.bucket().blob(link).download_as_text()

        # Refactoring to data frame
        f = StringIO(raw_csv)
        df = pd.read_csv(f, sep=",")

        result = [df[ftr] for ftr in features]

        return result

    def append_features(self, link, features):
        try:
            raw_csv = storage.bucket().blob(link).download_as_text()
            f = StringIO(raw_csv)
            df = pd.read_csv(f, sep=",")
            for ftr in features:
                try:
                    df = df.join(ftr, no_index=True)
                except Exception:
                    continue


            print(df)

            storage.bucket().blob(link).upload_from_string(df.to_csv())
            return None
        except Exception as e:
            print(f"Something gone wrong! {e}")
            return e


api.add_resource(Feature, '/api/code')
api.add_resource(NewFeature, '/api/new-feature')


@app.route("/test")
def test():
    return {"test": ["res1", "res2"]}


@app.route("/api/getmetadata/<uid>/<filename>")
def get_metadata(uid, filename):
    raw_csv = storage.bucket().blob(uid + '/' + filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    return json.dumps({"rows": df.shape[0]})


@app.route("/api/getdataset/<uid>/<filename>")
def get_dataset(uid, filename):
    raw_csv = storage.bucket().blob(uid + '/' + filename).download_as_text()
    f = StringIO(raw_csv)
    df = pd.read_csv(f, sep=",")
    data = df.head(100).to_dict("records")
    return {"columns": [{'title': c, 'field': c} for c in df.head().columns], "data": data}


@app.route("/api/savecustomfeature/<uid>/<filename>")
def save_custom_feature(uid, filename):
    global current_df
    storage.bucket().blob(uid + '/' + filename).upload_from_string(current_df.to_csv(index=False))
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


@app.route("/api/discardcustomfeature/<uid>/<filename>")
def discard_custom_feature(uid, filename):
    global current_df
    current_df = None
    return get_dataset(uid, filename)



if __name__ == "__main__":
    app.run(debug=True)
