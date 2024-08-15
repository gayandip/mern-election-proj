import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./pages/candidate.css";
import App from "./App";
import { createRoutesFromElements, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Votercard from "./pages/Votercard";
import Candidatelist from "./pages/Candidatelist";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="votercard" element={<Votercard />} />
      <Route path="candidatelist" element={<Candidatelist />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);
