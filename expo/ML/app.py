# from flask import Flask, request, jsonify
from NLP.k import predict
# app = Flask(__name__)

# @app.route("/prediction", methods=["POST"])
def prediction():
    print("Reached correctly")
    # data = request.get_json(force=True)
    tp = ["Cocoa", "Notebooks", "Chips"]
    res = predict(tp)
    print(res)
    return res

prediction()