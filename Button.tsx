type ButtonProps = {
  content: string | number;
  type: string;
  onClick: (value: string) => void;
};

type Classes = {
  [action:string]: string;
  operation: string;
  number: string;
  equal: string;
}

  
const Button = (props: ButtonProps) => {
  const classes: Classes = {
    action: 'act border-black border-radius-8 color-white font-size font-family',
    number: 'num border-black border-radius-8 color-white font-size font-family',
    operation: 'op border-black border-radius-8 color-white font-size font-family',
    equal: 'eq border-black border-radius-8 color-white font-size font-family'
  }

  const handleClick = () => {
    console.log(`Button clicked: ${props.content}`);
    props.onClick(props.content.toString());
  };

  return (
    <button className={classes[props.type]} onClick={handleClick}>
      {props.content}
    </button>
  );
};
  
export default Button;
  
