from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import pandas as pd
from main import get_prediction 

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({
        "status": "QuantCore Engine Online",
        "message": "Backend is active."
    }), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data_in = request.json
        stock_ticker = data_in.get('stock', 'RELIANCE.NS')
        
        prediction, df = get_prediction(stock_ticker)
        
        if prediction is None or df is None:
            return jsonify({"error": "Data calculation failed"}), 400

        # FIX: Convert NaN to None (null in JSON) to prevent 500 errors
        df_clean = df.replace({np.nan: None})
        close_series = df_clean['Close']
        
        chart_data = close_series.tail(25).tolist()
        current_price = float(close_series.iloc[-1])
        
        # Calculate trend safely
        trend_val = 0.0
        if 'Return' in df_clean.columns:
            last_ret = df_clean['Return'].iloc[-1]
            trend_val = float(last_ret * 100) if last_ret is not None else 0.0

        return jsonify({
            "prediction": int(prediction),
            "chart": chart_data,
            "portfolio": 42850.00, 
            "profit": 12.5,
            "accuracy": 85.2,
            "risk": "Moderate",
            "price": round(current_price, 2),
            "trend": round(trend_val, 2)
        })

    except Exception as e:
        print(f"Server Error in app.py: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
