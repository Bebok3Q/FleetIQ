'use client'
import { useEffect, useState } from "react";


interface Vehicle {
  id: number;
  vin: string;
  model: string;
  year: number;
  odometer: number;
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
        <h1 className="text-3x1 font-bold text-gray-900 mb-6">FleetIQ Dashboard</h1>
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">Loading vehicles...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text 3x-1 font-bold text-gray-900 mb-6">FleetIQ Dashboard</h1>
        <div className="text-center text-gray-500 py-8">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3x1 font-bold text-gray-900 mb-6">
        FleetIQ Dashboard
      </h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md">
            <h3 className="text-lg font-semibold text-gray-900">{vehicle.model}</h3>
            <p className="text-gray-600">VIN: {vehicle.vin}</p>
            <p className="text-gray-600">Year: {vehicle.year}</p>
            <p className="text-gray-600">Odometer: {vehicle.odometer} km</p>
          </div>
        ))}
      </div>

    </div>
  )
}