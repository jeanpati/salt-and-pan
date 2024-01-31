import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../components/homepage/GeneralHome";
import { UserNav } from "../components/nav/UserNav";

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
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};
