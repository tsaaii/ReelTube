from flask import Flask, request, jsonify
import requests
from flask.ext.cors import CORS, cross_origin

app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/": {"origins": "http://localhost:5000"}})

sending = {"times":[[20, 5], [30, 5], [40, 5], [0, 0]]}     # {"times:[[start, duration], ..., [0, 0]]}
url = None


@app.route('/', methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def index():
    url = request.json['url']

    return jsonify(sending)
if __name__ == '__main__':
    app.run(debug = True)
