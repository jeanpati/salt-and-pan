import { Link } from "react-router-dom";
import "./NavBar.css";

export const GeneralNav = () => {
  return (
    <ul className="navbar">
      <div className="navbar-container">
        <li className="navbar-item">
          <Link className="navbar-link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/search">
            Search
          </Link>
        </li>
        <div className="navbar-logout">
          <li className="navbar-item">
            <Link className="navbar-link" to="/login">
              Log in / Create Profile
            </Link>
          </li>
        </div>
      </div>
    </ul>
  );
};
