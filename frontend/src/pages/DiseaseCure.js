import React, { useState } from "react";
import "../styles/DiseaseCure.css";

const DiseaseCure = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [diseaseData, setDiseaseData] = useState(null);
    const [fallbackResponse, setFallbackResponse] = useState(null);
    const [rawChatResponse, setRawChatResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!searchTerm) {
            setError("Please enter a disease name.");
            return;
        }

        setError(null);
        setDiseaseData(null);
        setFallbackResponse(null);
        setRawChatResponse(null);

        fetch(`http://127.0.0.1:8000/diseases/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.drugs || data.drugs.length === 0) {
                    // Fetch from chatbot
                    fetch("http://127.0.0.1:8000/chat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            query: `Give Ayurvedic drugs and formulations that cure "${searchTerm}" in JSON format.
                            Respond like this:
                            {
                              "disease": "Disease Name",
                              "drugs": [
                                {
                                  "drug_name": "Name",
                                  "scientific_name": "Scientific name",
                                  "formulations": [
                                    { "name": "Formulation name", "dosage": "Dosage info" }
                                  ]
                                }
                              ]
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
                                    setRawChatResponse(chatData.response); // store raw text
                                }
                            } catch (e) {
                                setRawChatResponse(chatData.response); // store raw text
                            }
                        })
                        .catch(() => {
                            setError("Failed to fetch data from chatbot.");
                        });
                } else {
                    setDiseaseData(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data.");
            });
    };

    return (
        <div className="disease-cure-container">
            <h2>Disease Cure</h2>
            <p>Search for Ayurvedic remedies for diseases.</p>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Enter disease name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {/* ✅ PostgreSQL Structured Data */}
            {diseaseData && (
                <div className="result-container">
                    <h2>Cure for {diseaseData.disease}</h2>
                    <ul className="herb-list">
                        {diseaseData.drugs.map((drug, index) => (
                            <li key={index} className="herb-card">
                                <div className="herb-header">
                                    <strong>{index + 1}. {drug.drug_name}</strong> ({drug.scientific_name})
                                </div>
                                <div className="dosage-container">
                                    <h4>Dosage:</h4>
                                    <ul className="dosage-list">
                                        {drug.formulations.map((form, i) => (
                                            <li key={i} className="dosage-item">
                                                <strong>{form.name}</strong>: {form.dosage}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ✅ Chatbot Structured Response */}
            {fallbackResponse?.drugs && (
                <div className="result-container">
                    <ul className="herb-list">
                        {fallbackResponse.drugs.map((drug, index) => (
                            <li key={index} className="herb-card">
                                <div className="herb-header">
                                    <strong>{index + 1}. {drug.drug_name}</strong> ({drug.scientific_name})
                                </div>
                                <div className="dosage-container">
                                    <h4>Dosage:</h4>
                                    <ul className="dosage-list">
                                        {drug.formulations.map((form, i) => (
                                            <li key={i} className="dosage-item">
                                                <strong>{form.name}</strong>: {form.dosage}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* ✅ Raw fallback if response is not structured */}
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

export default DiseaseCure;
