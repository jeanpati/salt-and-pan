import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "./App.css";
import { ApplicationViews } from "./views/ApplicationViews";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<ApplicationViews />} />
      </Routes>
    </>
  );
};
