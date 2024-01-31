import { useEffect, useState } from "react";
import { UserViews } from "./UserViews";
import { GeneralViews } from "./GeneralViews";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localSaltUser = localStorage.getItem("salt_user");
    const saltUserObject = JSON.parse(localSaltUser);

    setCurrentUser(saltUserObject);
  }, []);

  return currentUser ? (
    <GeneralViews currentUser={currentUser} />
  ) : (
    <UserViews currentUser={currentUser} />
  );
};
