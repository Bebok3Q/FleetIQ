'use client'
import { useState } from "react";
import { Wrench, Plus, Search, Filter, Calendar, AlertTriangle, CheckCircle, Clock, Car, Users } from "lucide-react";

interface MaintenanceTask {
  id: number;
  vehicle: string;
  vehicle_id: string;
  task_type: 'scheduled' | 'repair' | 'inspection' | 'emergency';
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_technician?: string;
  estimated_cost: number;
  scheduled_date: string;
  completion_date?: string;
  notes?: string;
}

// Mock data for demonstration
const mockMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 1,
    vehicle: "2020 Isuzu NPR (GHI-789)",
    vehicle_id: "GHI-789",
    task_type: 'scheduled',
    description: "Regular oil change and filter replacement",
    status: 'in_progress',
    priority: 'medium',
    assigned_technician: "Mike Johnson",
    estimated_cost: 150,
    scheduled_date: "2024-01-15",
    notes: "Vehicle currently at service center"
  },
  {
    id: 2,
    vehicle: "2022 Ford Transit (ABC-123)",
    vehicle_id: "ABC-123",
    task_type: 'inspection',
    description: "Annual safety inspection and brake check",
    status: 'pending',
    priority: 'high',
    assigned_technician: "Sarah Wilson",
    estimated_cost: 200,
    scheduled_date: "2024-01-20"
  },
  {
    id: 3,
    vehicle: "2021 Mercedes Sprinter (DEF-456)",
    vehicle_id: "DEF-456",
    task_type: 'repair',
    description: "Engine warning light - diagnostic required",
    status: 'pending',
    priority: 'critical',
    assigned_technician: "David Chen",
    estimated_cost: 500,
    scheduled_date: "2024-01-16"
  },
  {
    id: 4,
    vehicle: "2023 Chevrolet Express (JKL-012)",
    vehicle_id: "JKL-012",
    task_type: 'scheduled',
    description: "Tire rotation and alignment check",
    status: 'completed',
    priority: 'low',
    assigned_technician: "Lisa Rodriguez",
    estimated_cost: 120,
    scheduled_date: "2024-01-10",
    completion_date: "2024-01-12"
  }
];

export default function MaintenancePage() {
  const [tasks] = useState<MaintenanceTask[]>(mockMaintenanceTasks);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assigned_technician?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      case 'repair':
        return <Wrench className="w-4 h-4" />;
      case 'inspection':
        return <CheckCircle className="w-4 h-4" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
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
            <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
            <p className="text-lg text-gray-600">Manage vehicle maintenance and repairs</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search maintenance tasks..."
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
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-xl font-bold text-gray-900">{tasks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.status === 'in_progress').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.status === 'completed').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Tasks List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Maintenance Tasks</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskTypeIcon(task.task_type)}
                      <h4 className="text-lg font-medium text-gray-900">{task.description}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span><strong>Vehicle:</strong> {task.vehicle}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span><strong>Scheduled:</strong> {formatDate(task.scheduled_date)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span><strong>Technician:</strong> {task.assigned_technician || 'Unassigned'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="text-gray-400">$</span>
                        <span><strong>Cost:</strong> {task.estimated_cost}</span>
                      </div>
                    </div>
                  </div>
                  
                  {task.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700"><strong>Notes:</strong> {task.notes}</p>
                    </div>
                  )}
                  
                  {task.completion_date && (
                    <div className="mt-3 text-sm text-gray-500">
                      <strong>Completed:</strong> {formatDate(task.completion_date)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
