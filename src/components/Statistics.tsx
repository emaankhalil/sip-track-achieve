
import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Calendar, Trophy } from 'lucide-react';

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

interface StatisticsProps {
  entries: WaterEntry[];
  dailyGoal: number;
}

const Statistics: React.FC<StatisticsProps> = ({ entries, dailyGoal }) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const thisWeek = new Date(today);
  thisWeek.setDate(thisWeek.getDate() - 7);

  const todayIntake = entries
    .filter(entry => entry.timestamp.toDateString() === today.toDateString())
    .reduce((sum, entry) => sum + entry.amount, 0);

  const yesterdayIntake = entries
    .filter(entry => entry.timestamp.toDateString() === yesterday.toDateString())
    .reduce((sum, entry) => sum + entry.amount, 0);

  const weeklyIntake = entries
    .filter(entry => entry.timestamp >= thisWeek)
    .reduce((sum, entry) => sum + entry.amount, 0);

  const weeklyAverage = Math.round(weeklyIntake / 7);

  const calculateStreak = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }

    let streak = 0;
    for (const date of dates) {
      const dayIntake = entries
        .filter(entry => entry.timestamp.toDateString() === date.toDateString())
        .reduce((sum, entry) => sum + entry.amount, 0);
      
      if (dayIntake >= dailyGoal) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const currentStreak = calculateStreak();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-gray-600">Weekly Average</span>
        </div>
        <div className="text-2xl font-bold text-emerald-700">
          {weeklyAverage}ml
        </div>
        <div className="text-xs text-gray-500">
          {yesterdayIntake > 0 && (
            <span>Yesterday: {yesterdayIntake}ml</span>
          )}
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">This Week</span>
        </div>
        <div className="text-2xl font-bold text-blue-700">
          {(weeklyIntake / 1000).toFixed(1)}L
        </div>
        <div className="text-xs text-gray-500">
          Total weekly intake
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          <span className="text-sm font-medium text-gray-600">Current Streak</span>
        </div>
        <div className="text-2xl font-bold text-amber-700">
          {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </div>
        <div className="text-xs text-gray-500">
          Goals achieved in a row
        </div>
      </Card>
    </div>
  );
};

export default Statistics;
