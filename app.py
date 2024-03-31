from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import string
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from ML.classification import Classification
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)
CORS(app)

obj = Classification()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])

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

def predict():
    URL = request.get_json()['text']

    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')

    parsed_url = urlparse(URL).netloc
    base_url = parsed_url[4:]

    # Initialize the ML classification
    print(obj.label_classification())

    text = []
    # Find all <p> elements and print their text
    for paragraph in soup.find_all('p'):
        text.append(base_url+ " "+preprocess_text(paragraph.get_text()))

    print(text)
    return jsonify({'text': text})


if __name__ == '__main__':
    app.run(debug=True)
