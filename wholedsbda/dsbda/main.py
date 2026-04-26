import yfinance as yf
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import MACD
from sklearn.ensemble import RandomForestClassifier
import numpy as np

def get_prediction(stock_ticker):
    try:
        # Download data
        data = yf.download(stock_ticker, start="2020-01-01", end="2026-04-26", auto_adjust=True)
        
        if data.empty:
            return None, None

        # FIX: Flatten Multi-Index columns if present
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = data.columns.get_level_values(0)

        # Ensure we have a clean Close series
        close = data['Close']

        # Feature Engineering
        data['MA10'] = close.rolling(10).mean()
        data['MA50'] = close.rolling(50).mean()
        
        rsi_gen = RSIIndicator(close=close)
        data['RSI'] = rsi_gen.rsi()
        
        macd_gen = MACD(close=close)
        data['MACD'] = macd_gen.macd()
        data['MACD_signal'] = macd_gen.macd_signal()
        
        data['Return'] = close.pct_change()

        # Target and cleanup
        data['Target'] = (close.shift(-1) > close).astype(int)
        data = data.dropna()

        if data.empty:
            return None, None

        features = ['MA10', 'MA50', 'RSI', 'MACD', 'MACD_signal', 'Return']
        X = data[features]
        y = data['Target']

        # Train Model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)

        # Predict latest row
        latest = X.iloc[-1:].values
        prediction = model.predict(latest)[0]
        
        return int(prediction), data

    except Exception as e:
        print(f"Logic Error in main.py: {e}")
        return None, None
