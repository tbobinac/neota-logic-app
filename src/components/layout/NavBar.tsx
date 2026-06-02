import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { routes } from "@/routes";

export const NavBar = () => {
  return (
    <nav className="flex w-fit gap-1 rounded-full bg-card p-1 shadow-sm sm:ml-auto">
      {routes.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
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
