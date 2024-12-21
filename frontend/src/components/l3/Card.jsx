import Square from '../common/Square'
import Label from '../common/Label'

export default function Card(props){
    const cardStyle ={
        width: "100px",
        height: "200px",
        margin: '10px',
        border: '1px black solid'
    }

    return (
        <div style={cardStyle} onClick={() => 
        alert("you clicked " + props.color)}>
            <Square sColor={props.color}></Square>
            <Label lColor={props.color}></Label>
        </div>
    )
}