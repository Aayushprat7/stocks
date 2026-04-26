import yfinance as yf
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD
from sklearn.ensemble import RandomForestClassifier
import numpy as np

def get_prediction(stock_ticker):
    try:
        # Download data up to today's date
        data = yf.download(stock_ticker, start="2020-01-01", end="2026-04-26")
        
        if data.empty:
            return None, None

        # Handle yfinance multi-index if necessary
        close = data['Close'].squeeze()

        # Feature Engineering
        data['MA10'] = close.rolling(10).mean()
        data['MA50'] = close.rolling(50).mean()
        
        rsi = RSIIndicator(close=close)
        data['RSI'] = rsi.rsi()
        
        macd = MACD(close=close)
        data['MACD'] = macd.macd()
        data['MACD_signal'] = macd.macd_signal()
        
        data['Return'] = close.pct_change()

        # Target: Will price go up tomorrow?
        data['Target'] = (close.shift(-1) > close).astype(int)
        data.dropna(inplace=True)

        features = ['MA10', 'MA50', 'RSI', 'MACD', 'MACD_signal', 'Return']
        X = data[features]
        y = data['Target']

        # Train Model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)

        # Predict latest
        latest = X.iloc[-1:].values
        prediction = model.predict(latest)[0]
        
        # Return both signal and dataframe for app.py to process
        return int(prediction), data

    except Exception as e:
        print(f"Logic Error: {e}")
        return None, None
