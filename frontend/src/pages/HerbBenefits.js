import React, { useState } from "react";
import "../styles/HerbBenefits.css";

const HerbBenefits = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [herbData, setHerbData] = useState(null);
    const [fallbackResponse, setFallbackResponse] = useState(null);
    const [rawChatResponse, setRawChatResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!searchTerm) {
            setError("Please enter an herb name.");
            return;
        }

        setError(null);
        setHerbData(null);
        setFallbackResponse(null);
        setRawChatResponse(null);

        fetch(`http://127.0.0.1:8000/herbs/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.diseases || data.diseases.length === 0) {
                    fetch("http://127.0.0.1:8000/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `What are the diseases that the Ayurvedic herb "${searchTerm}" can cure?
                            Don't write anything else, simply respond like this:
                            {
                              "name": "Herb Name",
                              "scientific_name": "Scientific Name",
                              "diseases": ["Disease 1", "Disease 2", "..."]
                            }`
                        })
                    })
                        .then((res) => res.json())
                        .then((chatData) => {
                            try {
                                const jsonMatch = chatData.response.match(/\{[\s\S]*\}$/);
                                if (jsonMatch) {
                                    const parsed = JSON.parse(jsonMatch[0]);
                                    setFallbackResponse(parsed);
                                } else {
                                    setRawChatResponse(chatData.response);
                                }
                            } catch (e) {
                                setRawChatResponse(chatData.response);
                            }
                        })
                        .catch(() => {
                            setError("Failed to fetch data from chatbot.");
                        });
                } else {
                    setHerbData(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            });
    };

    return (
        <div className="herb-benefits-container">
            <h2>Herb Benefits</h2>
            <p>Search for an Ayurvedic herb to see the diseases it can cure.</p>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter herb name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {/* ✅ PostgreSQL Response */}
            {herbData && (
                <div className="result-container">
                    <div className="herb-card">
                        <h2>{herbData.name} ({herbData.scientific_name})</h2>
                        <div className="disease-container">
                            <h3>Diseases it can cure:</h3>
                            <ul className="disease-list">
                                {herbData.diseases.map((disease, index) => (
                                    <li key={index} className="disease-item">
                                        <strong>{index + 1}. {disease}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Structured Fallback Response */}
            {fallbackResponse?.diseases && (
                <div className="result-container">
                    <div className="herb-card">
                        <h2>{fallbackResponse.name} ({fallbackResponse.scientific_name})</h2>
                        <div className="disease-container">
                            <h3>Diseases it can cure:</h3>
                            <ul className="disease-list">
                                {fallbackResponse.diseases.map((disease, index) => (
                                    <li key={index} className="disease-item">
                                        <strong>{index + 1}. {disease}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {/* ✅ Raw Chatbot Fallback */}
            {rawChatResponse && (
                <div className="chatbot-response">
                    <h3>Chatbot Suggestion (Unstructured)</h3>
                    <pre style={{ whiteSpace: "pre-wrap", backgroundColor: "#f5f5f5", padding: "10px", borderRadius: "5px" }}>
                        {rawChatResponse}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default HerbBenefits;
