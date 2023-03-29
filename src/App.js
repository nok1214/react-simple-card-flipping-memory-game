import React, { useState, useEffect } from 'react';
import './style.css';

export default function App() {
  const data = [1, 3, 1, 2, 3, 2];
  const [list, setList] = useState([]);
  const [card, setcard] = useState();

  useEffect(() => {
    setList(
      data.map((ele, idx) => ({
        id: idx,
        val: ele,
        isTurn: false,
      }))
    );
  }, []);

  const handleTurn = (clickedCard) => {
    setList((prevList) =>
      prevList.map((ele) => {
        if (ele.id === clickedCard.id) {
          return {
            ...ele,
            isTurn: !ele.isTurn,
          };
        }
        return ele;
      })
    );

    if (!card) {
      setcard(clickedCard);
    } else {
      if (card && card.val === clickedCard.val) {
        setTimeout(() => {
          setList((prevList) =>
            prevList.filter(
              (ele) => ele.id !== card.id && ele.id !== clickedCard.id
            )
          );
        }, 500);
      } else {
        setTimeout(() => {
          setList((prevList) =>
            prevList.map((ele) => ({
              ...ele,
              isTurn: false,
            }))
          );
        }, 500);
      }
      setcard(null);
    }
  };

  return (
    <div>
      <p>Start editing to see some magic happen :)</p>
      {list.length !== 0 &&
        list.map((ele) => (
          <div key={ele.id} className="box" onClick={() => handleTurn(ele)}>
            {ele.isTurn && ele.val}
          </div>
        ))}
      {list.length === 0 && <h1>Congratulation, you solved the puzzle!</h1>}
    </div>
  );
}
