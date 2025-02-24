import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DiseaseSearch from "./components/DiseaseSearch";

const App = () => {
    return (
        <Router>
            <div style={styles.container}>
                <h1>Ayurveda Disease Finder</h1>
                <nav style={styles.navbar}>
                    <Link to="/" style={styles.link}>Home</Link>
                    <Link to="/search" style={styles.link}>Search Disease</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<DiseaseSearch />} />
                </Routes>
            </div>
        </Router>
    );
};

const Home = () => (
    <div style={styles.homeContainer}>
        <h2>Welcome to Ayurveda Drug & Formulation Finder</h2>
        <p>Search for diseases, related drugs, and their formulations from Ayurvedic texts.</p>
    </div>
);

// ✅ Basic CSS-in-JS styling
const styles = {
    container: { textAlign: "center", padding: "20px" },
    navbar: { display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" },
    link: { textDecoration: "none", fontSize: "18px", color: "#4CAF50", fontWeight: "bold" },
    homeContainer: { padding: "20px", backgroundColor: "#f1f1f1", borderRadius: "10px", margin: "20px" },
};

export default App;
