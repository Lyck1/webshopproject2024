import Card from './Card'

export default function CardContainer(props){
    

    const jsxCardList = props.cardList?.map(
        (ccolor, idx) => (
            <Card key={idx} color={ccolor}  addToBasket={props.addToBasket} basketItems={props.basket}></Card>)

    )
    return (
        <div style={{display:'flex'}}>
           {jsxCardList}
        </div>
    )

}