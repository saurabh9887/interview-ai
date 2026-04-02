import { Outlet } from "react-router";
import AppSidebar from "./Sidebar";
import { SidebarProvider } from "./ui/sidebar";

export function AppLayout() {
  return (
    <div className="flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
