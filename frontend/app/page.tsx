'use client'
import { useEffect, useState } from "react";
import { Truck, Activity, AlertTriangle, Wrench } from "lucide-react";
import { Badge } from "@/app/components/badge"; 
import { VehicleCard } from "@/app/components/VehicleCard"; 

interface Vehicle {
  id: number;
  vin: string;
  model: string;
  year: number;
  odometer: number;
  // Opcjonalne pola z telemetrii
  latest_telemetry?: {
    speed: number;
    coolant_temp: number;
    rpm: number;
    timestamp: string;
  } | null;
  // Opcjonalne pole z alertami
  latest_alert?: {
    severity: string;
    alert_type: string;
    message: string;
    ts: string;
  } | null;
}

export default function Home() {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/vehicles/');
      if (!response.ok) {
        throw new Error('Failed to fetch vehicles');
      }
      const data = await response.json();
      setVehicles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message: "An error occurred while fetching vehicles");
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500 py-8">Error: {error}</div>
        <div className="text-center text-gray-400 py-2">
          <button onClick={fetchVehicles} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex items-center mb-2">
          <Truck className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">
            FleetIQ Dashboard
          </h1>
        </div>
        <p className="text-lg text-gray-600">Monitor and manage your vehicle fleet</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Truck className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Fleet</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wrench className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Maintenance</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              {/*TODO: Add critical alerts count*/}
              <p className="text-sm text-gray-600">Low Fuel</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Fleet Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Vehicle Fleet</h2>
          <div className="flex gap-3">
            {/* TODO: Change to in maintenance and inactive*/}
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {vehicles.length} Active
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
              0 Maintenance
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
              0 Inactive
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  )
}