from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from main import get_prediction  # Importing your ML logic

app = Flask(__name__)
CORS(app)  # Essential for connecting Vercel to Render

@app.route('/', methods=['GET'])
def health_check():
    """Root route to confirm the server is live on Render."""
    return jsonify({
        "status": "QuantCore Engine Online",
        "message": "Send a POST request to /predict to get analysis."
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Get the stock ticker from the frontend (e.g., "RELIANCE.NS")
        stock_ticker = request.json.get('stock', 'RELIANCE.NS')

        # 2. Call your logic from main.py
        # This expectedly returns: (int_signal, pandas_dataframe)
        prediction, data = get_prediction(stock_ticker)
        
        # 3. Extract necessary series
        close_series = data['Close']
        
        # Ensure we handle potential NaN values which break JSON
        chart_data = data['Close'].tail(25).replace({np.nan: None}).tolist()

        # 4. Return the full payload for the React Dashboard
        return jsonify({
            "prediction": int(prediction),
            "chart": chart_data,
            "portfolio": 42850.00,  # Static placeholder for your Portfolio tab
            "profit": 12.5,
            "accuracy": 85.2,
            "risk": "Moderate",
            "price": round(float(close_series.iloc[-1]), 2),
            "trend": round(float(data['Return'].iloc[-1] * 100), 2) if 'Return' in data else 0.0
        })

    except Exception as e:
        # Crucial: This sends the error back to Vercel so you can see it in the console
        print(f"Error in /predict: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Render assigns a dynamic port; 5000 is the local fallback
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
