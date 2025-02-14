export default function Label({ lColor, price, descr, createdAt }){
    const lStyle = {
        width : '100px',
        height: 'auto',
        marginLeft: "25px",
        marginTop: "0px",
        display: '',

    }

    return (
        <div style={lStyle}>
            {lColor}
            <br/>
            {descr}
            <br/>
            {price}
            <br/>
            {createdAt}
        </div>
    )

}
