'use client'
import { useState } from "react";
import { Calendar, Plus, Search, Filter, Clock, Car, Users, MapPin, AlertTriangle } from "lucide-react";

interface ScheduledTask {
  id: number;
  title: string;
  type: 'maintenance' | 'route' | 'inspection' | 'training' | 'meeting';
  date: string;
  time: string;
  duration: number;
  assigned_vehicle?: string;
  assigned_driver?: string;
  location?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  description: string;
}

// Mock data for demonstration
const mockScheduledTasks: ScheduledTask[] = [
  {
    id: 1,
    title: "Oil Change - Ford Transit",
    type: 'maintenance',
    date: "2024-01-15",
    time: "09:00",
    duration: 60,
    assigned_vehicle: "2022 Ford Transit (ABC-123)",
    assigned_driver: "John Smith",
    location: "Service Center",
    priority: 'medium',
    status: 'scheduled',
    description: "Regular oil change and filter replacement"
  },
  {
    id: 2,
    title: "Downtown Express Route",
    type: 'route',
    date: "2024-01-15",
    time: "08:00",
    duration: 120,
    assigned_vehicle: "2022 Ford Transit (ABC-123)",
    assigned_driver: "John Smith",
    location: "Central Depot",
    priority: 'high',
    status: 'scheduled',
    description: "Daily route to downtown business district"
  },
  {
    id: 3,
    title: "Safety Inspection - Mercedes",
    type: 'inspection',
    date: "2024-01-16",
    time: "10:00",
    duration: 90,
    assigned_vehicle: "2021 Mercedes Sprinter (DEF-456)",
    assigned_driver: "Sarah Johnson",
    location: "Inspection Station",
    priority: 'high',
    status: 'scheduled',
    description: "Annual safety inspection and brake check"
  },
  {
    id: 4,
    title: "Driver Training Session",
    type: 'training',
    date: "2024-01-17",
    time: "14:00",
    duration: 180,
    assigned_driver: "Mike Rodriguez",
    location: "Training Center",
    priority: 'medium',
    status: 'scheduled',
    description: "Defensive driving and safety protocols training"
  },
  {
    id: 5,
    title: "Engine Diagnostic - Chevrolet",
    type: 'maintenance',
    date: "2024-01-16",
    time: "13:00",
    duration: 120,
    assigned_vehicle: "2023 Chevrolet Express (JKL-012)",
    assigned_driver: "Mike Rodriguez",
    location: "Service Center",
    priority: 'critical',
    status: 'scheduled',
    description: "Engine warning light diagnostic and repair"
  }
];

export default function SchedulePage() {
  const [tasks] = useState<ScheduledTask[]>(mockScheduledTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-01-15');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assigned_driver?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assigned_vehicle?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'maintenance':
        return <Car className="w-4 h-4" />;
      case 'route':
        return <MapPin className="w-4 h-4" />;
      case 'inspection':
        return <AlertTriangle className="w-4 h-4" />;
      case 'training':
        return <Users className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDuration = (minutes: number) => {
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
            <h1 className="text-3xl font-bold text-gray-900">Schedule</h1>
            <p className="text-lg text-gray-600">Manage fleet schedules and appointments</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>
      </div>

      {/* Date Selector and Search */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search scheduled tasks..."
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

      {/* Selected Date Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{formatDate(selectedDate)}</h2>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tasks</p>
              <p className="text-xl font-bold text-gray-900">{tasks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Clock className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.priority === 'high' || t.priority === 'critical').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Car className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Vehicle Tasks</p>
              <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.assigned_vehicle).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daily Schedule</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredTasks
            .sort((a, b) => a.time.localeCompare(b.time))
            .map((task) => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-900">
                  {formatTime(task.time)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getTaskTypeIcon(task.type)}
                      <h4 className="text-lg font-medium text-gray-900">{task.title}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ').charAt(0).toUpperCase() + task.status.replace('_', ' ').slice(1)}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span><strong>Duration:</strong> {formatDuration(task.duration)}</span>
                    </div>
                    {task.assigned_vehicle && (
                      <div className="flex items-center space-x-2">
                        <Car className="w-4 h-4 text-gray-400" />
                        <span><strong>Vehicle:</strong> {task.assigned_vehicle}</span>
                      </div>
                    )}
                    {task.assigned_driver && (
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span><strong>Driver:</strong> {task.assigned_driver}</span>
                      </div>
                    )}
                  </div>
                  
                  {task.location && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span><strong>Location:</strong> {task.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Calendar View</h4>
                <p className="text-sm text-gray-500">Switch to monthly calendar</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Plus className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Recurring Events</h4>
                <p className="text-sm text-gray-500">Set up repeating schedules</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Team Schedule</h4>
                <p className="text-sm text-gray-500">View all team members</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
