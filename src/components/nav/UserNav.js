import { Link } from "react-router-dom";
import "./NavBar.css";

export const UserNav = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/search">
          Search
        </Link>
      </li>
      <li className="navbar-item navbar-logout">
        <Link className="navbar-link" to="/login">
          Log in / Create Profile
        </Link>
      </li>
    </ul>
  );
};
