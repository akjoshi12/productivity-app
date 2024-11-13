import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from 'lucide-react';
import { useMode } from '../context/ModeContext';
import TimerSettings from './TimerSettings';

export default function Timer() {
  const { currentMode, settings } = useMode();
  const [time, setTime] = useState(settings[currentMode]?.defaultDuration * 60 || 1500);
  const [initialTime, setInitialTime] = useState(settings[currentMode]?.defaultDuration * 60 || 1500);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (settings[currentMode]) {
      const newTime = settings[currentMode].defaultDuration * 60;
      setTime(newTime);
      setInitialTime(newTime);
      setIsActive(false);
    }
  }, [currentMode, settings]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: number;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  const updateTimerDuration = (minutes: number) => {
    const seconds = Math.max(60, minutes * 60); // Minimum 1 minute
    setInitialTime(seconds);
    setTime(seconds);
    setShowSettings(false);
  };

  const progress = Math.min(100, Math.max(0, ((initialTime - time) / initialTime) * 100)) || 0;
  const dashArray = 2 * Math.PI * 88;
  const dashOffset = dashArray * (1 - progress / 100);

  const getModeColor = () => {
    const colors = {
      focus: 'text-blue-500',
      deep: 'text-purple-500',
      general: 'text-green-500',
      chill: 'text-orange-500',
      analytics: 'text-gray-500',
    };
    return colors[currentMode] || colors.focus;
  };

  return (
    <div className="text-center relative">
      <button
        onClick={() => setShowSettings(true)}
        className="absolute right-0 top-0 p-2 text-gray-500 hover:text-gray-700 transition-colors"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      <div className="relative inline-block">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            className="stroke-current text-gray-200"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            className={`stroke-current ${getModeColor()}`}
            strokeWidth="12"
            fill="none"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-4xl font-bold text-gray-700">{formatTime(time)}</span>
          <p className="text-sm text-gray-500 mt-1">{currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode</p>
        </div>
      </div>

      <div className="mt-8 space-x-4">
        <button
          onClick={toggleTimer}
          className={`inline-flex items-center px-4 py-2 rounded-lg text-white transition-colors
            ${currentMode === 'focus' ? 'bg-blue-500 hover:bg-blue-600' :
              currentMode === 'deep' ? 'bg-purple-500 hover:bg-purple-600' :
              currentMode === 'general' ? 'bg-green-500 hover:bg-green-600' :
              'bg-orange-500 hover:bg-orange-600'}`}
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span className="ml-2">{isActive ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="ml-2">Reset</span>
        </button>
      </div>

      {showSettings && (
        <TimerSettings
          currentDuration={Math.floor(initialTime / 60)}
          onClose={() => setShowSettings(false)}
          onSave={updateTimerDuration}
        />
      )}
    </div>
  );
}