import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const UserNav = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          My Recipes
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/">
          Favorites
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/search">
          Search
        </Link>
      </li>
      {localStorage.getItem("salt_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("salt_user");
              navigate("/", { replace: true });
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
