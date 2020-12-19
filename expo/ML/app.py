from flask import Flask, request, jsonify
from NLP.k import predict
app = Flask(__name__)

@app.route("/prediction", methods=["POST"])
def prediction():
    # print("Reached correctly")
    data = request.get_json(force=True)
    # tp = ["Cocoa", "Notebooks", "Chips"]
    print(data['data'])
    # res = "Food"
    res = predict([data['data']])
    print(res)
    return {"category":res[0]}

@app.route("/image_ocr", methods=["POST"])
def ocr_enable():
    data = []
    return data