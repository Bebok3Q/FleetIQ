'use client'
import { useState } from "react";
import { Users, Plus, Search, Filter, MapPin, Phone, Mail, Car } from "lucide-react";

interface Driver {
  id: number;
  name: string;
  license_number: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'on_trip';
  vehicle_assigned?: string;
  location?: string;
}

// Mock data for demonstration
const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "John Smith",
    license_number: "DL-123456",
    phone: "+1 (555) 123-4567",
    email: "john.smith@fleetiq.com",
    status: 'active',
    vehicle_assigned: "2022 Ford Transit (ABC-123)",
    location: "Downtown Depot"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    license_number: "DL-789012",
    phone: "+1 (555) 234-5678",
    email: "sarah.johnson@fleetiq.com",
    status: 'active',
    vehicle_assigned: "2021 Mercedes Sprinter (DEF-456)",
    location: "North Terminal"
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    license_number: "DL-345678",
    phone: "+1 (555) 345-6789",
    email: "mike.rodriguez@fleetiq.com",
    status: 'on_trip',
    vehicle_assigned: "2023 Chevrolet Express (JKL-012)",
    location: "East Hub"
  },
  {
    id: 4,
    name: "Lisa Chen",
    license_number: "DL-901234",
    phone: "+1 (555) 456-7890",
    email: "lisa.chen@fleetiq.com",
    status: 'active',
    vehicle_assigned: "2022 RAM ProMaster (PQR-678)",
    location: "West Station"
  }
];

export default function DriversPage() {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.license_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'on_trip':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'on_trip':
        return 'On Trip';
      case 'inactive':
        return 'Inactive';
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Drivers</h1>
            <p className="text-lg text-gray-600">Manage your fleet drivers</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Driver
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search drivers..."
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
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Drivers</p>
              <p className="text-xl font-bold text-gray-900">{drivers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-bold text-gray-900">{drivers.filter(d => d.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">On Trip</p>
              <p className="text-xl font-bold text-gray-900">{drivers.filter(d => d.status === 'on_trip').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Users className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-xl font-bold text-gray-900">{drivers.filter(d => d.status === 'inactive').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Drivers List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Driver List</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredDrivers.map((driver) => (
            <div key={driver.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-semibold text-blue-600">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{driver.name}</h4>
                    <p className="text-sm text-gray-500">License: {driver.license_number}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Phone className="w-4 h-4" />
                        <span>{driver.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{driver.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{driver.location}</span>
                    </div>
                    {driver.vehicle_assigned && (
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{driver.vehicle_assigned}</span>
                      </div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(driver.status)}`}>
                    {getStatusText(driver.status)}
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
