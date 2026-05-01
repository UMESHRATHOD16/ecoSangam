# EcoSangam

An integrated ecosystem for carbon emission tracking and prediction using machine learning.

## 📋 Project Structure

```
ecoSangam/
├── ml_service/          # FastAPI microservice for ARIMA forecasting
│   ├── app.py          # Main FastAPI application
│   ├── requirements.txt # Python dependencies
│   └── README.md        # ML Service documentation
├── README.md           # This file
└── [other project files]
```

## 🎯 Overview

EcoSangam provides:
- **Emission Tracking**: Real-time monitoring of carbon emissions per user
- **ARIMA Forecasting**: ML-based predictions for future emissions
- **Actionable Insights**: Reduction tips and forecast explanations

## 🚀 Quick Start

### ML Service Setup

```bash
cd ml_service
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

## 📡 API Endpoints

### ML Service (Port 8001)

- `GET /health` - Health check
- `POST /predict` - Get emission predictions

#### Predict Request

```json
{
  "user_id": "user@example.com",
  "history_days": 210
}
```

#### Predict Response

Returns:
- Next-day emission forecast
- Next-week emission forecast
- Next-month emission forecast
- Forecast explanations
- Reduction tips
- Daily/weekly/monthly graph series

## 🛠️ Tech Stack

| Language | Usage |
|----------|-------|
| Python | 95.5% - Core ML and backend logic |
| Cython | 2.8% - Performance optimization |
| C | 0.9% - Low-level operations |
| TypeScript | 0.5% - Frontend utilities |
| C++ | 0.2% - Performance-critical code |
| JavaScript | 0.1% - Client-side scripts |

## 📦 Dependencies

See `ml_service/requirements.txt` for full dependency list.

Key dependencies:
- FastAPI - Web framework
- ARIMA - Time series forecasting

## 📝 License

[Add your license here]

## 👥 Contributors

- UMESHRATHOD16

## 📧 Contact

For questions or issues, please open a GitHub issue in this repository.
