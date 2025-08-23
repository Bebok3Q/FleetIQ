'use client'
import { useState } from "react";
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown, Activity, Car, Users, DollarSign } from "lucide-react";

interface Report {
  id: number;
  name: string;
  type: 'fleet_performance' | 'maintenance_cost' | 'driver_activity' | 'fuel_consumption' | 'route_efficiency';
  description: string;
  last_generated: string;
  status: 'available' | 'generating' | 'error';
  file_size?: string;
}

// Mock data for demonstration
const mockReports: Report[] = [
  {
    id: 1,
    name: "Fleet Performance Report",
    type: 'fleet_performance',
    description: "Monthly overview of vehicle performance, utilization, and efficiency metrics",
    last_generated: "2024-01-01",
    status: 'available',
    file_size: "2.4 MB"
  },
  {
    id: 2,
    name: "Maintenance Cost Analysis",
    type: 'maintenance_cost',
    description: "Detailed breakdown of maintenance costs, repairs, and service history",
    last_generated: "2024-01-05",
    status: 'available',
    file_size: "1.8 MB"
  },
  {
    id: 3,
    name: "Driver Activity Summary",
    type: 'driver_activity',
    description: "Driver performance metrics, hours logged, and safety statistics",
    last_generated: "2024-01-10",
    status: 'available',
    file_size: "3.1 MB"
  },
  {
    id: 4,
    name: "Fuel Consumption Report",
    type: 'fuel_consumption',
    description: "Fuel usage patterns, costs, and efficiency analysis",
    last_generated: "2024-01-12",
    status: 'generating',
    file_size: "1.2 MB"
  },
  {
    id: 5,
    name: "Route Efficiency Analysis",
    type: 'route_efficiency',
    description: "Route performance, time analysis, and optimization recommendations",
    last_generated: "2024-01-08",
    status: 'available',
    file_size: "2.7 MB"
  }
];

export default function ReportsPage() {
  const [reports] = useState<Report[]>(mockReports);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'fleet_performance':
        return <Car className="w-5 h-5" />;
      case 'maintenance_cost':
        return <DollarSign className="w-5 h-5" />;
      case 'driver_activity':
        return <Users className="w-5 h-5" />;
      case 'fuel_consumption':
        return <Activity className="w-5 h-5" />;
      case 'route_efficiency':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <BarChart3 className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'generating':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-lg text-gray-600">Generate and view fleet analytics reports</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Report Period:</label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reports</p>
              <p className="text-xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Download className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.status === 'available').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Generating</p>
              <p className="text-xl font-bold text-gray-900">{reports.filter(r => r.status === 'generating').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getReportIcon(report.type)}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last Generated:</span>
                <span>{formatDate(report.last_generated)}</span>
              </div>
              {report.file_size && (
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>File Size:</span>
                  <span>{report.file_size}</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {report.status === 'available' && (
                <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
              {report.status === 'generating' && (
                <button className="flex-1 bg-gray-400 text-white px-3 py-2 rounded-lg cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                  <Activity className="w-4 h-4 animate-spin" />
                  Generating...
                </button>
              )}
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Schedule
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Performance Dashboard</h4>
                <p className="text-sm text-gray-500">Real-time fleet metrics</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Scheduled Reports</h4>
                <p className="text-sm text-gray-500">Automated report generation</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Custom Analytics</h4>
                <p className="text-sm text-gray-500">Build custom reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
