

import re
import string
import pandas as pd
import matplotlib.pyplot as plt
import cufflinks as cf
import plotly
import plotly.express as px
import seaborn as sns

import nltk
import nltk.stem
import nltk.corpus 
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')



from IPython.core.display import HTML
from wordcloud import WordCloud
from sklearn.feature_extraction import text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from datetime import datetime
from sklearn.feature_extraction.text import CountVectorizer
from pandas import DataFrame
from collections import OrderedDict 
from colorama import Fore, Back, Style
y_ = Fore.YELLOW
r_ = Fore.RED
g_ = Fore.GREEN
b_ = Fore.BLUE
m_ = Fore.MAGENTA
sr_ = Style.RESET_ALL

class Classification:

    def __init__(self):
        # Pull data and remove null values
        df = pd.read_csv(r'./ML/data/news_articles.csv', encoding="latin", index_col=0)
        df = df.dropna()
    
        # Access
        cf.go_offline()
        cf.set_config_file(offline=False, world_readable=True)

        # Change the type to a numerical encoding
        type1 = {'bias': 0, 'conspiracy': 1,'fake': 2,'bs': 3,'satire': 4, 'hate': 5,'junksci': 6, 'state': 7}
        df.type = [type1[item] for item in df.type] 

        # Randomize the sample
        self.df1 = df.sample(frac=1)

    def preprocess_text(self, text):

        text = re.sub(r"(@\[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)|^rt|http.+?", "", text)
        # Tokenize the text into words
        words = word_tokenize(text.lower())

        words = [word for word in words if word not in string.punctuation]

        # Remove stop words
        stop_words = stopwords.words('english')
        words = [word for word in text.split() if word not in (stop_words)]
        words = " ".join([word for word in words if word.isalpha()]).lower()    
        
        return words

    def label_classification(self, text):

        y = self.df1['label']
        x = self.df1.loc[:, ['site_url','text_without_stopwords']]
        x['source'] = x["text_without_stopwords"]
        x = x.drop(['site_url', 'text_without_stopwords'], axis=1)
        x = x.source

        # Train the TfIdf Vectorizer
        x_train,_,y_train,_ = train_test_split(x,y,test_size=0.30)
        tfidf_vect = TfidfVectorizer(stop_words = 'english')
        tfidf_train = tfidf_vect.fit_transform(x_train)
        ## Testing out the text here
        tfidf_test = tfidf_vect.transform(text)

        # Random Forest 
        Rando = RandomForestClassifier(n_estimators=1,random_state=2)
        Rando.fit(tfidf_train,y_train)
        y_pred1 = Rando.predict(tfidf_test)

        Adab = AdaBoostClassifier(DecisionTreeClassifier(max_depth=5),n_estimators=3,random_state=1)
        Adab.fit(tfidf_train, y_train)
        y_pred3 = Adab.predict(tfidf_test)

        res_rando = max(set(y_pred1))
        res_adab = max(set(y_pred3))

        result = 0

        if res_rando == res_adab:
            if res_rando == 'Real':
                result = 1
        else:
            result = 0.5

        return result


# if  __name__ == "__main__":
#      # Pull data and remove null values
#     df = pd.read_csv(r'./ML/data/news_articles.csv', encoding="latin", index_col=0)
#     df = df.dropna()
    
#     print("HELELJOJOEJRE")

#     # Access
#     cf.go_offline()
#     cf.set_config_file(offline=False, world_readable=True)

#     # Change the type to a numerical encoding
#     type1 = {'bias': 0, 'conspiracy': 1,'fake': 2,'bs': 3,'satire': 4, 'hate': 5,'junksci': 6, 'state': 7}
#     df.type = [type1[item] for item in df.type] 

#     # Randomize the sample
#     df1 = df.sample(frac=1)
