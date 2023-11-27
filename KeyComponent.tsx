type KeyComponentProps={
    act: string
}

const KeyComponent = (props: KeyComponentProps)=>{
    return (
        <button className='op border-black border-radius-8 color-white font-size font-family'>
            {props.act}
        </button>
    );
}
export default KeyComponent;