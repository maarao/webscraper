from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def predict():
    URL = request.get_json()['text']

    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    text = ""
    # Find all <p> elements and print their text
    for paragraph in soup.find_all('p'):
        text+= paragraph.get_text()

    print(text)
    return jsonify({'text': text})

if __name__ == '__main__':
    app.run(debug=True)
