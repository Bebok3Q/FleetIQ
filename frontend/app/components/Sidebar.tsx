'use client'
import { useState, useEffect } from 'react';
import { 
  Home, 
  Truck, 
  Users, 
  Route, 
  Wrench, 
  BarChart3, 
  Calendar, 
  FileText, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
  { id: 'vehicles', label: 'Vehicles', icon: Truck, href: '/vehicles' },
  { id: 'drivers', label: 'Drivers', icon: Users, href: '/drivers' },
  { id: 'routes', label: 'Routes', icon: Route, href: '/routes' },
  { id: 'maintenance', label: 'Maintenance', icon: Wrench, href: '/maintenance' },
  { id: 'reports', label: 'Reports', icon: BarChart3, href: '/reports' },
  { id: 'schedule', label: 'Schedule', icon: Calendar, href: '/schedule' },
  { id: 'documents', label: 'Documents', icon: FileText, href: '/documents' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const router = useRouter();
  const pathname = usePathname();

  const handleItemClick = (id: string, href: string) => {
    setActiveItem(id);
    router.push(href);
  };

  // Set active item based on current pathname
  useEffect(() => {
    const currentItem = menuItems.find(item => item.href === pathname) || menuItems[0];
    setActiveItem(currentItem.id);
  }, [pathname]);

  return (
    <div className={`bg-white border-r border-gray-200 h-screen transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">FleetManager</h1>
                <p className="text-xs text-gray-500">Fleet Operations</p>
              </div>
            </div>
          )}
          {isCollapsed && (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
              <Truck className="w-5 h-5 text-white" />
            </div>
          )}
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id, item.href)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">AD</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">AD Admin User</p>
              <p className="text-xs text-gray-500">Fleet Administrator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
