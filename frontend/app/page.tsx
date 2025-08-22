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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">FleetIQ Dashboard</h1>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">Loading vehicles...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">FleetIQ Dashboard</h1>
        <div className="text-center text-gray-500 py-8">Error: {error}</div>
        <div className="text-center text-gray-400 py-2">
          <button onClick={fetchVehicles} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-2">
        <Truck className="w-8 h-8 text-gray-500 mr-3" />
        <h1 className="text-xl font-bold text-gray-900">
          FleetIQ Dashboard
        </h1>
      </div>
      <p className="text-md text-gray-600 mb-4">Monitor and manage your fleet with ease</p>


    {/*Stats Section*/}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Vehicles</p>
            {/*TODO: Change to active vehicles */}
            <p className="text-2xl font-semibold">{vehicles.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Fleet</p>
                <p className="text-2xl font-semibold">{vehicles.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Wrench className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                {/*TODO: Add alerts count*/}
                <p className="text-2xl font-semibold">Alerts: </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                {/*TODO: Add critical alerts count*/}
                <p className="text-2xl font-semibold">Critical Alerts: </p>
              </div>
            </div>
          </div>
    </div>


    {/*Vehicle List Section*/}
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md text-gray-800 mb-4">Vehicle fleet</h2>
        <div className="flex gap-2">
          {/* TODO: Add active vehicles count*/}
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {vehicles.length} Active Vehicles
          </Badge>
          {/* TODO: Change to in maintenance and inactive*/}
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Alerts
          </Badge>
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Critical Alerts
          </Badge>
        </div>
      </div>
    </div>


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>





      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{vehicle.model}</h3>
            <p className="text-gray-600">VIN: {vehicle.vin}</p>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Odometer: {vehicle.odometer} km</p>
          </div>
        ))}
      </div> */}

    </div>
  )
}