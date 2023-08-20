from flask import Flask, request, jsonify, render_template
from mlxtend.frequent_patterns import association_rules
from flask_cors import CORS
import pandas as pd
from apyori import apriori
import numpy as np
import collections
import joblib
from pandas import *
import random
import csv

app = Flask(__name__)
CORS(app)


@app.route("/api", methods=['GET'])
def home():
    return '''Welcome to Recommendation System API'''

@app.route('/api/newuser', methods=['GET'])
def newUser():
    return '''New Users'''


@app.route('/api/newuser/predict', methods=['GET'])
def newUserPredict():
    # Past Purchase  History
    ratings = pd.read_csv('similar users.csv')
    ratings = ratings.dropna()

    popular_products = pd.DataFrame(ratings.groupby('ITEM',as_index=False)['Rating'].count())
    most_popular = popular_products.sort_values('Rating', ascending=False).reset_index()

    recommendation = {}
    for i in range(5):
        item = {}
        with open('Unique Items with ProductId.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            for row in datareader:
                if row[0] == most_popular['ITEM'][i]:
                    price = row[2]
                    imgLink = row[4]
                    size = row[5]
                    id = row[1]
                    break

        item["item"] = most_popular['ITEM'][i]
        item["price"] = price
        item["imgLink"] = imgLink
        item["size"] = size
        item["api"] = "New User"
        recommendation[id] = item

    # output = most_popular

    return jsonify(recommendation)


@app.route('/api/past', methods=['GET'])
def pastPurchases():
    return '''Past purchases'''

@app.route('/api/past/predict/<string:txt>', methods=['GET'])
def pastuserpredict(txt):
    # product = pd.read_csv('Unique Items with ProductId.csv')
    # itemlist = list(product['ITEM'])
    #
    # if txt not in itemlist[0:121]:
    #     return jsonify({})

    # Past Purchase  History
    purchases = pd.read_csv('book1.csv', header=None)
    purchases.head()
    purchases.values.tolist()
    purchaseList = []
    for i in range(len(purchases)):
        purchaseList.append([str(purchases.values[i, j]) for j in range(0, 10) if str(purchases.values[i, j]) != 'nan'])

    # Apriori Algorithm to Predict
    rules = apriori(purchaseList, min_support=0.001, min_confidence=0.03, min_lift=3, min_length=1)

    # Prediction
    cart_item = txt
    previous = []
    final = []
    for item in rules:
        pair = item[0]
        items = [x for x in pair]
        if cart_item in items:
            previous = [x for x in items]
            final += previous
    final = list(set(final))
    finalDict = {}
    for i in range(len(final)):
        item = {}
        item["Name"] = final[i]
        size = ""
        with open('Unique Items with ProductId with Size.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            for row in datareader:
                if row[0] == final[i]:
                    size = row[4]
                    price = row[2]
                    break
        imgLink = ""
        with open('Unique Items with ProductId.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            for row in datareader:
                if row[0] == final[i]:
                    imgLink = row[4]
                    id = row[1]
                    break
        item["Price"] = price
        item["ImgLink"] = imgLink
        item["Size"] = size
        item["api"] = "Recent Purchase"
        finalDict[id] = item

    keys = list(finalDict.keys())

    output = {}
    if len(finalDict) >= 5:
        for i in range(5):
            x = random.choice(keys)
            output[x] = finalDict[x]
    else:
        output = finalDict
    return jsonify(output)

@app.route('/api/similarProducts', methods=['GET'])
def similarProducts():
    return '''Similar Products'''

@app.route('/api/similarProducts/predict/<string:txt>', methods=['GET'])
def similarProductpredict(txt):
    data = read_csv("similar-product.csv")
    item1 = data['item 1'].to_list()
    item2 = data['item 2'].to_list()

    ans = ""
    for i in range(len(item1)):
        if item2[i] == txt:
            ans = item1[i]
            break
        elif item1[i] == txt:
            ans = item2[i]
            break
    print(ans)

    with open('Unique Items with ProductId.csv', 'r') as csvfile:
        datareader = csv.reader(csvfile)
        for row in datareader:
            if row[0] == ans:
                price = row[2]
                imgLink = row[4]
                size = row[5]
                id = row[1]
                break

    return jsonify({"item": ans, "price": price, "imgLink": imgLink, "size": size, "api": "Similar Product", "id": id})

data = joblib.load('similarUser.pkl')
pt = joblib.load('item_pivot.pkl')


@app.route('/api/user', methods=['GET'])
def user():
    return '''Similar User'''

@app.route('/api/user/predict/<string:txt>', methods=['GET'])
def userpredict(txt):

    recommendation = {}
    distances, suggestions = data.kneighbors(pt.loc[txt, :].values.reshape(1, -1), n_neighbors=3)
    output = list(pt.index[suggestions[0]])

    for i in range(len(output)):
        item = {}
        item["Name"] = output[i]
        size = ""
        imgLink = ""
        with open('Unique Items with ProductId.csv', 'r') as csvfile:
            datareader = csv.reader(csvfile)
            for row in datareader:
                if row[0] == output[i]:
                    imgLink = row[4]
                    id = row[1]
                    size = row[5]
                    price = row[2]
                    break
        item["Size"] = size
        item["Price"] = price
        item["ImgLink"] = imgLink
        item["api"] = "Similar User"
        recommendation[id] = item

    return jsonify(recommendation)

if __name__ == "__main__":
    app.run(debug=True)