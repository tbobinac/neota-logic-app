import { Outlet, Link } from "react-router-dom";
import { Wind } from "lucide-react";
import { NavBar } from "@/components/layout/NavBar";
import { ControlBar } from "@/components/layout/ControlBar";

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-[#f4f6f3]">
      <header className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pt-6 pb-2 sm:flex-row sm:items-center">
        <Link to="/" className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Wind className="size-6" />
          </span>
          <span className="text-3xl font-semibold tracking-tight">
            Air Quality Insights
          </span>
        </Link>
        <NavBar />
      </header>
      <div className="mx-auto max-w-7xl px-4 py-4">
        <ControlBar />
      </div>
      <main className="mx-auto max-w-7xl px-4 pb-8">
        <Outlet />
      </main>
    </div>
  );
};
