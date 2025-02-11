import React, { useState } from "react";
import axios from "axios";

function App() {
  const [disease, setDisease] = useState("");
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await axios.get('http://127.0.0.1:8000/diseases/${disease}');
    setData(response.data);
  };

  return (
    <div>
      <h1>Ayurvedic Disease Finder</h1>
      <input type="text" onChange={(e) => setDisease(e.target.value)} placeholder="Enter disease" />
      <button onClick={fetchData}>Search</button>

      {data && (
        <div>
          <h2>Results:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;