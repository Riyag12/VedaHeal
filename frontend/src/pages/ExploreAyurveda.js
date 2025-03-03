import React, { useState } from "react";
import "../styles/ExploreAyurveda.css";
import HistoricalImportance from "../components/ExploreAyurveda/HistoricalImportance";
import FindYourDosha from "../components/ExploreAyurveda/FindYourDosha";
import AyurvedicDiet from "../components/ExploreAyurveda/AyurvedicDiet";
import YogaAndAyurveda from "../components/ExploreAyurveda/YogaAndAyurveda";
import SkinAndHairCare from "../components/ExploreAyurveda/SkinAndHairCare";
import AyurvedicPsychology from "../components/ExploreAyurveda/AyurvedicPsychology";

const ExploreAyurveda = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  // Store all components in an object
  const cardComponents = {
    "Historical Importance": <HistoricalImportance />,
    "Find Your Dosha": <FindYourDosha />,
    "Ayurvedic Diet & Nutrition": <AyurvedicDiet />,
    "Yoga & Ayurveda": <YogaAndAyurveda />,
    "Skin & Hair Care": <SkinAndHairCare />,
    "Ayurvedic Psychology": <AyurvedicPsychology />,
  };

  const cardData = Object.keys(cardComponents);

  return (
    <div className="explore-wrapper">
      <div className="explore-container">
        {/* Cards Grid */}
        <section className="cards">
          {cardData.map((title, index) => (
            <div
              key={index}
              className={`card ${selectedCard === title ? "active" : ""}`}
              onClick={() => setSelectedCard(selectedCard === title ? null : title)}
            >
              <h3>{title}</h3>
            </div>
          ))}
        </section>
      </div>

      {/* Selected Card Content - Only appears when a card is selected */}
      {selectedCard && (
        <div className="selected-container active">
          <div className="selected-card">
            <h3>{selectedCard}</h3>
            {cardComponents[selectedCard]}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreAyurveda;
