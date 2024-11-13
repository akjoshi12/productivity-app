import React from 'react';
import { useMode } from '../context/ModeContext';
import Timer from './Timer';
import ModeSelector from './ModeSelector';
import Analytics from './Analytics';
import Goals from './Goals';
import MusicPlayer from './MusicPlayer';

export default function Dashboard() {
  const { currentMode } = useMode();
  const bgImage = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80";

  return (
    <div className="space-y-8">
      <header className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-8 relative overflow-hidden">
        <img
          src={bgImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-indigo-100">Ready to boost your productivity?</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Timer />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <MusicPlayer />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Goals />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <ModeSelector />
      </div>

      {currentMode === 'analytics' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Analytics />
        </div>
      )}
    </div>
  );
}