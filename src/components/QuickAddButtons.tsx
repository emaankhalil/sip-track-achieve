
import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';

interface QuickAddButtonsProps {
  onAddWater: (amount: number) => void;
}

const QuickAddButtons: React.FC<QuickAddButtonsProps> = ({ onAddWater }) => {
  const quickAmounts = [250, 500, 750, 1000];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {quickAmounts.map((amount) => (
        <Button
          key={amount}
          onClick={() => onAddWater(amount)}
          className="flex flex-col items-center p-4 h-auto bg-gradient-to-br from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Droplets className="w-6 h-6 mb-2" />
          <span className="text-lg font-semibold">{amount}ml</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickAddButtons;
