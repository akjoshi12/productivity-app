import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Upload } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useMode } from '../context/ModeContext';

export default function MusicPlayer() {
  const { music, addMusic } = useApp();
  const { currentMode } = useMode();
  const [currentTrack, setCurrentTrack] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const filteredMusic = music.filter(track => track.mode === currentMode);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addMusic({
        title: file.name.replace(/\.[^/.]+$/, ""),
        url,
        mode: currentMode,
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const playNext = () => {
    setCurrentTrack((prev) => (prev + 1) % filteredMusic.length);
  };

  const playPrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + filteredMusic.length) % filteredMusic.length);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Music Player</h3>
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
          <Upload className="w-5 h-5 mr-2" />
          Upload Music
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {filteredMusic.length > 0 ? (
        <div>
          <audio
            ref={audioRef}
            src={filteredMusic[currentTrack]?.url}
            onEnded={playNext}
          />
          
          <div className="text-center mb-4">
            <h4 className="font-medium">{filteredMusic[currentTrack]?.title}</h4>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={playPrevious}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={playNext}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4">
            <input
              type="range"
              className="w-full"
              onChange={(e) => {
                if (audioRef.current) {
                  audioRef.current.volume = Number(e.target.value) / 100;
                }
              }}
              defaultValue="100"
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No music available for this mode</p>
          <p className="text-sm mt-1">Upload some tracks to get started</p>
        </div>
      )}
    </div>
  );
}