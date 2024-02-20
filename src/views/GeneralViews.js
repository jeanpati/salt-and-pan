import { Outlet, Route, Routes } from "react-router-dom";
import { GeneralHome } from "../components/homepage/GeneralHome";
import { GeneralNav } from "../components/nav/GeneralNav";
import { GeneralSearch } from "../components/search/GeneralSearch";
import { PostDetails } from "../components/posts/PostDetails";

export const GeneralViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <GeneralNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<GeneralHome />} />
        <Route path="search">
          <Route index element={<GeneralSearch />} />
        </Route>
        <Route path="posts/:id">
          <Route index element={<PostDetails />} />
        </Route>
      </Route>
    </Routes>
  );
};
