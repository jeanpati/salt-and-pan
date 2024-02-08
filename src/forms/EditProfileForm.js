import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUser, getUserById } from "../services/userService";

export const EditProfileForm = ({ currentUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(currentUser.id).then((res) => {
      const userInfo = res;
      setUser(userInfo);
    });
  }, [currentUser.id]);

  const handleSave = (e) => {
    e.preventDefault();
    if (user.username && user.email && user.bio) {
      const editedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        created: user.created,
      };
      editUser(editedUser).then(() => {
        navigate(`/profile`);
      });
    }
  };

  const handleInputChange = (event) => {
    const stateCopy = { ...user };
    stateCopy[event.target.name] = event.target.value;
    setUser(stateCopy);
  };

  return (
    <form className="profile">
      <h2>Edit Profile</h2>
      <fieldset>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username ? user.username : ""}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={user.email ? user.email : ""}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Bio:</label>
          <input
            type="text"
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-primary" onClick={handleSave}>
            Save Profile
          </button>
        </div>
      </fieldset>
    </form>
  );
};
