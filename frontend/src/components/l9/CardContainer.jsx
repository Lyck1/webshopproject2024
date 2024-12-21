import Card from './Card';

export default function CardContainer(props) {
  const jsxCardList = props.cardList?.map((card, idx) => (
    <Card
      key={idx}
      color={card.color}
      price={card.price}
      description={card.description}
      created_at={card.created_at}
      addToBasket={props.addToBasket}
      basketItems={props.basket}
    />
  ));

  return (
    <div style={{ display: "grid", gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr 1fr' }}>
      {jsxCardList}
    </div>
  );
}

