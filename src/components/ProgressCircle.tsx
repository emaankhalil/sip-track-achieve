
import React from 'react';

interface ProgressCircleProps {
  current: number;
  goal: number;
  size?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ current, goal, size = 200 }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="rgb(219 234 254)"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(14 165 233)" />
            <stop offset="100%" stopColor="rgb(6 182 212)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="text-2xl font-bold text-gray-800">
          {Math.round(percentage)}%
        </div>
        <div className="text-sm text-gray-600">
          {current}ml / {goal}ml
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
