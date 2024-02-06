import { Outlet, Route, Routes } from "react-router-dom";

import { UserNav } from "../components/nav/UserNav";
import { MyRecipes } from "../components/myrecipes/MyRecipes";
import { UserHome } from "../components/homepage/UserHome";
import { UserSearch } from "../components/search/UserSearch";
import { Favorites } from "../components/favorites/Favorites";
import { Profile } from "../components/profile/Profile";
import { PostForm } from "../forms/PostForm";
import { EditPostForm } from "../forms/EditPostForm";
import { EditProfileForm } from "../forms/EditProfileForm";

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
        <Route path="favorites">
          <Route index element={<Favorites currentUser={currentUser} />} />
        </Route>
        <Route path="search">
          <Route index element={<UserSearch currentUser={currentUser} />} />
        </Route>
        <Route path="profile">
          <Route index element={<Profile currentUser={currentUser} />} />
        </Route>
        <Route path="newpost">
          <Route index element={<PostForm currentUser={currentUser} />} />
        </Route>
        <Route path="posts/edit/:id">
          <Route index element={<EditPostForm currentUser={currentUser} />} />
        </Route>
        <Route path="/profile/edit/:id">
          <Route
            index
            element={<EditProfileForm currentUser={currentUser} />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
