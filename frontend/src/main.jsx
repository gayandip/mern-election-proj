import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createRoutesFromElements, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateCard from "./pages/CreateCard";
import Candidatelist from "./pages/Candidatelist";
import Card from "./pages/Card";

const routes = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="create/card" element={<CreateCard />} />
      <Route path="candidatelist" element={<Candidatelist />} />
      <Route path="card" element={<Card />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
