import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";

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
      <h2 className="user-header">{user.username}'s Profile</h2>
      <div>
        <span className="user-info">Username : </span>
        {user.username}
      </div>
      <div>
        <span className="user-info">Email : </span>
        {user.email}
      </div>
      <div>
        <span className="user-info">Bio : </span>
        {user.bio}
      </div>
      <div>
        <span className="user-info">Date Joined : </span>
        {user.created}
      </div>
      <button className="edit-btn" onClick={handleEdit}>
        Edit
      </button>
    </section>
  );
};
