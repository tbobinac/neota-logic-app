import { Outlet, Link } from "react-router-dom";
import { Wind } from "lucide-react";
import { NavBar } from "@/components/layout/NavBar";
import { ControlBar } from "@/components/layout/ControlBar";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-6 border-b px-6 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Wind className="size-4" />
          </span>
          <span className="text-sm font-medium">Air Quality Insights</span>
        </Link>
        <NavBar />
      </header>
      <ControlBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};
