from flask import Flask
import firebase_admin
from firebase_admin import credentials
from pathlib import Path
from flask_restful import Resource, Api
import os
from multiprocessing import Process, Queue
from pandas import DataFrame
import runner

cred = credentials.Certificate(Path(__file__).parent / "key/vtb-hackathon-firebase-adminsdk-mh10o-0e7b464d7d.json")
firebase_admin.initialize_app(cred)

app = Flask(__name__)
api = Api(app)


class Feature(Resource):
    def get(self, data):
        code = data["data"]["code"]

    def get_ds(self, id: str):
        pass

    def execute_code(self, code: str, data_set: DataFrame):
        with open('runner.py', 'w') as f:
            f.writelines(code.split('\n'))
            f.close()

        queue = Queue()
        queue.put(data_set)

        p = Process(target=runner.run, args=(queue,))
        p.start()
        p.join()

        return queue.get()


api.add_resource(Feature, '/api/<string:data>')


@app.route("/test")
def test():
    return {"shit": ["piss1", "piss2"]}


if __name__ == "__main__":
    app.run(debug=True)
