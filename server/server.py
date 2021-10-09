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
from multiprocessing import Process, Queue
from io import StringIO
import pandas as pd

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'vtb-hackathon.appspot.com'
})

app = Flask(__name__)
api = Api(app)


class Feature(Resource):
    def get(self):
        data = request.json
        code = data["data"]["code"]
        uid = data["uid"]
        filename = data["data"]["filename"]

        d_frame = self.__get_df(uid, filename)

        result = self.__execute_code(code, d_frame)

        return result.to_json()

    def __get_df(self, uid: str, filename: str):
        # Getting data set from url
        raw_csv = storage.bucket().blob(uid + '/' + filename).download_as_text()

        # Refactoring to data frame
        f = StringIO(raw_csv)
        df = pd.read_csv(f, sep=",")
        return df

    def __execute_code(self, code: str, data_set: pd.DataFrame):
        # Put code from frontend into executable python file
        with open('runner.py', mode='w') as f:
            f.writelines(code)

        # Generates Queue object to manage data set and results of inner code
        queue = Queue()
        queue.put(data_set)

        # Making process for execution of inner code file
        import runner
        # p = Process(target=runner.run, args=(queue,))
        # p.start()
        # p.join()

        runner.run(queue)

        return queue.get()


# NewFeature creating

nf_parser = reqparse.RequestParser()
nf_parser.add_argument('uid', type=str, help="User ID for link")
nf_parser.add_argument('link_src', type=str, help="Name of source table")
nf_parser.add_argument('link_dst', type=str, help="Name of destination table")
nf_parser.add_argument('features', help="List of features from src table")


class NewFeature(Resource):
    def post(self):
        args = nf_parser.parse_args()
        uid = args["uid"]
        link_src = uid + '/' + args["link_src"]
        link_dst = uid + '/' + args["link_dst"]
        features = args["features"]
        new_ftrs = self.get_features(link_src, features)
        if e := self.append_features(link_dst, new_ftrs):
            return {"result": e}
        else:
            return {"result": "Success"}

    def get_features(self, link, features):
        raw_csv = storage.bucket().blob(link).download_as_text()

        # Refactoring to data frame
        f = StringIO(raw_csv)
        df = pd.read_csv(f, sep=",")

        result = []
        for ftr in features:
            result.append(df[ftr])

        return result

    def append_features(self, link, features):
        try:
            raw_csv = storage.bucket().blob(link).download_as_text()
            f = StringIO(raw_csv)
            df = pd.read_csv(f, sep=",")
            for ftr in features:
                df.append(ftr)

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
    data = df.head().to_dict("records")
    return {"columns": [{'title': c, 'field': c} for c in df.head().columns], "data": data}


if __name__ == "__main__":
    app.run(debug=True)
