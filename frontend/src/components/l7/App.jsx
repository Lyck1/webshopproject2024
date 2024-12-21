import React, { useEffect, useState } from "react";
import {Route, Routes, Link } from "react-router-dom";
import Basket from "./Basket";
import { useRef } from "react";
import CardContainer from '../l4/CardContainer';

export default function App() {
  const [basket, setBasket] = useState([]);
  const [cards, setCards] = useState([]);
  const inputRef = useRef(null);
  const [isAddedToggle, setAdded] = useState(false)

  const DJANGO_SERVER = 'http://127.0.0.1:8000';
  let cardList = []

  useEffect(() => {

      fetch(DJANGO_SERVER+'/api/cards/')
      .then(res => res.json())
      .then(data => {
        console.log("My data: " + data);
        data.forEach(c => cardList.push(c.color));
        setCards(cardList);
        cardList=[];
        })
      .catch( error => {console.log(error)});
    }, [isAddedToggle]);
  

  const addToBasket = (card) => {
    setBasket((prevBasket) => [...prevBasket, card]);
  };

  const removeFromBasket = (card) => {
    setBasket((prevBasket) => prevBasket?.filter((item) => item !== card));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const addCardToList = (event) => {
    event.preventDefault();
    const card = inputRef.current.value;

    fetch(DJANGO_SERVER+'/api/cards/', 
        {
          method: 'post',
          headers: {'Content-type': 'application/json'},
          body : JSON.stringify({'color': card, 'price': '3' })
        })
      .then(resp => {
        setAdded(!isAddedToggle)
      })
    
    inputRef.current.value = "";
  };

  return (
    <div style={{ padding: "20px" }}>
      <nav>
        <Link to="/l7">Home</Link>
        <Link to="/l7/basket" style={{ marginLeft: "10px" }}>
          Go to Basket ({basket.length})
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h3>Add a Card</h3>
              <div>
                <form onSubmit={addCardToList}>
                  <input
                    ref={inputRef}
                    placeholder="Enter Card Color"
                    required
                  />
                  <br></br>
                  <button
                    type="submit"
                    style={{ background: "lightBlue", marginTop: "10px" }}
                  >
                    Add Card
                  </button>
                </form>
              </div>
              <h3>Card Collection</h3>
              <div style={{ display: "flex" }}>
                <CardContainer
                  cardList={cards}
                  addToBasket={addToBasket}
                  basket={basket}
                />
              </div>
            </div>
          }
        />
        <Route
          path="/basket"
          element={
            <Basket
              basketItems={basket}
              removeFromBasket={removeFromBasket}
              clearBasket={clearBasket}
            />
          }
        />
      </Routes>
    </div>
  );
}


