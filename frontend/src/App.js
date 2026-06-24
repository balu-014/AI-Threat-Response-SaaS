import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://127.0.0.1:8001";

function App() {
  const [result, setResult] = useState(null);

  const predictThreat = async () => {
    const data = {
      features: [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        0
      ]
    };

    try {
      const response = await axios.post(
        `${API_URL}/predict`,
        data
      );

      console.log(response.data);

      setResult(response.data);

    } catch (error) {
      console.log(error);

      setResult({
        prediction: "Error",
        severity: "Error",
        message: "API Connection Failed"
      });
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial"
      }}
    >
      <h1>AI Threat Response Dashboard</h1>

      <button
        onClick={predictThreat}
        style={{
          padding: "15px",
          fontSize: "18px"
        }}
      >
        Analyze Threat
      </button>

      <h2>Prediction Result</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          width: "400px",
          margin: "auto"
        }}
      >
        {result ? (
          <>
            <h3>Prediction: {result.prediction}</h3>

            <h3>Severity: {result.severity}</h3>

            <h3>{result.message}</h3>
          </>
        ) : (
          <p>Click Analyze Threat</p>
        )}
      </div>
    </div>
  );
}

export default App;