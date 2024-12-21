import React, { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Basket from "./Basket";
import { useRef } from "react";
import CardContainer from "../l9/CardContainer";

export default function App() {
  const [cards, setCards] = useState([]);
  const inputRef = useRef(null);
  const [isAddedToggle, setAdded] = useState(false);
  const [isPopulate, setPopulate] = useState(false);
  const getBasketFromLocalStorage = () => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  };

  const [basket, setBasket] = useState(getBasketFromLocalStorage);
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const DJANGO_SERVER = "http://127.0.0.1:8000";
  let cardList = [];


  useEffect(() => {
    fetch(DJANGO_SERVER + "/api/cards/")
      .then((res) => res.json())
      .then((data) => {
        console.log("My data: ", data);
        const cardList = data.map((c) => {
          const date = new Date(c.created_at);
          const formattedDate = date.toISOString().split("T")[0];
          return {
            color: typeof c.color === 'string' ? c.color : 'defaultColor',
            price: c.price,
            description: c.description,
            created_at: formattedDate,
          }
        });
        setCards(cardList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAddedToggle, isPopulate]);

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
    const userToken = localStorage.getItem("userToken");

    fetch(DJANGO_SERVER + "/api/cards/", {
      method: "post",
      headers: {
        "Authorization": `Token ${userToken}`,
        "Content-type": "application/json" },
      body: JSON.stringify({ color: card, description: "test", price: "3"}),
    }).then((resp) => {
      setAdded(!isAddedToggle);
    });

    inputRef.current.value = "";
  };

  function populateDB() {
    fetch(DJANGO_SERVER + "/api/populate/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: {},
    }).then((resp) => {
      if (resp.status === 200) {
        setPopulate(true);
      }
    });
  }

  return (
    <div style={{ padding: "20px" }}>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/basket" style={{ marginLeft: "10px" }}>
          Go to Basket ({basket.length})
        </Link>
        {isPopulate ? (
          <p style={{ color: "green" }}>Info is populated</p>
        ) : (
          <button onClick={populateDB}>Populate DB</button>
        )}
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
              <div className={"grid-container"} style={{ display: "grid" }}>
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
