import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';

interface QuizHeaderProps {
  currentStep: number;
  totalSteps: number;
  showProgress: boolean;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({ currentStep, totalSteps, showProgress }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Media Publisher Assessment</h1>
              <p className="text-gray-600 text-sm">Diagnostic tool for measuring journalistic impact and operational health</p>
            </div>
          </div>
          {showProgress && (
            <div className="text-right">
              <div className="text-sm font-medium text-gray-700">
                Question {currentStep} of {totalSteps}
              </div>
              <div className="text-xs text-gray-500">
                {Math.round(progressPercentage)}% complete
              </div>
            </div>
          )}
        </div>
        
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizHeader;