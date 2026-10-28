import { useEffect, useState } from 'react';

function App() {
  const [backendMessage, setBackendMessage] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Backend API ko call kar rahe hain
    fetch('http://localhost:5000/api/data')
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received:", data);
        setBackendMessage(data.success ? "Connected Successfully!" : "Failed");
        setItems(data.items);
      })
      .catch((error) => {
        console.error("Error connecting to backend:", error);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Frontend & Backend Connection Test</h1>
      <p>Status: <strong>{backendMessage}</strong></p>
      
      <h3>Items from Backend:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;