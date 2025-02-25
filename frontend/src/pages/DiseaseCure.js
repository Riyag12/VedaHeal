import React, { useState } from "react";
import "../styles/DiseaseCure.css";

const DiseaseCure = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [diseaseData, setDiseaseData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!searchTerm) {
            setError("Please enter a disease name.");
            return;
        }

        fetch(`http://127.0.0.1:8000/diseases/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.drugs || data.drugs.length === 0) {
                    setError("No data found for this disease.");
                    setDiseaseData(null);
                } else {
                    setDiseaseData(data);
                    setError(null);
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
        </div>
    );
};

export default DiseaseCure;