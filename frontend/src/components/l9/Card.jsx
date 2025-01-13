import Square from '../common/Square';
import Label from '../common/Label';
import { useEffect, useState } from "react";

export default function Card(props) {
  const [isAdded, setAdd] = useState(false);

  useEffect(() => {
    const items = props.basketItems;
    if (items?.find((a) => a === props.color)) {
      setAdd(true);
    } else {
      setAdd(false);
    }
  }, [props.basketItems]);

  const cardStyle = {
    width: "150px",
    height: "300px",
    margin: "10px",
    border: "1px black solid",
    display: "grid",
    alignItems: "center",
  };

  const cardContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  function addToBasket() {
    const card = {
      color: props.color,
      price: props.price,
      description: props.description,
      created_at: props.created_at,
      user_id: props.user_id,
    }
    props.addToBasket(card);
    setAdd(true);
  }

  return (
    <div style={cardContainerStyle}>
      <div style={cardStyle}>
        <Square sColor={props.color ? props.color.split('_').pop() : 'defaultColor'} />
        <Label lColor={props.color} price={props.price} descr={props.description} createdAt={props.created_at}/>
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
