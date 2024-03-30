from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    URL = request.form.get('text')
    page = requests.get(URL)

    print(page.text)

    return "done"

if __name__ == '__main__':
    app.run(debug=True)
