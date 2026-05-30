import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { routes } from "@/routes";

export const NavBar = () => {
  return (
    <nav className="flex gap-1 rounded-md bg-muted p-1">
      {routes.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "rounded-sm px-3 py-1.5 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
