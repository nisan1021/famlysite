from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/check", methods=["POST"])
def check_password():
    data = request.json   # נקבל JSON מהלקוח
    codenter = data.get("password")
    passa = "nisan1"

    if codenter == passa:
        return jsonify({"message": "ok you in"})
    else:
        return jsonify({"message": "this is the wrong password"})

@app.route("/")
def home():
    return "Flask is running! Send a POST request to /check"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
