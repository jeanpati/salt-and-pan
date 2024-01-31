import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { ApplicationViews } from "./views/ApplicationViews";
import { Authorized } from "./views/Authorized";
import { GeneralViews } from "./views/GeneralViews";
import { Home } from "./components/homepage/Home";

export const App = () => {
  return <Home />;
};
