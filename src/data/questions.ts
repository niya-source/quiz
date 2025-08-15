import { Question } from '../types';

export const questions: Question[] = [
  // Journalistic Impact (25%)
  {
    id: 'impact-1',
    category: 'impact',
    text: 'How frequently does your publication release new content?',
    type: 'multiple',
    options: [
      'Daily',
      'Multiple times per week',
      'Weekly',
      'Bi-weekly',
      'Monthly or less'
    ],
    weight: 1
  },
  {
    id: 'impact-2',
    category: 'impact',
    text: 'What is your average monthly readership/viewership?',
    type: 'multiple',
    options: [
      'Over 10,000',
      '5,000-10,000',
      '1,000-5,000',
      '500-1,000',
      'Under 500'
    ],
    weight: 1.5
  },
  {
    id: 'impact-3',
    category: 'impact',
    text: 'How engaged is your audience (comments, shares, feedback)?',
    type: 'scale',
    weight: 1.2
  },
  {
    id: 'impact-4',
    category: 'impact',
    text: 'Does your publication cover campus-wide issues that affect students?',
    type: 'boolean',
    weight: 1.3
  },
  {
    id: 'impact-5',
    category: 'impact',
    text: 'Have you broken any significant stories or investigations in the past year?',
    type: 'boolean',
    weight: 1.4
  },

  // Operational Resilience (25%)
  {
    id: 'resilience-1',
    category: 'resilience',
    text: 'How many active staff members do you have?',
    type: 'multiple',
    options: [
      '20+ members',
      '10-19 members',
      '5-9 members',
      '3-4 members',
      '1-2 members'
    ],
    weight: 1.3
  },
  {
    id: 'resilience-2',
    category: 'resilience',
    text: 'Do you have established editorial workflows and processes?',
    type: 'boolean',
    weight: 1.2
  },
  {
    id: 'resilience-3',
    category: 'resilience',
    text: 'How reliable is your content production schedule?',
    type: 'scale',
    weight: 1
  },
  {
    id: 'resilience-4',
    category: 'resilience',
    text: 'Do you have succession planning for leadership roles?',
    type: 'boolean',
    weight: 1.4
  },
  {
    id: 'resilience-5',
    category: 'resilience',
    text: 'How effectively do you retain staff members across semesters?',
    type: 'scale',
    weight: 1.1
  },

  // Financial Health (25%)
  {
    id: 'financial-1',
    category: 'financial',
    text: 'What is your primary funding source?',
    type: 'multiple',
    options: [
      'Multiple diverse revenue streams',
      'Student fees + advertising',
      'Student fees only',
      'University funding',
      'No consistent funding'
    ],
    weight: 1.5
  },
  {
    id: 'financial-2',
    category: 'financial',
    text: 'Can you cover basic operational costs (printing, web hosting, equipment)?',
    type: 'boolean',
    weight: 1.3
  },
  {
    id: 'financial-3',
    category: 'financial',
    text: 'Do you have a budget planning process?',
    type: 'boolean',
    weight: 1
  },
  {
    id: 'financial-4',
    category: 'financial',
    text: 'How sustainable is your current financial model?',
    type: 'scale',
    weight: 1.4
  },
  {
    id: 'financial-5',
    category: 'financial',
    text: 'Do you actively seek new revenue opportunities?',
    type: 'boolean',
    weight: 1.2
  },

  // Experience & Education (25%)
  {
    id: 'education-1',
    category: 'education',
    text: 'What percentage of your staff has formal journalism education/training?',
    type: 'multiple',
    options: [
      '80-100%',
      '60-79%',
      '40-59%',
      '20-39%',
      'Less than 20%'
    ],
    weight: 1.1
  },
  {
    id: 'education-2',
    category: 'education',
    text: 'Do you provide regular training and skill development for staff?',
    type: 'boolean',
    weight: 1.3
  },
  {
    id: 'education-3',
    category: 'education',
    text: 'How experienced is your editorial leadership?',
    type: 'scale',
    weight: 1.4
  },
  {
    id: 'education-4',
    category: 'education',
    text: 'Do you have mentorship programs or faculty advisors?',
    type: 'boolean',
    weight: 1.2
  },
  {
    id: 'education-5',
    category: 'education',
    text: 'How well do you understand media law and ethics?',
    type: 'scale',
    weight: 1.5
  }
];