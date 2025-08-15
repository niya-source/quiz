import React from 'react';
import { BookOpen, TrendingUp, DollarSign, GraduationCap, Users } from 'lucide-react';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  const assessmentAreas = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: 'Journalistic Impact',
      description: 'Measure your publication\'s reach, engagement, and influence on campus'
    },
    {
      icon: <Users className="h-8 w-8 text-teal-600" />,
      title: 'Operational Resilience',
      description: 'Evaluate your team structure, workflows, and organizational sustainability'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: 'Financial Health',
      description: 'Assess your funding sources, budget planning, and revenue diversification'
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
      title: 'Experience & Education',
      description: 'Review your team\'s skills, training, and professional development'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <BookOpen className="h-12 w-12 text-blue-600" />
          <TrendingUp className="h-10 w-10 text-teal-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Student Media Publisher Assessment
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A comprehensive diagnostic tool to evaluate your student publication's strengths, 
          identify growth opportunities, and create a personalized roadmap for success.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          What We'll Assess
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {assessmentAreas.map((area, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0">
                {area.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
              <span>Answer 20 targeted questions (5-7 minutes)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
              <span>Receive detailed scoring across all areas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
              <span>Get your personalized roadmap & resources</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Assessment
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Anonymous • No registration required • Results can be exported
          </p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-gray-500 text-sm">
          Developed for student journalists, by journalism educators and industry professionals
        </p>
      </div>
    </div>
  );
};

export default Welcome;