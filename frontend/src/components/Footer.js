import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Social Media Links */}
      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
      </div>

      {/* Contact Info */}
      <div className="contact-info">
        Contact us: <a href="mailto:support@vedaheal.com">support@vedaheal.com</a>
      </div>

      {/* Copyright */}
      <div className="copyright">
        © 2024 VedaHeal. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
