<h1>🚨 Fraud Detection System</h1>

<p>
An end-to-end <strong>Fraud Detection Web Application</strong> built using
<strong>Machine Learning, FastAPI, and React (TypeScript)</strong>.
The system predicts whether a transaction should be <strong>ALLOWED</strong>
or <strong>BLOCKED</strong> based on behavioral and transactional patterns.
</p>

<hr />

<h2>📌 Project Overview</h2>

<p>
This project detects fraudulent transactions by analyzing user behavior
and transaction attributes. A trained machine learning model evaluates
incoming transactions in real time through a REST API, while a modern
React frontend allows users to test and visualize predictions.
</p>

<ul>
  <li>🔍 Real-time fraud prediction</li>
  <li>🧠 Machine Learning model with feature scaling</li>
  <li>⚡ FastAPI backend</li>
  <li>🎨 React + TypeScript frontend</li>
  <li>🌐 Deployed using Render</li>
</ul>

<hr />

<h2>🏗️ Project Structure</h2>

<pre>
fraud_detection/
│
├── backend/
│   ├── app/
│   │   ├── main.py            # FastAPI entry point
│   │   ├── predictor.py       # Prediction logic
│   │   ├── explainer.py       # Explainability logic
│   │   ├── model_loader.py    # Loads ML model & scaler
│   │
│   ├── models/
│   │   ├── fraud_model.pkl    # Trained ML model
│   │   ├── scaler.pkl         # Feature scaler
│   │
│   ├── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/               # API integration
│   │   ├── components/        # React components
│   │   ├── App.tsx
│   │
│   ├── package.json
│   ├── vite.config.ts
│
├── README.md
├── .gitignore
</pre>

<hr />

<h2>🧠 Machine Learning Model</h2>

<p>
The fraud detection model is trained on transactional and behavioral data.
It uses engineered features such as recent transaction frequency,
average spending behavior, and deviation from normal patterns.
</p>

<h3>Key Features Used</h3>

<ul>
  <li><strong>TransactionDT</strong> – Time of transaction</li>
  <li><strong>TransactionAmt</strong> – Transaction amount</li>
  <li><strong>tx_count_last_10</strong> – Number of recent transactions</li>
  <li><strong>avg_amt_last_10</strong> – Average amount of last transactions</li>
  <li><strong>amt_deviation</strong> – Deviation from normal spending</li>
  <li><strong>card1–card5</strong> – Card-related identifiers</li>
  <li><strong>addr1, addr2</strong> – Address-based risk indicators</li>
</ul>

<p>
A probability threshold is applied to decide whether a transaction
should be <strong>BLOCKED</strong> or <strong>ALLOWED</strong>.
</p>

<hr />

<h2>⚙️ Backend (FastAPI)</h2>

<h3>Run Locally</h3>

<pre>
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
</pre>

<h3>API Endpoints</h3>

<ul>
  <li><code>GET /health</code> – Health check</li>
  <li><code>POST /predict</code> – Fraud prediction</li>
</ul>

<h3>Sample Request</h3>

<pre>
POST /predict
Content-Type: application/json

{
  "TransactionDT": 25000,
  "TransactionAmt": 25,
  "tx_count_last_10": 1,
  "avg_amt_last_10": 27,
  "amt_deviation": -2,
  "card1": 300,
  "card2": 300,
  "card3": 150,
  "card5": 100,
  "addr1": 200,
  "addr2": 80
}
</pre>

<h3>Sample Response</h3>

<pre>
{
  "fraud_probability": 0.12,
  "decision": "ALLOW",
  "reasons": [
    "Transaction amount is within normal range",
    "User spending behavior is consistent"
  ]
}
</pre>

<hr />

<h2>🎨 Frontend (React + TypeScript)</h2>

<h3>Features</h3>

<ul>
  <li>Dynamic transaction input form</li>
  <li>Fraud prediction result visualization</li>
  <li>Human-readable explanation of prediction</li>
  <li>Type-safe API integration</li>
</ul>

<h3>Run Locally</h3>

<pre>
cd frontend
npm install
npm run dev
</pre>

<hr />

<h2>🚀 Deployment</h2>

<ul>
  <li><strong>Backend</strong>: Render Web Service</li>
  <li><strong>Frontend</strong>: Render Static Site</li>
</ul>

<h3>Render Frontend Settings</h3>

<ul>
  <li><strong>Root Directory:</strong> frontend</li>
  <li><strong>Build Command:</strong> npm install && npm run build</li>
  <li><strong>Publish Directory:</strong> dist</li>
</ul>

<hr />

<h2>📈 Future Improvements</h2>

<ul>
  <li>Authentication and user tracking</li>
  <li>Transaction history dashboard</li>
  <li>Advanced explainability (SHAP)</li>
  <li>Streaming fraud detection</li>
</ul>

<hr />

<h2>👨‍💻 Author</h2>

<p>
<strong>Arvinth Athikesav</strong><br />
Machine Learning & Full Stack Developer
</p>

<hr />

<h2>📄 License</h2>

<p>
This project is for educational and research purposes.
</p>
