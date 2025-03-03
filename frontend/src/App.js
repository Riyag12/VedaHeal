import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import DiseaseCure from "./pages/DiseaseCure";
import HerbBenefits from "./pages/HerbBenefits";
import About from "./pages/About";
import ExploreAyurveda from "./pages/ExploreAyurveda";
import "./App.css";

const App = () => {
    return (
        <Router>
            <div className="page-container">
                <Navbar />
                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/disease-cure" element={<DiseaseCure />} />
                        <Route path="/herb-benefits" element={<HerbBenefits />} />
                        <Route path="/explore-ayurveda" element={<ExploreAyurveda />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;