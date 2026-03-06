import SidebarGestor from '../components/SidebarGestor';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../components/ui/sidebar';
import { Outlet } from 'react-router-dom';


export default function Layout() {
  return (
    <SidebarProvider>
      <SidebarGestor />
      <SidebarInset>
        <main className="min-h-screen overflow-x-hidden p-4 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Gestor de Productos</h1>
          </div>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}