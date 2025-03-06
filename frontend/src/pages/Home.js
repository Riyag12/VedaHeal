import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="overlay">
                <h1>VedaHeal</h1>
                <p>Your trusted platform for Ayurvedic remedies and natural healing.</p>

                <div className="home-links">
                    <div className="home-card" onClick={() => navigate("/disease-cure")}>
                        <h2>Disease Cure</h2><br/>
                        <p>Find Ayurvedic treatments for various diseases.</p>
                    </div>

                    <div className="home-card" onClick={() => navigate("/herb-benefits")}>
                        <h2>Herb Benefits</h2><br/>
                        <p>Discover the healing properties of Ayurvedic herbs.</p>
                    </div>

                    <div className="home-card" onClick={() => navigate("/chatbot")}>
                        <h2>Chat with VedaHeal</h2><br/>
                        <p>Ask Ayurvedic-related questions to our AI.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;