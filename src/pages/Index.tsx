import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplets, Home, BarChart3, Settings, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import ProgressCircle from '@/components/ProgressCircle';
import QuickAddButtons from '@/components/QuickAddButtons';
import CustomAmountInput from '@/components/CustomAmountInput';
import WaterLog from '@/components/WaterLog';
import GoalSetting from '@/components/GoalSetting';
import Statistics from '@/components/Statistics';
import useLocalStorage from '@/hooks/useLocalStorage';
import UserProfile from '@/components/UserProfile';

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

const Index = () => {
  const [entries, setEntries] = useLocalStorage<WaterEntry[]>('waterEntries', []);
  const [dailyGoal, setDailyGoal] = useLocalStorage('dailyGoal', 2000);
  const [activeTab, setActiveTab] = useState('home');

  // Convert stored timestamps back to Date objects
  useEffect(() => {
    setEntries(prevEntries =>
      prevEntries.map(entry => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }))
    );
  }, []);

  const addWaterEntry = (amount: number) => {
    const newEntry: WaterEntry = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date()
    };
    
    setEntries(prev => [...prev, newEntry]);
    
    // Show encouraging toast messages
    const todayTotal = getTodayTotal() + amount;
    const percentage = Math.round((todayTotal / dailyGoal) * 100);
    
    if (percentage >= 100) {
      toast("🎉 Congratulations! You've reached your daily goal!", {
        description: "Keep up the great hydration habits!"
      });
    } else if (percentage >= 75) {
      toast("💪 Almost there! You're doing great!", {
        description: `${percentage}% of your daily goal completed`
      });
    } else if (percentage >= 50) {
      toast("👍 Great progress! Keep it up!", {
        description: `${percentage}% of your daily goal completed`
      });
    } else {
      toast("💧 Water logged successfully!", {
        description: `+${amount}ml added to your daily intake`
      });
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    toast("Entry deleted", {
      description: "Water intake entry has been removed"
    });
  };

  const getTodayTotal = () => {
    const today = new Date().toDateString();
    return entries
      .filter(entry => entry.timestamp.toDateString() === today)
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const todayTotal = getTodayTotal();
  const percentage = Math.min((todayTotal / dailyGoal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full">
              <Droplets className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AquaTrack
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Stay hydrated, stay healthy!
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Progress Section */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <div className="text-center">
                <ProgressCircle current={todayTotal} goal={dailyGoal} size={220} />
                <div className="mt-4">
                  {percentage >= 100 ? (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-lg font-semibold">Goal Achieved! 🎉</span>
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      <span className="font-semibold text-blue-600">
                        {dailyGoal - todayTotal}ml
                      </span>{' '}
                      remaining to reach your goal
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Add Section */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Add</h2>
              <div className="space-y-4">
                <QuickAddButtons onAddWater={addWaterEntry} />
                <div className="pt-2 border-t border-gray-200">
                  <CustomAmountInput onAddWater={addWaterEntry} />
                </div>
              </div>
            </Card>

            {/* Today's Log */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <WaterLog entries={entries} onDeleteEntry={deleteEntry} />
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Statistics entries={entries} dailyGoal={dailyGoal} />
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h2>
              <div className="space-y-3">
                {Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - i);
                  const dayIntake = entries
                    .filter(entry => entry.timestamp.toDateString() === date.toDateString())
                    .reduce((sum, entry) => sum + entry.amount, 0);
                  const dayPercentage = Math.min((dayIntake / dailyGoal) * 100, 100);
                  
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-20 text-sm text-gray-600">
                        {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                          style={{ width: `${dayPercentage}%` }}
                        />
                      </div>
                      <div className="w-16 text-sm text-gray-600 text-right">
                        {dayIntake}ml
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <UserProfile />
            
            <GoalSetting currentGoal={dailyGoal} onGoalChange={setDailyGoal} />
            
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-blue-200 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">About AquaTrack</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  AquaTrack helps you maintain healthy hydration habits by tracking your daily water intake.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800">Why hydration matters:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Maintains body temperature and joint lubrication</li>
                    <li>Supports nutrient transportation and waste removal</li>
                    <li>Improves brain function and energy levels</li>
                    <li>Promotes healthy skin and organ function</li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Your data is stored locally on your device and never shared.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
