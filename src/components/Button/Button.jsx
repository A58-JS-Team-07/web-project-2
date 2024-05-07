import "./Button.css";

function Button({ onClick, children }) {

  //TODO: Add conditional rendering for different button variants styles

  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//TODO: Add PropTypes

export default Button;
