from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/prediction", methods=["POST"])
def prediction():
    print("Reached correctly")
    data = request.get_json(force=True)
    print(data)