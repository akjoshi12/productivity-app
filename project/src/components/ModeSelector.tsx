import React from 'react';
import { Clock, Brain, Layout, Coffee } from 'lucide-react';
import { useMode } from '../context/ModeContext';

export default function ModeSelector() {
  const { currentMode, setMode, settings } = useMode();

  const modes = [
    {
      id: 'focus',
      name: 'Focus Mode',
      description: settings.focus.description,
      icon: Clock,
      color: 'bg-blue-500',
      duration: settings.focus.defaultDuration,
    },
    {
      id: 'deep',
      name: 'Deep Focus',
      description: settings.deep.description,
      icon: Brain,
      color: 'bg-purple-500',
      duration: settings.deep.defaultDuration,
    },
    {
      id: 'general',
      name: 'General Mode',
      description: settings.general.description,
      icon: Layout,
      color: 'bg-green-500',
      duration: settings.general.defaultDuration,
    },
    {
      id: 'chill',
      name: 'Chill Mode',
      description: settings.chill.description,
      icon: Coffee,
      color: 'bg-orange-500',
      duration: settings.chill.defaultDuration,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select Mode</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setMode(mode.id as any)}
              className={`p-4 rounded-xl text-left transition-all
                ${currentMode === mode.id
                  ? 'ring-2 ring-indigo-500 bg-indigo-50'
                  : 'hover:bg-gray-50'
                }`}
            >
              <div className={`w-10 h-10 ${mode.color} rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-medium text-gray-900">{mode.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{mode.description}</p>
              <p className="text-sm text-gray-400 mt-1">Default: {mode.duration} minutes</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}