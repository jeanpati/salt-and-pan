import { Link } from "react-router-dom";
import "./NavBar.css";

export const UserNav = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/myrecipes">
          My Recipes
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/favorites">
          Favorites
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/search">
          Search
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/profile">
          Profile
        </Link>
      </li>
      {localStorage.getItem("salt_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to="/login"
            onClick={() => {
              localStorage.removeItem("salt_user");
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
