export interface User {
  id: string;
  email: string;
  name: string;
  role: "learner" | "admin" | "mentor";
}

export interface LearnerProfile {
  userId: string;
  goal: string;
  fields: string[];
  level: string;
  hours: number;
  learningStyle: string;
  language: string;
  ecosystem: string;
  operatingSystem: string;
  onboardingComplete: boolean;
  assessmentScore: number;
  streakDays: number;
  lastActiveDate: string;
  weeklyMinutes: number;
  roleReadinessPercent: number;
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: "mastered" | "active" | "locked";
  completed: boolean;
  time: string;
  videoDuration: string;
  content: string;
  codeSnippet: string;
  stageId?: string;
  stageTitle?: string;
  stageNumber?: string;
}

export interface Stage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  progress: number;
  duration: string;
  status: "in_progress" | "up_next" | "locked" | "completed";
  topics: Topic[];
}

export interface RoadmapData {
  title: string;
  targetRole: string;
  overallProgress: number;
  estimatedCompletion: string;
  weeklyHours: number;
  roleReadinessPercent: number;
  stages: Stage[];
}

export interface DiagnosticQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
}

export interface DiagnosticResult {
  scorePercentage: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  recommendation: string;
  details: Array<{
    id: string;
    topic: string;
    question: string;
    selectedOption: number;
    correctOption: number;
    isCorrect: boolean;
    explanation: string;
  }>;
}

export interface PracticeItem {
  id: string;
  userId: string;
  topic: string;
  title: string;
  status: "Needs review" | "Strengthening" | "Mastered";
  memoryStrength: number;
  lastReviewed: string;
  dueToday: boolean;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: string;
  estimatedHours: string;
  status: "available" | "in_progress" | "submitted" | "locked";
  isCapstone: boolean;
  competencies: string[];
  rubricCriteria: string[];
}

export interface ResourceItem {
  id: string;
  type: "Video" | "Documentation" | "Interactive" | "Article";
  title: string;
  source: string;
  time: string;
  rating: string;
  url: string;
  tags: string[];
  saved: boolean;
}

export interface Milestone {
  id: string;
  userId: string;
  targetDate: string;
  title: string;
  progress: number;
  status: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  description: string;
  timestamp: string;
  tone: "blue" | "green" | "purple" | "amber";
  unread: boolean;
}

export interface AnalyticsData {
  focusedLearning: string;
  activitiesCompleted: number;
  averageAssessment: string;
  currentStreakDays: number;
  weeklyGoalHours: number;
  weeklyLoggedMinutes: number;
  weeklyActivity: number[];
  competencies: Array<{ name: string; value: number }>;
  roleReadinessPercent: number;
  targetRole: string;
  masteredCount: number;
  developingCount: number;
  notStartedCount: number;
}
