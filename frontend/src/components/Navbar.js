import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.logo}>VedaHeal</h1>
            <ul style={styles.navLinks}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
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
        padding: "10px 20px",
        color: "white"
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
