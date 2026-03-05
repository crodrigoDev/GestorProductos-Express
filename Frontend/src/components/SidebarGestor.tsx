import { BadgeCheck, LayoutDashboard, Package, Tags } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import type { MenuItem } from '../types/menu-item';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const sections: MenuItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/productos', label: 'Productos', icon: Package },
  { path: '/categorias', label: 'Categorias', icon: Tags },
  { path: '/marcas', label: 'Marcas', icon: BadgeCheck },
];

export default function SidebarGestor() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <p className="px-2 text-sm font-semibold">Tech Solutions</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map(({ path, label, icon: Icon }) => (
                <SidebarMenuItem key={path}>
                  <SidebarMenuButton asChild isActive={location.pathname === path} tooltip={label}>
                    <Link to={path}>
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
