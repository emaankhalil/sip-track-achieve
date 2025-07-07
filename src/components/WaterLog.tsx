
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, Clock } from 'lucide-react';

interface WaterEntry {
  id: string;
  amount: number;
  timestamp: Date;
}

interface WaterLogProps {
  entries: WaterEntry[];
  onDeleteEntry: (id: string) => void;
}

const WaterLog: React.FC<WaterLogProps> = ({ entries, onDeleteEntry }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const todayEntries = entries.filter(
    (entry) =>
      entry.timestamp.toDateString() === new Date().toDateString()
  );

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Log</h3>
      {todayEntries.length === 0 ? (
        <Card className="p-4 text-center text-gray-500">
          No water logged today. Start hydrating!
        </Card>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {todayEntries
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .map((entry) => (
              <Card key={entry.id} className="p-3 flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    {formatTime(entry.timestamp)}
                  </span>
                  <span className="font-semibold text-blue-700">
                    {entry.amount}ml
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default WaterLog;
