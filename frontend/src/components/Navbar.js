import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logoContainer}>
                <img src={logo} alt="VedaHeal Logo" style={styles.logoImage} />
                <h1 style={styles.logoText}>VedaHeal</h1>
            </div>
            <ul style={styles.navLinks}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
                <li><Link to="/explore-ayurveda" style={styles.link}>Explore</Link></li>
                <li><Link to="/disease-cure" style={styles.link}>Disease Cure</Link></li>
                <li><Link to="/herb-benefits" style={styles.link}>Herb Benefits</Link></li>
                <li><Link to="/about" style={styles.link}>About</Link></li>
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#4CAF50",
        padding: "5px 20px",
        color: "white"
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    logoImage: {
        width: "40px",
        height: "40px",
    },
    logoText: {
        fontSize: "28px",
        fontWeight: "bold"
    },
    logo: {
        fontSize: "24px",
        fontWeight: "bold"
    },
    navLinks: {
        listStyle: "none",
        display: "flex",
        gap: "15px",
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "18px",
    }
};

export default Navbar;
