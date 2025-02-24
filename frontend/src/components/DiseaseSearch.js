import React, { useState } from "react";

const DiseaseSearch = () => {
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
        <div style={styles.container}>
            <h2>Search for Disease</h2>
            <input
                type="text"
                placeholder="Enter disease name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleSearch} style={styles.button}>
                Search
            </button>

            {error && <p style={styles.error}>{error}</p>}

            {diseaseData && (
                <div style={styles.resultContainer}>
                    <h2>{diseaseData.disease}</h2>
                    <h3>Related Drugs:</h3>
                    {diseaseData.drugs.map((drug, index) => (
                        <div key={index} style={styles.drugCard}>
                            <p>
                                <strong>{drug.drug_name}</strong> ({drug.scientific_name})
                            </p>
                            <h4>Formulations:</h4>
                            {drug.formulations.map((form, i) => (
                                <p key={i}>
                                    <strong>{form.name}</strong>: {form.dosage}
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ✅ Basic CSS-in-JS styling
const styles = {
    container: { textAlign: "center", padding: "20px" },
    input: { padding: "10px", margin: "10px", width: "300px" },
    button: { padding: "10px 20px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white", border: "none" },
    error: { color: "red", marginTop: "10px" },
    resultContainer: { marginTop: "20px", textAlign: "left", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" },
    drugCard: { backgroundColor: "#f9f9f9", padding: "10px", margin: "10px 0", borderRadius: "5px" },
};

export default DiseaseSearch;
