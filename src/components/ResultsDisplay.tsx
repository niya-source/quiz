import React from 'react';
import { CategoryScore, Recommendation } from '../types';
import { TrendingUp, AlertCircle, CheckCircle2, Download, RotateCcw } from 'lucide-react';

interface ResultsDisplayProps {
  scores: CategoryScore[];
  recommendations: Recommendation[];
  onRestart: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ scores, recommendations, onRestart }) => {
  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score.percentage, 0) / scores.length
  );

  const getOverallLevel = (score: number) => {
    if (score >= 80) return { level: 'Advanced', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 60) return { level: 'Proficient', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 40) return { level: 'Developing', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Beginner', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'Medium': return <TrendingUp className="h-5 w-5 text-yellow-500" />;
      case 'Low': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'border-l-red-500 bg-red-50';
      case 'Medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'Low': return 'border-l-green-500 bg-green-50';
    }
  };

  const exportResults = () => {
    const content = `
STUDENT MEDIA PUBLISHER ASSESSMENT RESULTS

Overall Score: ${overallScore}% (${getOverallLevel(overallScore).level})

CATEGORY BREAKDOWN:
${scores.map(score => 
  `${score.category}: ${score.percentage}% (${score.level})`
).join('\n')}

PERSONALIZED ROADMAP:

${recommendations.map(rec => `
${rec.priority.toUpperCase()} PRIORITY: ${rec.title}
Category: ${rec.category}
${rec.description}

Action Items:
${rec.actionItems.map(item => `• ${item}`).join('\n')}

Resources:
${rec.resources.map(resource => `• ${resource}`).join('\n')}
`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `media-publisher-assessment-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const overall = getOverallLevel(overallScore);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Overall Results Header */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
        <div className="mb-6">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${overall.bg} mb-4`}>
            <span className={`text-4xl font-bold ${overall.color}`}>{overallScore}%</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
          <p className={`text-xl font-semibold ${overall.color}`}>{overall.level} Level</p>
          <p className="text-gray-600 mt-2">Based on your responses across four key areas</p>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={exportResults}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="h-4 w-4" />
            <span>Export Results</span>
          </button>
          <button
            onClick={onRestart}
            className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Take Again</span>
          </button>
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scores.map((score, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-3">{score.category}</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>{score.score}</span>
                <span>{score.maxScore}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${score.percentage}%` }}
                />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">{score.percentage}%</div>
              <div className={`text-sm font-medium ${
                score.level === 'Advanced' ? 'text-green-600' :
                score.level === 'Proficient' ? 'text-blue-600' :
                score.level === 'Developing' ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {score.level}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personalized Roadmap */}
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Roadmap</h2>
        <p className="text-gray-600 mb-6">Based on your assessment results, here are your recommended next steps prioritized by impact:</p>
        
        <div className="space-y-6">
          {recommendations.map((rec, index) => (
            <div key={index} className={`border-l-4 ${getPriorityColor(rec.priority)} p-6 rounded-r-lg`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getPriorityIcon(rec.priority)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rec.title}</h3>
                    <span className="text-sm text-gray-500">({rec.category})</span>
                  </div>
                  <p className="text-gray-700 mb-4">{rec.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Action Items:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {rec.actionItems.map((item, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Resources:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        {rec.resources.map((resource, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-teal-600 mt-1">•</span>
                            <span>{resource}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-gray-200 p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Resources for Student Media</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Organizations</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Associated Collegiate Press (ACP)</li>
              <li>• College Media Association (CMA)</li>
              <li>• Student Press Law Center (SPLC)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Training</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Poynter Institute workshops</li>
              <li>• IRE student memberships</li>
              <li>• Local press association events</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Tools</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Google Workspace for Education</li>
              <li>• Canva for design</li>
              <li>• Slack for team communication</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;