from textblob import TextBlob
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import string
import re

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import numpy as np


import nltk
import pandas as pd
from textblob import Word
from nltk.corpus import stopwords
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report,confusion_matrix,accuracy_score
from keras.models import Sequential
from tokenizers import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.layers import Dense, Embedding, LSTM, SpatialDropout1D
from sklearn.model_selection import train_test_split 
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score



def preprocess_text(text):

    text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", " ", text)
    # Tokenize the text into words
    words = word_tokenize(text.lower())

    words = [word for word in words if word not in string.punctuation]

    # Remove stop words
    words = " ".join([word for word in words if word.isalpha()]).lower()    
        
    return words


def polarity(text):

    text = [phrase for phrase in text if phrase.count(' ') > 2]
    
    polarity_score = []

    for phrase in text:
        polarity_score.append(TextBlob(phrase).sentiment.polarity)

    # polarity_min = min(polarity_score)
    # polarity_max = max(polarity_score)
    polarity_std = np.std(polarity_score)
    polarity_mean = np.mean(polarity_score)
    # polarity_range = polarity_max - polarity_min

    return polarity_mean

def subjectivity(text):
    text = [phrase for phrase in text if phrase.count(' ') > 2]

    subjectivity_score = []

    for phrase in text:
        subjectivity_score.append(TextBlob(phrase).sentiment.subjectivity)

    subjectivity_mean = np.mean(subjectivity_score)

    return subjectivity_mean

def sentiment(text):
    text = [phrase for phrase in text if phrase.count(' ') > 2]

    df = pd.read_csv('./data/articles.csv')


    vectorizer = CountVectorizer(stop_words='english')
    x=vectorizer.fit_transform(df['content'])

    y = df['sentiment']

    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.1, random_state=42)

    mnb_classifier = MultinomialNB()
    mnb_classifier.fit(X_train, y_train)

    y_pred = mnb_classifier.predict(X_test)

    accuracy = accuracy_score(y_pred, y_test)

    vector_x = vectorizer.transform(text)
    predictions = mnb_classifier.predict(vector_x)

    # sentiment_map = {0:'negative',1:'neutral',2:'positive'}
    # predicted_sentiments = [sentiment_map[pred] for pred in predictions]

    return predictions.mean()
