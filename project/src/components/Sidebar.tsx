import React from 'react';
import { Clock, Brain, Coffee, Layout, BarChart3, Settings } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function Sidebar() {
  const { currentMode, setMode } = useMode();

  const modes = [
    { id: 'focus', name: 'Focus Mode', icon: Clock },
    { id: 'deep', name: 'Deep Focus', icon: Brain },
    { id: 'general', name: 'General Mode', icon: Layout },
    { id: 'chill', name: 'Chill Mode', icon: Coffee },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Focus Flow</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setMode(mode.id)}
                className={`w-full flex items-center px-4 py-3 text-sm rounded-lg
                  ${currentMode === mode.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {mode.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
        </div>
      </div>
    </aside>
  );
}