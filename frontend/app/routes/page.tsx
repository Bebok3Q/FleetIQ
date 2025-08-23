'use client'
import { useState } from "react";
import { Route, Plus, Search, Filter, MapPin, Clock, Car, Users, Calendar } from "lucide-react";

interface RouteItem {
  id: number;
  name: string;
  start_location: string;
  end_location: string;
  distance: number;
  estimated_time: number;
  assigned_vehicle?: string;
  assigned_driver?: string;
  status: 'active' | 'completed' | 'scheduled' | 'cancelled';
  next_departure?: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom';
}

// Mock data for demonstration
const mockRoutes: RouteItem[] = [
  {
    id: 1,
    name: "Downtown Express",
    start_location: "Central Depot",
    end_location: "Downtown Business District",
    distance: 12.5,
    estimated_time: 25,
    assigned_vehicle: "2022 Ford Transit (ABC-123)",
    assigned_driver: "John Smith",
    status: 'active',
    next_departure: "2024-01-15 08:00",
    frequency: 'daily'
  },
  {
    id: 2,
    name: "Airport Shuttle",
    start_location: "North Terminal",
    end_location: "City Center",
    distance: 18.2,
    estimated_time: 35,
    assigned_vehicle: "2021 Mercedes Sprinter (DEF-456)",
    assigned_driver: "Sarah Johnson",
    status: 'active',
    next_departure: "2024-01-15 09:30",
    frequency: 'daily'
  },
  {
    id: 3,
    name: "Industrial Zone Route",
    start_location: "East Hub",
    end_location: "Industrial Park",
    distance: 22.8,
    estimated_time: 45,
    assigned_vehicle: "2023 Chevrolet Express (JKL-012)",
    assigned_driver: "Mike Rodriguez",
    status: 'scheduled',
    next_departure: "2024-01-16 07:00",
    frequency: 'weekly'
  },
  {
    id: 4,
    name: "Suburban Circuit",
    start_location: "West Station",
    end_location: "Suburban Areas",
    distance: 35.6,
    estimated_time: 60,
    assigned_vehicle: "2022 RAM ProMaster (PQR-678)",
    assigned_driver: "Lisa Chen",
    status: 'active',
    next_departure: "2024-01-15 10:00",
    frequency: 'daily'
  }
];

export default function RoutesPage() {
  const [routes] = useState<RouteItem[]>(mockRoutes);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.start_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.end_location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'scheduled':
        return 'Scheduled';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Routes</h1>
            <p className="text-lg text-gray-600">Manage your fleet routes and schedules</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Route
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Route className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Routes</p>
              <p className="text-xl font-bold text-gray-900">{routes.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Route className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-bold text-gray-900">{routes.filter(r => r.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-xl font-bold text-gray-900">{routes.filter(r => r.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Route className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{routes.filter(r => r.status === 'completed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Routes List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Route List</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredRoutes.map((route) => (
            <div key={route.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{route.name}</h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(route.status)}`}>
                      {getStatusText(route.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span><strong>From:</strong> {route.start_location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span><strong>To:</strong> {route.end_location}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Route className="w-4 h-4 text-gray-400" />
                        <span><strong>Distance:</strong> {route.distance} km</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span><strong>Time:</strong> {formatTime(route.estimated_time)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        {route.assigned_vehicle && (
                          <div className="flex items-center space-x-1">
                            <Car className="w-4 h-4" />
                            <span>{route.assigned_vehicle}</span>
                          </div>
                        )}
                        {route.assigned_driver && (
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{route.assigned_driver}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{route.frequency}</span>
                        {route.next_departure && (
                          <span>• Next: {new Date(route.next_departure).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
