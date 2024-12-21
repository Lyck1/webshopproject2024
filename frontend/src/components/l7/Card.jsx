import Square from '../common/Square';
import Label from '../common/Label';
import { useEffect, useState } from "react";

export default function Card(props) {
  const [isAdded, setAdd] = useState(false);

  useEffect(()=>{
    const items=props.basketItems
    if(items?.find((a)=>a===props.color))
        setAdd(true)
    else{
        setAdd(false)
    }
  },[props.basketItems])

  const cardStyle = {
    width: "100px",
    height: "200px",
    margin: "10px",
    border: "1px black solid",
  };

  const cardContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  function addToBasket() {
    props.addToBasket(props.color);
    setAdd(true);
  }

  return (
    <div style={cardContainerStyle}>
      <div style={cardStyle}>
        <Square sColor={props.color}></Square>
        <Label lColor={props.color}></Label>
      </div>
      {isAdded ? (
        <p style={{ color: "green" }}>Card Added</p>
      ) : (
        <button
          onClick={addToBasket}
          style={{ backgroundColor: "black", color: "white" }}
        >
          Add to Basket
        </button>
      )}
    </div>
  );
}
