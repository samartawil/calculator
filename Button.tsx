type ButtonProps = {
    content: string;
    type: string;
  };
  
const Button = (props: ButtonProps) => {
  return (
    <button
        className={
          props.type == 'action'
            ? 'act border-black border-radius-8 color-white font-size font-family'
          : props.type == 'number'
            ? 'num border-black border-radius-8 color-white font-size font-family'
          : props.type == 'operation'
            ? 'op border-black border-radius-8 color-white font-size font-family'
          : props.type == 'equal'
            ? 'eq border-black border-radius-8 color-white font-size font-family'
          : ''
        }>
      {props.content}
    </button>
  );
};
  
export default Button;
  
