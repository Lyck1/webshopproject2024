import React from 'react';

function Basket({ basketItems, removeFromBasket, clearBasket }) {
  return (
    <div>
      <h2>Your Basket</h2>
      {basketItems?.length === 0 ? (
        <p>Your basket is empty!</p>
      ) : (
        basketItems?.map((item) => (
          <div key={item} style={{ borderBottom: '1px solid #ccc', padding: '5px' }}>
            <span>{item}</span>
            <button onClick={() => removeFromBasket(item)} style={{ marginLeft: '10px' }}>Remove</button>
          </div>
        ))
      )}
      {basketItems?.length > 0 && (
        <button onClick={clearBasket} style={{ marginTop: '10px', color: 'red' }}>Clear Basket</button>
      )}
    </div>
  );
}

export default Basket;
