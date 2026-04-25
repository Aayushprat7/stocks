from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from main import get_prediction # Importing your logic

app = Flask(__name__)
CORS(app) # Allows your React app to talk to this API

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # 1. Get the stock ticker from the frontend (e.g., "RELIANCE.NS")
        stock_ticker = request.json['stock']
        
        # 2. Call your logic from main.py
        # Assuming your get_prediction returns (prediction_signal, dataframe)
        prediction, data = get_prediction(stock_ticker)
        
        # 3. Extract the final closing price
        close_series = data['Close']

        # 4. Return the full package with correct indentation
        return jsonify({
            "prediction": int(prediction),
            "chart": data['Close'].tail(25).values.flatten().tolist(),
            "portfolio": 42850.00, # Static placeholder as seen in your Portfolio tab
            "profit": 12.5,
            "accuracy": 85.2,
            "risk": "Moderate",
            "price": float(close_series.iloc[-1]),
            "trend": float(data['Return'].iloc[-1] * 100) if 'Return' in data else 0.0
        })

    except Exception as e:
        # This helps you see the exact error in Render logs
        print(f"Error in /predict: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)


