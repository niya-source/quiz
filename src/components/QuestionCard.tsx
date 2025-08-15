import React from 'react';
import { Question, Response } from '../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  response: Response | undefined;
  onAnswer: (response: Response) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  response,
  onAnswer,
  onNext,
  onPrevious,
  isFirst,
  isLast,
  canProceed
}) => {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'impact': return 'Journalistic Impact';
      case 'resilience': return 'Operational Resilience';
      case 'financial': return 'Financial Health';
      case 'education': return 'Experience & Education';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'impact': return 'bg-blue-100 text-blue-800';
      case 'resilience': return 'bg-teal-100 text-teal-800';
      case 'financial': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMultipleChoice = (optionIndex: number) => {
    const value = question.options!.length - optionIndex; // Higher index = lower score
    onAnswer({
      questionId: question.id,
      value,
      text: question.options![optionIndex]
    });
  };

  const handleScale = (value: number) => {
    onAnswer({
      questionId: question.id,
      value,
      text: `${value}/5`
    });
  };

  const handleBoolean = (value: boolean) => {
    onAnswer({
      questionId: question.id,
      value: value ? 5 : 1,
      text: value ? 'Yes' : 'No'
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
            {getCategoryLabel(question.category)}
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
          {question.text}
        </h2>

        <div className="space-y-4 mb-8">
          {question.type === 'multiple' && question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                    response?.text === option
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {response?.text === option && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {question.type === 'scale' && (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Poor/Never</span>
                <span>Excellent/Always</span>
              </div>
              <div className="flex space-x-4 justify-center">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => handleScale(value)}
                    className={`w-12 h-12 rounded-full border-2 font-semibold transition-all duration-200 hover:scale-105 ${
                      response?.value === value
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {question.type === 'boolean' && (
            <div className="flex space-x-4">
              <button
                onClick={() => handleBoolean(true)}
                className={`flex-1 p-4 rounded-lg border-2 font-medium transition-all duration-200 hover:shadow-md ${
                  response?.text === 'Yes'
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                Yes
              </button>
              <button
                onClick={() => handleBoolean(false)}
                className={`flex-1 p-4 rounded-lg border-2 font-medium transition-all duration-200 hover:shadow-md ${
                  response?.text === 'No'
                    ? 'border-red-500 bg-red-50 text-red-900'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                No
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <button
            onClick={onPrevious}
            disabled={isFirst}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isFirst
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={onNext}
            disabled={!canProceed}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              canProceed
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>{isLast ? 'See Results' : 'Next'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;