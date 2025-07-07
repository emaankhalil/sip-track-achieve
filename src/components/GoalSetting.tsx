
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Target, Save } from 'lucide-react';

interface GoalSettingProps {
  currentGoal: number;
  onGoalChange: (goal: number) => void;
}

const GoalSetting: React.FC<GoalSettingProps> = ({ currentGoal, onGoalChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(currentGoal.toString());

  const handleSave = () => {
    const goal = parseInt(newGoal);
    if (goal > 0 && goal <= 10000) {
      onGoalChange(goal);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewGoal(currentGoal.toString());
    setIsEditing(false);
  };

  const presetGoals = [1500, 2000, 2500, 3000];

  return (
    <Card className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-800">Daily Goal</h3>
      </div>
      
      {!isEditing ? (
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-indigo-700">
            {currentGoal}ml
          </span>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
          >
            Edit Goal
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter goal (ml)"
              min="1"
              max="10000"
              className="flex-1"
            />
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
            </Button>
            <Button onClick={handleCancel} variant="outline">
              Cancel
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <span className="text-sm text-gray-600 w-full mb-1">Quick presets:</span>
            {presetGoals.map((goal) => (
              <Button
                key={goal}
                onClick={() => setNewGoal(goal.toString())}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                {goal}ml
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default GoalSetting;
