import "./Nav.css";

export const Nav = ({ setPlace }) => {
  return (
    <nav className="nav">
      <button onClick={() => setPlace("world")}>World</button>
      <button onClick={() => setPlace("parador")}>Parador</button>
    </nav>
  );
};
