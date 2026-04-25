from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from main import get_prediction # Importing your logic

app = Flask(__name__)
CORS(app) # Allows your React app to talk to this API

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if not data or 'stock' not in data:
        return jsonify({"error": "Please provide a stock ticker"}), 400
    
    result = get_prediction(data['stock'])
    return jsonify(result)

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "QuantCore Engine Online"})

if __name__ == "__main__":
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)