import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Analytics() {
  const { goals } = useApp();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const activityData = [
    { name: 'Mon', focus: 4, deep: 2, general: 3, chill: 1 },
    { name: 'Tue', focus: 3, deep: 4, general: 2, chill: 2 },
    { name: 'Wed', focus: 5, deep: 3, general: 1, chill: 2 },
    { name: 'Thu', focus: 2, deep: 5, general: 3, chill: 1 },
    { name: 'Fri', focus: 4, deep: 3, general: 2, chill: 2 },
  ];

  const goalStats = {
    total: goals.length,
    completed: goals.filter(goal => goal.completed).length,
    inProgress: goals.filter(goal => !goal.completed).length,
  };

  const COLORS = ['#10B981', '#EF4444'];

  const goalPieData = [
    { name: 'Completed', value: goalStats.completed },
    { name: 'In Progress', value: goalStats.inProgress },
  ];

  const progressData = [
    { name: 'Week 1', progress: 65 },
    { name: 'Week 2', progress: 78 },
    { name: 'Week 3', progress: 82 },
    { name: 'Week 4', progress: 90 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as any)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-2">Total Goals</h3>
          <p className="text-3xl font-bold text-indigo-600">{goalStats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">{goalStats.completed}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-red-600">{goalStats.inProgress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Mode Usage</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="focus" fill="#3B82F6" stackId="a" />
                <Bar dataKey="deep" fill="#8B5CF6" stackId="a" />
                <Bar dataKey="general" fill="#10B981" stackId="a" />
                <Bar dataKey="chill" fill="#F97316" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium mb-4">Goal Completion</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={goalPieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {goalPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h3 className="text-lg font-medium mb-4">Progress Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}