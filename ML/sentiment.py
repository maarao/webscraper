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

    return polarity_mean, polarity_std

def subjectivity(text):
    text = [phrase for phrase in text if phrase.count(' ') > 2]

    subjectivity_score = []

    for phrase in text:
        subjectivity_score.append(TextBlob(phrase).sentiment.subjectivity)

    subjectivity_mean = np.mean(subjectivity_score)

    return subjectivity_mean
