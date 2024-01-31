import { Outlet, Route, Routes } from "react-router-dom";

import { UserNav } from "../components/nav/UserNav";
import { UserHome } from "../components/homepage/UserHome";

export const UserViews = ({ currentUser }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <UserNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<UserHome />} />
      </Route>
    </Routes>
  );
};
