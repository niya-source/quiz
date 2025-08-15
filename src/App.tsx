import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { generateRecommendations } from './data/recommendations';
import { Question, Response, CategoryScore } from './types';
import QuizHeader from './components/QuizHeader';
import Welcome from './components/Welcome';
import QuestionCard from './components/QuestionCard';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = welcome, 1+ = questions
  const [responses, setResponses] = useState<Response[]>([]);
  const [showResults, setShowResults] = useState(false);

  const calculateScores = (): CategoryScore[] => {
    const categories = ['impact', 'resilience', 'financial', 'education'];
    const categoryLabels = {
      impact: 'Journalistic Impact',
      resilience: 'Operational Resilience',
      financial: 'Financial Health',
      education: 'Experience & Education'
    };

    return categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const categoryResponses = responses.filter(r => 
        categoryQuestions.some(q => q.id === r.questionId)
      );

      const totalScore = categoryResponses.reduce((sum, response) => {
        const question = categoryQuestions.find(q => q.id === response.questionId);
        return sum + (response.value * (question?.weight || 1));
      }, 0);

      const maxScore = categoryQuestions.reduce((sum, question) => 
        sum + (5 * question.weight), 0
      );

      const percentage = Math.round((totalScore / maxScore) * 100);
      
      let level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
      if (percentage >= 80) level = 'Advanced';
      else if (percentage >= 60) level = 'Proficient';
      else if (percentage >= 40) level = 'Developing';
      else level = 'Beginner';

      return {
        category: categoryLabels[category as keyof typeof categoryLabels],
        score: totalScore,
        maxScore,
        percentage,
        level
      };
    });
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleAnswer = (response: Response) => {
    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== response.questionId);
      return [...filtered, response];
    });
  };

  const handleNext = () => {
    if (currentStep === questions.length) {
      setShowResults(true);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setResponses([]);
    setShowResults(false);
  };

  const getCurrentResponse = () => {
    if (currentStep === 0 || showResults) return undefined;
    return responses.find(r => r.questionId === questions[currentStep - 1].id);
  };

  const canProceed = () => {
    if (currentStep === 0 || showResults) return true;
    return getCurrentResponse() !== undefined;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (currentStep > 0 && !showResults) {
        if (e.key === 'ArrowLeft' && currentStep > 1) {
          handlePrevious();
        } else if (e.key === 'ArrowRight' && canProceed()) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentStep, showResults, canProceed]);

  if (showResults) {
    const scores = calculateScores();
    const recommendations = generateRecommendations(scores);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <QuizHeader 
          currentStep={questions.length} 
          totalSteps={questions.length} 
          showProgress={false}
        />
        <div className="py-8 px-6">
          <ResultsDisplay 
            scores={scores}
            recommendations={recommendations}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <QuizHeader 
          currentStep={0} 
          totalSteps={questions.length} 
          showProgress={false}
        />
        <div className="py-12 px-6">
          <Welcome onStart={handleStart} />
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep - 1];
  const currentResponse = getCurrentResponse();

  return (
    <div className="min-h-screen bg-gray-50">
      <QuizHeader 
        currentStep={currentStep} 
        totalSteps={questions.length} 
        showProgress={true}
      />
      <div className="py-12 px-6">
        <QuestionCard
          question={currentQuestion}
          response={currentResponse}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentStep === 1}
          isLast={currentStep === questions.length}
          canProceed={canProceed()}
        />
      </div>
    </div>
  );
};

export default App;