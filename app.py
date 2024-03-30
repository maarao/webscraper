from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def predict():
    URL = request.get_json()['text']
    print(URL)

    return request.get_json()

if __name__ == '__main__':
    app.run(debug=True)
