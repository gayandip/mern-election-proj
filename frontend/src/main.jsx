import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createRoutesFromElements, Route } from "react-router-dom";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import CreateCard from "./pages/user/CreateCard";
import RegisterCandidate from "./pages/candidate/Register";
import UserDashboard from "./pages/user/Dashboard";
import CandidateDashboard from "./pages/candidate/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Profile from "./pages/user/Profile";
import Card from "./components/Card";
import RegisterAdmin from "./pages/admin/Register"
import CardTable from "./components/CardTable";
import Castvote from "./pages/user/Castvote";
import ResultTable from "./components/ResultTable";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="users">
        <Route path="dashboard" element={<UserDashboard/>} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="createcard" element={<CreateCard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="viewcard" element={<Card />} />
        <Route path="view/candidates" element={<Castvote />} />
        <Route path="view/result" element={<ResultTable />} />
      </Route>

      <Route path="candidates">
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="register" element={<RegisterCandidate />} />
      </Route>

      <Route path="admins">
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="register" element={<RegisterAdmin />} />
        
        <Route path="view">
          <Route path="cards" element={<CardTable />} />
        </Route>
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <RouterProvider router={routes} />
  // </React.StrictMode>
);
