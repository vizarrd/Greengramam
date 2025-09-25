import React from 'react';

interface ProgressBarProps {
  progress: number;
  max: number;
  label?: string;
  color?: 'primary' | 'accent' | 'sky';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  max, 
  label, 
  color = 'primary',
  showPercentage = true 
}) => {
  const percentage = Math.min((progress / max) * 100, 100);
  
  const colors = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    sky: 'bg-sky',
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-text">{label}</span>
          {showPercentage && (
            <span className="text-sm text-muted">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;