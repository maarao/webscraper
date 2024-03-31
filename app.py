from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import string
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from ML.classification import Classification
from ML.sentiment import polarity, subjectivity
from googleSearch import fact_check
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

    class_text = []
    sent_text = []
    # Find all <p> elements and print their text
    for paragraph in soup.find_all('p'):
        sent_text.append(sentiment_preprocess(paragraph.get_text()))
        class_text.append(classifier_preprocess(paragraph.get_text()))

    real = obj.real_classification(class_text)
    bias = obj.bias_classification(class_text)
    p_mean, p_std = polarity(sent_text) # Between [-1, 1] where -1 is negative and 1 is positive
    subject = subjectivity(sent_text) # between 0 - 1 (1 is opinionated), (0 is factual)
    relevancy, images_urls = fact_check(URL)
    if relevancy > 1:
        relevancy = 1
    classification_score = real + bias_classification_percentages[bias]
    print(classification_score)

    bias_classificiation_name = ['Bias', 'Conspiracy', 'Fake', 'BS', 'Satire', 'Hate', 'Junksci', 'State']
    bias_classification_percentages = [0.6, 0, 0.1, 0.2, 0.7, 0.5, 0, 1]

    score = (relevancy * .2 + real * .15 + (0.4 * (0.5 * (1 - subject) + .3 * (1 - p_std) + .2 * (1 - abs(p_mean)))) + bias_classification_percentages[bias] * .25)

    print("Score: ",score)
    # print("Text", text)
    return jsonify({'score': score, 'fact_check': relevancy, 'imageurls': images_urls, 'polarity': p_mean, 'subjectivity': subject, 'bias': classification_score, 'real': real})



def classifier_preprocess(text):

    text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", text)
    # Tokenize the text into words
    words = word_tokenize(text.lower())

    words = [word for word in words if word not in string.punctuation]

    # Remove stop words
    stop_words = stopwords.words('english')
    words = [word for word in text.split() if word not in (stop_words)]
    words = " ".join([word for word in words if word.isalpha()]).lower()    
        
    return words

def sentiment_preprocess(text):

    text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", " ", text)
    # Tokenize the text into words
    words = word_tokenize(text.lower())

    words = [word for word in words if word not in string.punctuation]

    # Remove stop words
    words = " ".join([word for word in words if word.isalpha()]).lower()    
        
    return words

if __name__ == '__main__':
    app.run(debug=True)
