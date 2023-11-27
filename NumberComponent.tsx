type NumberComponentProps={
    number: number
}

const NumberComponent = (props: NumberComponentProps)=>{
    return (
        <button className='num border-black border-radius-8 color-white font-size font-family'>
            {props.number}
        </button>
    );
}
export default NumberComponent;