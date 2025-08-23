'use client'
import { useState } from "react";
import { Settings, User, Bell, Shield, Database, Globe, Truck, Users, Save } from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const settingSections: SettingSection[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    description: 'Manage your account information and preferences',
    icon: User
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'Configure alert and notification preferences',
    icon: Bell
  },
  {
    id: 'security',
    title: 'Security & Privacy',
    description: 'Password, authentication, and privacy settings',
    icon: Shield
  },
  {
    id: 'fleet',
    title: 'Fleet Configuration',
    description: 'Vehicle types, statuses, and fleet settings',
    icon: Truck
  },
  {
    id: 'users',
    title: 'User Management',
    description: 'Manage team members and permissions',
    icon: Users
  },
  {
    id: 'system',
    title: 'System Settings',
    description: 'Database, integrations, and system preferences',
    icon: Database
  },
  {
    id: 'regional',
    title: 'Regional Settings',
    description: 'Language, timezone, and regional preferences',
    icon: Globe
  }
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSectionChange = (sectionId: string) => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to switch sections?')) {
        setActiveSection(sectionId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveSection(sectionId);
    }
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            defaultValue="AD Admin"
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            defaultValue="User"
            onChange={() => setHasUnsavedChanges(true)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          defaultValue="admin@fleetiq.com"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
        <input
          type="text"
          defaultValue="Fleet Administrator"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          defaultValue="+1 (555) 123-4567"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Email Notifications</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Vehicle maintenance alerts</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Driver status updates</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">System maintenance notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Marketing communications</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Push Notifications</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Critical alerts</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Daily summaries</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
        <input
          type="password"
          placeholder="Enter current password"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Enable two-factor authentication</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderFleetSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Name</label>
        <input
          type="text"
          defaultValue="FleetIQ Operations"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default Vehicle Status</label>
        <select
          defaultValue="active"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="active">Active</option>
          <option value="maintenance">Maintenance</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Reminder (days)</label>
        <input
          type="number"
          defaultValue="30"
          min="1"
          max="365"
          onChange={() => setHasUnsavedChanges(true)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Fuel Alerts</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              onChange={() => setHasUnsavedChanges(true)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-gray-700">Low fuel warnings</span>
          </label>
          <div className="ml-6">
            <label className="block text-sm text-gray-700 mb-1">Low fuel threshold (%)</label>
            <input
              type="number"
              defaultValue="20"
              min="5"
              max="50"
              onChange={() => setHasUnsavedChanges(true)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'fleet':
        return renderFleetSettings();
      default:
        return (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a setting category</h3>
            <p className="text-gray-500">Choose a category from the left sidebar to configure settings</p>
          </div>
        );
    }
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-lg text-gray-600">Configure your fleet management system</p>
          </div>
          {hasUnsavedChanges && (
            <button
              onClick={() => {
                setHasUnsavedChanges(false);
                // Here you would typically save the settings
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {settingSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionChange(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-sm text-gray-500">{section.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {settingSections.find(s => s.id === activeSection)?.title || 'Settings'}
              </h2>
              <p className="text-gray-600">
                {settingSections.find(s => s.id === activeSection)?.description || 'Configure your system settings'}
              </p>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
