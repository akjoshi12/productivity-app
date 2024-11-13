import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  mode: string;
  progress: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  goals: string[];
  mode: string;
}

interface Music {
  id: string;
  title: string;
  url: string;
  mode: string;
}

interface AppContextType {
  goals: Goal[];
  projects: Project[];
  music: Music[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  addMusic: (music: Omit<Music, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteGoal: (id: string) => void;
  deleteProject: (id: string) => void;
  deleteMusic: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [music, setMusic] = useState<Music[]>([]);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setGoals(prev => [...prev, { ...goal, id: crypto.randomUUID() }]);
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    setProjects(prev => [...prev, { ...project, id: crypto.randomUUID() }]);
  };

  const addMusic = (music: Omit<Music, 'id'>) => {
    setMusic(prev => [...prev, { ...music, id: crypto.randomUUID() }]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === id ? { ...goal, ...updates } : goal
    ));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === id ? { ...project, ...updates } : project
    ));
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };

  const deleteMusic = (id: string) => {
    setMusic(prev => prev.filter(track => track.id !== id));
  };

  return (
    <AppContext.Provider value={{
      goals,
      projects,
      music,
      addGoal,
      addProject,
      addMusic,
      updateGoal,
      updateProject,
      deleteGoal,
      deleteProject,
      deleteMusic,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}