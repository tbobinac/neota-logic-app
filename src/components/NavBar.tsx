import { navItems } from "@/routes/routes";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      {navItems.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? "link-active" : "link")}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
