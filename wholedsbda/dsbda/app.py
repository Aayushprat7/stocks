from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from main import get_prediction 

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def health_check():
    """Stops the 404 Not Found error on Render's primary URL"""
    return jsonify({
        "status": "QuantCore Engine Online",
        "message": "Backend is running. Use /predict for analysis."
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        stock_ticker = request.json['stock']
        
        # Unpack the two values returned by main.py
        prediction, data = get_prediction(stock_ticker)
        
        if prediction is None or data is None:
            return jsonify({"error": "No data found for ticker"}), 404

        close_series = data['Close']

        # Clean data for JSON (replace NaN with None)
        chart_data = close_series.tail(25).replace({np.nan: None}).tolist()

        return jsonify({
            "prediction": int(prediction),
            "chart": chart_data,
            "portfolio": 42850.00, 
            "profit": 12.5,
            "accuracy": 85.2,
            "risk": "Moderate",
            "price": round(float(close_series.iloc[-1]), 2),
            "trend": round(float(data['Return'].iloc[-1] * 100), 2) if 'Return' in data else 0.0
        })

    except Exception as e:
        print(f"Server Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
