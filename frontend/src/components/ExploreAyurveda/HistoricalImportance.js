import React from "react";
import "../../styles/ExploreAyurveda/HistoricalImportance.css";

const HistoricalImportance = () => {
  return (
    <div className="historical-container">
      <h2>The Timeless Science of Ayurveda: A 5000-Year Legacy</h2>

      <div className="history-content">
        <p>
          Ayurveda, derived from the Sanskrit words <strong>"Ayus"</strong> (life) and <strong>"Veda"</strong> (science or knowledge), 
          translates to <strong>"The Science of Life"</strong>. It is one of the world’s oldest healing systems, originating in <strong>ancient India</strong> 
          over <strong>5000 years ago</strong>. Unlike modern medicine, which often focuses on symptomatic relief, Ayurveda emphasizes <strong>holistic well-being</strong> 
          by balancing the mind, body, and spirit.
        </p>

        <h3>🌿 Roots in the Vedas</h3>
        <p>
          The foundation of Ayurveda can be traced to the <strong>Vedas</strong>, India's ancient scriptures of knowledge. Among them, the <strong>Atharvaveda</strong> 
          contains detailed references to herbs, treatments, and holistic healing. The principles of Ayurveda were later documented in classical texts, 
          forming the basis of its teachings:
        </p>

        <ul>
          <li>
            <strong>Charaka Samhita (200 BCE - 200 CE)</strong> – A comprehensive text on internal medicine, disease prevention, and herbal treatments. 
            Written by <strong>Acharya Charaka</strong>, it emphasizes the importance of <strong>diet, digestion, and lifestyle</strong> in maintaining health.
          </li>
          <li>
            <strong>Sushruta Samhita (circa 600 BCE)</strong> – Often called the "father of surgery", <strong>Acharya Sushruta</strong> described over 300 surgical procedures, 
            120 surgical instruments, and intricate details of human anatomy. This text introduced plastic surgery, cataract removal, and wound management.
          </li>
          <li>
            <strong>Ashtanga Hridayam (500 CE)</strong> – Compiled by Vagbhata, this text simplifies Ayurveda into eight branches (Ashtanga Ayurveda), 
            covering everything from pediatrics to geriatrics, surgery, and toxicology.
          </li>
        </ul>

        <h3>⚖️ The Core Philosophy: Balance & Harmony</h3>
        <p>
          Ayurveda is based on the concept of Tridosha, which categorizes human health into three fundamental energies or doshas:
        </p>
        <ul>
          <li><strong>Vata</strong> (Air & Space) – Governs movement, creativity, and nervous system functions.</li>
          <li><strong>Pitta</strong> (Fire & Water) – Regulates metabolism, digestion, and energy production.</li>
          <li><strong>Kapha</strong> (Earth & Water) – Controls structure, immunity, and emotional stability.</li>
        </ul>
        <p>
          Health is achieved by maintaining a balance between these doshas through diet, lifestyle, and herbal remedies. 
          Ayurveda also emphasizes daily routines (Dinacharya), seasonal practices (Ritucharya), and detoxification therapies (Panchakarma).
        </p>

        <h3>🏺 Evolution & Modern Relevance</h3>
        <p>
          Despite its ancient roots, Ayurveda remains relevant today. Modern research validates many Ayurvedic principles, 
          and it is increasingly integrated with complementary medicine. Ayurvedic practices such as herbal medicine, yoga, meditation, detoxification therapies, 
          and mindful eating are widely adopted for holistic well-being.
        </p>
        <p>
          Governments and scientific bodies worldwide recognize Ayurveda's contributions to natural medicine, with institutions dedicated to its study and practice. 
          In India, the Ministry of AYUSH promotes Ayurveda on a global scale, and Ayurvedic universities continue to train practitioners.
        </p>
      </div>

      <div className="cta">
        <p>Want to explore more about Ayurveda’s rich history and healing wisdom?</p>
        <button className="read-more">
            <a href="https://ayush.gov.in/#!/" target="_blank" rel="noopener noreferrer">
                Read More
            </a>
        </button>

      </div>
    </div>
  );
};

export default HistoricalImportance;