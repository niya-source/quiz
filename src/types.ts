export interface Question {
  id: string;
  category: 'impact' | 'resilience' | 'financial' | 'education';
  text: string;
  type: 'multiple' | 'scale' | 'boolean';
  options?: string[];
  weight: number;
}

export interface Response {
  questionId: string;
  value: number;
  text?: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'Beginner' | 'Developing' | 'Proficient' | 'Advanced';
}

export interface Recommendation {
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  actionItems: string[];
  resources: string[];
}