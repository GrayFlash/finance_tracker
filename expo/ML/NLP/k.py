import pandas as pd
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
# tfidf = TfidfVectorizer(sublinear_tf=True,min_df=10, norm='l2', encoding='latin-1', ngram_range=(1, 2), stop_words='english')

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

dict = {0:"Food", 1:"Hygiene", 2:"Home", 3:"Stationery", 4:"Clothes", 5:"Others"}
def train():
    a = pd.read_csv('data_fin.csv')
    # features = tfidf.fit_transform(a['Name']).toarray()
    features = a['Name']
    labels = a['category']
    print("start")
    X_train, X_test, y_train, y_test = train_test_split(features,labels, test_size = 0.2, random_state = 10)
    clf = MultinomialNB().fit(X_train, y_train)
    print("done")
    count = 0
    Y_pred = clf.predict(X_test)
    print(Y_pred)
    c = 0
    for i in y_test:
        if(Y_pred[c] == i):
            count+=1
        c+=1
    print("Accuracy==> ")
    print(float(count)/Y_pred.shape[0])
    classifier = MultinomialNB().fit(features, labels)
    f = open('MultinomialNB.pickle', 'wb')
    pickle.dump(classifier, f)
    f.close()

def predict(data):
    f = open('./NLP/MultinomialNB.pickle', 'rb')
    classifier = pickle.load(f)
    # data = np.array(data)
    # data = data.reshape(-1,1)
    # tfidf2 = TfidfVectorizer(sublinear_tf=True,min_df=1, norm='l2', encoding='latin-1', ngram_range=(1, 2), stop_words='english')

    # features2 = tfidf2.fit_transform(data).toarray()
    data = np.array(data)
    data = data.reshape(-1, 1)
    # print(data)
    Y_pred = classifier.predict(data)
    f.close()

    res = [dict[letter] for letter in Y_pred]
    return res

if __name__ == "__main__":
    train()
