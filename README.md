# Stock-Market-
ML projects, stock market prediction
# 📈 StockML · Prediction Pipeline

A machine learning-powered stock market analysis and prediction dashboard built using a full data science pipeline. This project simulates stock data, applies technical analysis, trains multiple ML models, and evaluates trading strategies through backtesting — all visualized in an interactive web interface.

---

## 🚀 Project Overview

StockML demonstrates an **end-to-end machine learning workflow** for financial data:

- 📦 Data Simulation (Geometric Brownian Motion)
- 🔧 Feature Engineering (25 technical indicators)
- ✂️ Time Series Splitting (Train / Validation / Test)
- ⚖️ Data Scaling (StandardScaler)
- 🤖 Model Training (4 ML classifiers)
- 📊 Cross-Validation (TimeSeriesCV)
- 📈 Strategy Backtesting
- 📉 Performance Visualization

---

## 🧠 Machine Learning Models Used

The project compares 4 classification models:

- Logistic Regression (LR)
- Random Forest (RF)
- Gradient Boosting (GB)
- Support Vector Machine (SVM)

Each model is evaluated using:
- Accuracy
- ROC-AUC Score
- Cross-validation performance

---

## 📊 Features & Technical Indicators

A total of **25 features** were engineered from stock data, including:

- Moving Averages (SMA)
- Relative Strength Index (RSI)
- MACD (Moving Average Convergence Divergence)
- Bollinger Bands
- ATR (Average True Range)
- OBV (On-Balance Volume)

These indicators help the models identify patterns in price movement.

---

## 📈 Data Generation

Instead of real stock data, the project uses:

- **Geometric Brownian Motion (GBM)**  
  → A mathematical model commonly used to simulate stock price movements.

- Dataset:
  - ~1,200 synthetic trading days
  - Simulates realistic market behavior

---

## 🧪 Model Training Pipeline

1. **Data Ingestion**
   - OHLCV (Open, High, Low, Close, Volume)

2. **Feature Engineering**
   - Generate 25 technical indicators

3. **Temporal Split**
   - 70% Training
   - 15% Validation
   - 15% Testing

4. **Scaling**
   - StandardScaler applied to normalize data

5. **Training**
   - 4 ML models trained

6. **Validation**
   - TimeSeries Cross-Validation (5-fold)

---

## 📉 Backtesting Strategy

The project includes a **trading simulation engine**:

- Strategy: Long-only
- Threshold: 0.54 probability
- No transaction costs
- Compared against Buy & Hold

### Metrics:
- Total Return
- Sharpe Ratio
- Equity Curve

---

## 📊 Dashboard Features

The frontend dashboard (HTML + CSS + JavaScript + Chart.js) includes:

### 📌 Key Sections:
- Pipeline Visualization
- Key Performance Metrics
- Technical Analysis Charts:
  - Price + SMA
  - RSI
  - MACD
- Model Performance:
  - Accuracy & ROC-AUC
  - ROC Curves
  - Cross-validation results
- Model Comparison Table
- Backtesting Results
- Feature Importance (Random Forest)
- Confusion Matrices

---

## 🖥️ Tech Stack

### Frontend:
- HTML5
- CSS3
- JavaScript
- Chart.js

### Machine Learning (conceptual/backend):
- scikit-learn
- NumPy
- Pandas

---

## 📂 Project Structure

