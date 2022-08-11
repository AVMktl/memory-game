import React from "react";
import sound from "../sound/flipSound.wav"

const Singlecard = ({card, handleChoice, flipped, disabled}) => {

  const handleClick = () => {
    if(!disabled){
      new Audio(sound).play();
      handleChoice(card)
    }
  }

  return (
    <div className="card" >
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" onClick={handleClick} src="/img/cover_img.jpg" alt="card back" />        
      </div>
    </div>
  );
};

export default Singlecard;
