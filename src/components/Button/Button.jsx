import "./Button.css";

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//TODO: Add PropTypes

export default Button;
