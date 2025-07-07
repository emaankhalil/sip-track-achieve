
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface CustomAmountInputProps {
  onAddWater: (amount: number) => void;
}

const CustomAmountInput: React.FC<CustomAmountInputProps> = ({ onAddWater }) => {
  const [customAmount, setCustomAmount] = useState('');

  const handleAddCustom = () => {
    const amount = parseInt(customAmount);
    if (amount > 0 && amount <= 5000) {
      onAddWater(amount);
      setCustomAmount('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustom();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <Input
        type="number"
        placeholder="Custom amount (ml)"
        value={customAmount}
        onChange={(e) => setCustomAmount(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
        min="1"
        max="5000"
      />
      <Button
        onClick={handleAddCustom}
        disabled={!customAmount || parseInt(customAmount) <= 0}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
      >
        <Plus className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CustomAmountInput;
