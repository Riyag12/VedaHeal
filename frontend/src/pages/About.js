import React from "react";
import "../styles/About.css"; // ✅ Import CSS

const About = () => {
    return (
        <div className="about-container">
            <h1>About VedaHeal</h1>  

            <div className="section">
                <h2>🌿 Why Ayurveda?</h2>
                <p>
                Ayurveda, the science of life, is a time-tested healing system that has flourished for over 5,000 years. Unlike modern medicine, which often focuses on treating symptoms, Ayurveda delves into the root cause of ailments, promoting balance between the mind, body, and spirit. It harnesses the power of natural herbs, holistic therapies, and personalized treatments to restore health and prevent diseases. With an emphasis on sustainable well-being, Ayurveda offers remedies that are not only effective and chemical-free but also aligned with the body's natural rhythms, making it a truly timeless path to healing and longevity.
                </p>
            </div>

            <div className="section">
                <h2>🛠 How VedaHeal Works?</h2>
                <ul>
                    <li><strong>Search for a Disease:</strong> Find Ayurvedic medicines for specific diseases.</li>
                    <li><strong>Search for a Herb:</strong> Discover which diseases a herb can cure.</li>
                    <li><strong>Dosage & Formulations:</strong> Learn how to use each remedy correctly.</li>
                </ul>
            </div>

            <div className="section">
                <h2>📚 Our Data Sources</h2>
                <p>
                    All information is sourced from authentic Ayurvedic classical texts and trusted repositories  
                    to ensure accuracy and reliability.
                </p>
            </div>

            <div className="section">
                <h2>👨‍💻 About the Developers</h2>
                <ol>
                    <li><strong>Swati:</strong> <a href="mailto:imswatipaul@gmail.com">imswatipaul@gmail.com</a></li>
                    <li><strong>Riya Garg:</strong> <a href="mailto:riyagargs121@gmail.com">riyagargs121@gmail.com</a></li>
                    <li><strong>Anal Singh:</strong> <a href="mailto:analsingh5833@gmail.com">analsingh5833@gmail.com</a></li>
                </ol>
            </div>

            <div className="section contact-section">
                <h2>📞 Contact Us</h2>
                <p>For any queries or feedback, feel free to reach out!</p>
                <p>Email: <a href="mailto:support@vedaheal.com">support@vedaheal.com</a></p>
            </div>
        </div>
    );
};

export default About;
