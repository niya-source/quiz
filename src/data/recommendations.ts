import { CategoryScore, Recommendation } from '../types';

export const generateRecommendations = (scores: CategoryScore[]): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  scores.forEach(score => {
    if (score.percentage < 40) {
      // Critical needs
      switch (score.category) {
        case 'Journalistic Impact':
          recommendations.push({
            category: score.category,
            priority: 'High',
            title: 'Build Your Editorial Foundation',
            description: 'Your publication needs to establish consistent content creation and audience engagement.',
            actionItems: [
              'Develop a regular publishing schedule',
              'Focus on campus-relevant stories that matter to students',
              'Create social media accounts to expand reach',
              'Survey your target audience to understand their interests'
            ],
            resources: [
              'Student Press Law Center (SPLC) guidelines',
              'Campus journalism best practices',
              'Social media strategy templates'
            ]
          });
          break;
        case 'Operational Resilience':
          recommendations.push({
            category: score.category,
            priority: 'High',
            title: 'Strengthen Your Operations',
            description: 'Your organization needs better structure and processes to maintain consistent operations.',
            actionItems: [
              'Recruit more staff members through campus outreach',
              'Create clear editorial workflows and style guides',
              'Establish regular meeting schedules',
              'Document key processes for continuity'
            ],
            resources: [
              'Student media organizational templates',
              'Editorial workflow examples',
              'Staff recruitment strategies'
            ]
          });
          break;
        case 'Financial Health':
          recommendations.push({
            category: score.category,
            priority: 'High',
            title: 'Secure Sustainable Funding',
            description: 'Financial stability is critical for your publication\'s survival and growth.',
            actionItems: [
              'Create a detailed budget with all expenses',
              'Research student fee allocation processes',
              'Develop advertising packages for local businesses',
              'Apply for student organization grants'
            ],
            resources: [
              'Student media budgeting guides',
              'Local business advertising templates',
              'Grant application resources'
            ]
          });
          break;
        case 'Experience & Education':
          recommendations.push({
            category: score.category,
            priority: 'High',
            title: 'Invest in Skills Development',
            description: 'Your team needs foundational journalism training and ongoing education.',
            actionItems: [
              'Partner with journalism faculty for training workshops',
              'Attend student media conferences and workshops',
              'Create mentorship programs with experienced journalists',
              'Study media law and ethics fundamentals'
            ],
            resources: [
              'Associated Collegiate Press (ACP) resources',
              'Journalism ethics handbooks',
              'Student media conference calendar'
            ]
          });
          break;
      }
    } else if (score.percentage < 70) {
      // Improvement opportunities
      switch (score.category) {
        case 'Journalistic Impact':
          recommendations.push({
            category: score.category,
            priority: 'Medium',
            title: 'Expand Your Impact',
            description: 'You have good fundamentals. Focus on growing your audience and influence.',
            actionItems: [
              'Investigate more in-depth stories',
              'Collaborate with other campus organizations',
              'Develop multimedia content capabilities',
              'Create email newsletters for loyal readers'
            ],
            resources: [
              'Investigative journalism guides',
              'Multimedia storytelling tools',
              'Audience engagement strategies'
            ]
          });
          break;
        case 'Operational Resilience':
          recommendations.push({
            category: score.category,
            priority: 'Medium',
            title: 'Optimize Your Operations',
            description: 'Your operations are solid. Focus on efficiency and succession planning.',
            actionItems: [
              'Implement project management tools',
              'Create leadership development programs',
              'Document institutional knowledge',
              'Establish alumni network connections'
            ],
            resources: [
              'Project management software options',
              'Leadership training programs',
              'Alumni engagement strategies'
            ]
          });
          break;
        case 'Financial Health':
          recommendations.push({
            category: score.category,
            priority: 'Medium',
            title: 'Diversify Revenue Streams',
            description: 'Your finances are stable. Work on building multiple income sources.',
            actionItems: [
              'Launch targeted advertising campaigns',
              'Explore event hosting opportunities',
              'Consider premium content offerings',
              'Build corporate sponsorship relationships'
            ],
            resources: [
              'Revenue diversification guides',
              'Sponsorship proposal templates',
              'Event planning resources'
            ]
          });
          break;
        case 'Experience & Education':
          recommendations.push({
            category: score.category,
            priority: 'Medium',
            title: 'Advance Professional Skills',
            description: 'Your team has good basics. Focus on specialized skills and advanced training.',
            actionItems: [
              'Attend advanced journalism workshops',
              'Develop expertise in specific beats',
              'Create cross-training programs',
              'Establish professional mentorships'
            ],
            resources: [
              'Specialized journalism training programs',
              'Professional journalism associations',
              'Advanced skill-building workshops'
            ]
          });
          break;
      }
    }
    // High performers (70%+) get maintenance/excellence recommendations
    else {
      switch (score.category) {
        case 'Journalistic Impact':
          recommendations.push({
            category: score.category,
            priority: 'Low',
            title: 'Maintain Excellence',
            description: 'Your impact is strong. Focus on innovation and setting industry standards.',
            actionItems: [
              'Experiment with new storytelling formats',
              'Mentor other student publications',
              'Enter journalism competitions',
              'Develop signature coverage areas'
            ],
            resources: [
              'Journalism award competitions',
              'Innovation in student media',
              'Peer mentorship programs'
            ]
          });
          break;
        case 'Operational Resilience':
          recommendations.push({
            category: score.category,
            priority: 'Low',
            title: 'Innovation and Growth',
            description: 'Your operations are excellent. Consider expansion and new initiatives.',
            actionItems: [
              'Launch new publication formats or platforms',
              'Develop strategic partnerships',
              'Create advanced training programs',
              'Share best practices with other organizations'
            ],
            resources: [
              'Strategic partnership opportunities',
              'Advanced organizational development',
              'Best practice sharing platforms'
            ]
          });
          break;
        case 'Financial Health':
          recommendations.push({
            category: score.category,
            priority: 'Low',
            title: 'Financial Leadership',
            description: 'Your finances are strong. Focus on long-term sustainability and growth.',
            actionItems: [
              'Build emergency reserves',
              'Invest in major equipment upgrades',
              'Create scholarship programs',
              'Develop endowment fundraising'
            ],
            resources: [
              'Endowment development guides',
              'Long-term financial planning',
              'Equipment investment strategies'
            ]
          });
          break;
        case 'Experience & Education':
          recommendations.push({
            category: score.category,
            priority: 'Low',
            title: 'Industry Leadership',
            description: 'Your educational foundation is excellent. Focus on teaching and leading others.',
            actionItems: [
              'Publish industry research or guides',
              'Speak at student media conferences',
              'Develop curriculum for other programs',
              'Create professional development content'
            ],
            resources: [
              'Conference speaking opportunities',
              'Academic publishing options',
              'Professional development creation tools'
            ]
          });
          break;
      }
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
};