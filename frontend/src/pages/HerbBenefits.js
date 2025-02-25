import React, { useState } from "react";
import "../styles/HerbBenefits.css";

const HerbBenefits = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [herbData, setHerbData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = () => {
        if (!searchTerm) {
            setError("Please enter an herb name.");
            return;
        }

        fetch(`http://127.0.0.1:8000/herbs/${searchTerm}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.diseases || data.diseases.length === 0) {
                    setError("No diseases found for this herb.");
                    setHerbData(null);
                } else {
                    setHerbData(data);
                    setError(null);
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
        </div>
    );
};

export default HerbBenefits;