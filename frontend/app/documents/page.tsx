'use client'
import { useState } from "react";
import { FileText, Plus, Search, Filter, Download, Eye, Calendar, File, Folder, Upload } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'image' | 'other';
  category: 'vehicle_registration' | 'maintenance_records' | 'driver_licenses' | 'insurance' | 'compliance' | 'manuals';
  size: string;
  uploaded_by: string;
  upload_date: string;
  last_modified: string;
  tags: string[];
  description: string;
}

// Mock data for demonstration
const mockDocuments: Document[] = [
  {
    id: 1,
    name: "Vehicle Registration - Ford Transit",
    type: 'pdf',
    category: 'vehicle_registration',
    size: "2.4 MB",
    uploaded_by: "John Smith",
    upload_date: "2024-01-01",
    last_modified: "2024-01-01",
    tags: ["registration", "ford", "2022"],
    description: "Official vehicle registration document for 2022 Ford Transit"
  },
  {
    id: 2,
    name: "Maintenance History - Mercedes Sprinter",
    type: 'xls',
    category: 'maintenance_records',
    size: "1.8 MB",
    uploaded_by: "Sarah Johnson",
    upload_date: "2024-01-05",
    last_modified: "2024-01-10",
    tags: ["maintenance", "mercedes", "service"],
    description: "Complete maintenance and service history for Mercedes Sprinter"
  },
  {
    id: 3,
    name: "Driver License - Mike Rodriguez",
    type: 'image',
    category: 'driver_licenses',
    size: "856 KB",
    uploaded_by: "HR Department",
    upload_date: "2024-01-08",
    last_modified: "2024-01-08",
    tags: ["driver", "license", "mike"],
    description: "Scanned copy of Mike Rodriguez's driver license"
  },
  {
    id: 4,
    name: "Fleet Insurance Policy",
    type: 'pdf',
    category: 'insurance',
    size: "5.2 MB",
    uploaded_by: "Admin User",
    upload_date: "2024-01-03",
    last_modified: "2024-01-03",
    tags: ["insurance", "policy", "fleet"],
    description: "Current fleet insurance policy and coverage details"
  },
  {
    id: 5,
    name: "Safety Compliance Checklist",
    type: 'doc',
    category: 'compliance',
    size: "1.2 MB",
    uploaded_by: "Safety Officer",
    upload_date: "2024-01-12",
    last_modified: "2024-01-12",
    tags: ["safety", "compliance", "checklist"],
    description: "Monthly safety compliance checklist template"
  },
  {
    id: 6,
    name: "Vehicle Manual - Chevrolet Express",
    type: 'pdf',
    category: 'manuals',
    size: "8.7 MB",
    uploaded_by: "Admin User",
    upload_date: "2024-01-06",
    last_modified: "2024-01-06",
    tags: ["manual", "chevrolet", "express"],
    description: "Owner's manual and service guide for Chevrolet Express"
  }
];

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDocuments = documents.filter(doc =>
    (selectedCategory === 'all' || doc.category === selectedCategory) &&
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'image':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vehicle_registration':
        return <File className="w-4 h-4" />;
      case 'maintenance_records':
        return <FileText className="w-4 h-4" />;
      case 'driver_licenses':
        return <FileText className="w-4 h-4" />;
      case 'insurance':
        return <FileText className="w-4 h-4" />;
      case 'compliance':
        return <FileText className="w-4 h-4" />;
      case 'manuals':
        return <FileText className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'vehicle_registration':
        return 'Vehicle Registration';
      case 'maintenance_records':
        return 'Maintenance Records';
      case 'driver_licenses':
        return 'Driver Licenses';
      case 'insurance':
        return 'Insurance';
      case 'compliance':
        return 'Compliance';
      case 'manuals':
        return 'Manuals';
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'vehicle_registration', label: 'Vehicle Registration' },
    { value: 'maintenance_records', label: 'Maintenance Records' },
    { value: 'driver_licenses', label: 'Driver Licenses' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'compliance', label: 'Compliance' },
    { value: 'manuals', label: 'Manuals' }
  ];

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Documents</h1>
            <p className="text-lg text-gray-600">Manage fleet documents and files</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Folder
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          More Filters
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Documents</p>
              <p className="text-xl font-bold text-gray-900">{documents.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Folder className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Categories</p>
              <p className="text-xl font-bold text-gray-900">{categories.length - 1}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-xl font-bold text-gray-900">{documents.filter(d => new Date(d.upload_date).getMonth() === new Date().getMonth()).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <File className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Size</p>
              <p className="text-xl font-bold text-gray-900">20.1 MB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getFileIcon(doc.type)}
              </div>
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {doc.type.toUpperCase()}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Category:</span>
                <div className="flex items-center space-x-1">
                  {getCategoryIcon(doc.category)}
                  <span>{getCategoryName(doc.category)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Size:</span>
                <span>{doc.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Uploaded:</span>
                <span>{formatDate(doc.upload_date)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>By:</span>
                <span>{doc.uploaded_by}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {doc.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4" />
                Preview
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Upload className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Bulk Upload</h4>
                <p className="text-sm text-gray-500">Upload multiple files at once</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Folder className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Organize</h4>
                <p className="text-sm text-gray-500">Create folders and organize files</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Templates</h4>
                <p className="text-sm text-gray-500">Access document templates</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
