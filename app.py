from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import string
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from ML.classification import Classification
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)

obj = Classification()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])


def predict():
    URL = request.get_json()['text']

    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    parsed_url = urlparse(URL).netloc
    base_url = parsed_url[4:]

    text = []
    # Find all <p> elements and print their text
    for paragraph in soup.find_all('p'):
        text.append(preprocess_text(paragraph.get_text()))

    # Initialize the ML classification
    real = obj.real_classification(text)
    bias = obj.bias_classification(text)

    print("Text", text)
    return jsonify({'text': text})

def preprocess_text(text):

    text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", text)
    # Tokenize the text into words
    words = word_tokenize(text.lower())

    words = [word for word in words if word not in string.punctuation]

    # Remove stop words
    stop_words = stopwords.words('english')
    words = [word for word in text.split() if word not in (stop_words)]
    words = " ".join([word for word in words if word.isalpha()]).lower()    
        
    return words

if __name__ == '__main__':
    app.run(debug=True)
