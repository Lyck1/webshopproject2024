import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Basket from "./Basket";
import { useRef } from "react";
import CardContainer from ".//CardContainer";

export default function App() {
  const [cards, setCards] = useState([]);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const [isAddedToggle, setAdded] = useState(false);
  const [isPopulate, setPopulate] = useState(false);
  const getBasketFromLocalStorage = () => {
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  };

  const [basket, setBasket] = useState(getBasketFromLocalStorage);


  const DJANGO_SERVER = "http://127.0.0.1:8000";



  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
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
            user_id: c.user_id,
          }
        });
        setCards(cardList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isAddedToggle, isPopulate, basket]);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(DJANGO_SERVER + "/api/auth/verify-token", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Token ${token}`,
        },
    });
    if (response.ok) {
      const data = await response.json();
      return { isValid: data.isValid, userId: data.userId }; // Return both isValid and userId
    } else {
      return { isValid: false, userId: null };
    }
  } catch (error) {
    console.error('Error verifying token:', error);
    return { isValid: false, userId: null };
  }
};
  const addToBasket = async (card) => {
    const userToken = localStorage.getItem("userToken");
    console.log(card)
    if (!userToken) {
      console.log("No user is logged in", userToken);
      return;
    }

    const { isValid, userId } = await verifyToken(userToken);
    if (!isValid) {
      console.log("Token is not valid", isValid);
      return;
    }

    if (card.user_id === userId) {
      console.log('User cannot add their own items to the basket.');
      return;
    }

    setBasket((prevBasket) => {
      const updatedBasket = [...prevBasket, card];
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
      return updatedBasket;
    });
  };

  const removeFromBasket = (card) => {
    setBasket((prevBasket) => prevBasket?.filter((item) => item !== card));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const addCardToList = (event) => {
    event.preventDefault();
    const card = titleRef.current.value;
    const description = descriptionRef.current.value;
    const price = priceRef.current.value;
    const userToken = localStorage.getItem("userToken");

    fetch(DJANGO_SERVER + "/api/cards/", {
      method: "post",
      headers: {
        "Authorization": `Token ${userToken}`,
        "Content-type": "application/json" },
      body: JSON.stringify({ color: card, description: description, price: price}),
    }).then(() => {
      setAdded(!isAddedToggle);
    });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
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

  function  depopulateDB(){
    fetch(DJANGO_SERVER + "/api/depopulate/", {
      method: "post",
      headers: {"Content-type": "application/json" },
      body: {},
    }).then((resp) => {
      if (resp.status === 200) {
        setPopulate(false);
      }
    })
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
        {(
            <button onClick={(depopulateDB)}>Depopulate DB</button>
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
                    ref={titleRef}
                    placeholder="Enter Card Title"
                    required
                  />
                  <br></br>
                  <input
                    ref={descriptionRef}
                    placeholder="Enter Card Description"
                    required
                  />
                  <br></br>
                  <input
                    ref={priceRef}
                    placeholder="Enter Card Price"
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
