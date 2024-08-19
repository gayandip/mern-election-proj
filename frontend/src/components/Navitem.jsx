import React from "react";
import { NavLink } from "react-router-dom";

function Navitem({text, link}) {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${isActive ? "text-white font-semibold" : ""}`
      }
    >
      {text}
    </NavLink>
  );
}

export default Navitem;
