import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createRoutesFromElements, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateCard from "./pages/CreateCard";
import RegisterCandidate from "./pages/candidate/Register";
import Dashboard from "./pages/user/Dashboard";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="home" element={<Home />} />

      <Route path="users">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="createcard" element={<CreateCard />} />
      </Route>

      <Route path="candidates">
        <Route path="register" element={<RegisterCandidate />} />
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={routes} />
  // </React.StrictMode>
);
