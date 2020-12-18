import pandas as pd
import numpy as np
a = pd.read_csv('data_fin.csv')
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf = TfidfVectorizer(sublinear_tf=True,min_df=10, norm='l2', encoding='latin-1', ngram_range=(1, 2), stop_words='english')
features = tfidf.fit_transform(a['Name']).toarray()
labels = a['category']
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
X_train, X_test, y_train, y_test = train_test_split(features,labels, random_state = 0)
clf = MultinomialNB().fit(X_train, y_train)
