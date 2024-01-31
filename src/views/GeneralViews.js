import { Outlet, Route, Routes } from "react-router-dom";
import { GeneralHome } from "../components/homepage/GeneralHome";
import { GeneralNav } from "../components/nav/GeneralNav";

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
      </Route>
    </Routes>
  );
};
