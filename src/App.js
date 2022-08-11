import { useEffect, useState } from "react";
import "./App.css";
import Singlecard from "./component/Singlecard";
import designImg from "./component/designImg.png";
import designImg2 from "./component/designImg2.png";

const cardImages = [
  { src: "/img/book_img.jpg", matched: false },
  { src: "/img/healmet_img.jpg", matched: false },
  { src: "/img/potion_img.jpg", matched: false },
  { src: "/img/shield_img.jpg", matched: false },
  { src: "/img/sword_img.jpg", matched: false },
  { src: "/img/treasure_img.jpg", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  //Choice One and Two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setTurns((prevTurns) => prevTurns + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        // console.log('those cards dont match')
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
      
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  // console.log(cards)
  /*
    let is = true;
    cards.forEach((card)=>{
      if(card.matched === false){
        is = false; 
      }
    })

    if(is){
      console.log("congo");
    }
  */

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  return (
   <div className="app">
    <h1 className="heading">Memory Up</h1>
     <div className="design-img1">
      <img src={designImg} alt="" />
      </div>
      <div className="main-App">
      
      <div className="details">
        <p>Turns: {turns}</p>
        <button onClick={shuffleCards}>New Game</button>
      </div>
  
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <Singlecard
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
    <div className="design-img2">
      <img src={designImg2} alt="" />
      </div>
   </div>
  );
}

export default App;
