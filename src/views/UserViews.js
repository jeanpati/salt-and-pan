import { Outlet, Route, Routes } from "react-router-dom";

import { UserNav } from "../components/nav/UserNav";
import { MyRecipes } from "../components/myrecipes/MyRecipes";
import { UserHome } from "../components/homepage/UserHome";
import { UserSearch } from "../components/search/UserSearch";

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
        <Route path="myrecipes">
          <Route index element={<MyRecipes currentUser={currentUser} />} />
        </Route>
        <Route path="search">
          <Route index element={<UserSearch currentUser={currentUser} />} />
        </Route>
      </Route>
    </Routes>
  );
};
