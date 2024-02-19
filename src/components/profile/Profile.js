import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import logo from "/Users/jean/workspace/salt-and-pan/src/assets/saltandpanlogo.png";
import "./Profile.css";

export const Profile = ({ currentUser }) => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserById(currentUser.id).then((res) => {
      const userInfo = res;
      setUser(userInfo);
    });
  }, [currentUser.id]);

  const handleEdit = (e) => {
    navigate(`/profile/edit/${currentUser.id}`);
  };

  return (
    <section className="user">
      <div className="profile-header">
        <h1>Profile</h1>
        <img className="profile-logo" src={logo} alt="" />
      </div>
      <div className="profile-wrapper">
        <div className="profile-card">
          <h2 className="user-header">{user.username}'s Profile</h2>
          <div className="user-info">
            <span>Username : </span>
            {user.username}
          </div>
          <div className="user-info">
            <span className="user-info">Email : </span>
            {user.email}
          </div>
          <div className="user-info">
            <span className="user-info">Bio : </span>
            {user.bio}
          </div>
          <div className="user-info">
            <span className="user-info">Date Joined : </span>
            {user.created}
          </div>
          <div className="btn-container">
            <button className="edit-btn" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
