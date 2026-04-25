from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from main import get_prediction # Importing your logic

app = Flask(__name__)
CORS(app) # Allows your React app to talk to this API

@app.route('/predict', methods=['POST'])
def predict():
    try:
        stock = request.json['stock']
        # ... your existing data processing code ...

        # Ensure this 'return' is aligned with the 'stock =' line above
        return jsonify({
            "prediction": int(prediction),
            "chart": data['Close'].tail(25).values.flatten().tolist(),
            "portfolio": 42850,
            "profit": 12.5,
            "accuracy": 85.2,
            "risk": "Moderate",
            "price": float(close.iloc[-1]),
            "trend": float(data['Return'].iloc[-1] * 100)
        })

    except Exception as e:
        return jsonify({"error": str(e)})
@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "QuantCore Engine Online"})

if __name__ == "__main__":
    # Render uses the PORT environment variable
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)


