import mongoose, { Schema, Document } from "mongoose";

// 1. User
export interface IUser extends Document {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "learner" | "admin" | "mentor";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["learner", "admin", "mentor"], default: "learner" },
  },
  { timestamps: true }
);

// 2. Learner Profile
export interface ILearnerProfile extends Document {
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

const LearnerProfileSchema = new Schema<ILearnerProfile>(
  {
    userId: { type: String, required: true, unique: true },
    goal: { type: String, default: "Become an AI Engineer" },
    fields: [{ type: String }],
    level: { type: String, default: "Some experience" },
    hours: { type: Number, default: 8 },
    learningStyle: { type: String, default: "Mixed" },
    language: { type: String, default: "English" },
    ecosystem: { type: String, default: "Cloud agnostic" },
    operatingSystem: { type: String, default: "Linux" },
    onboardingComplete: { type: Boolean, default: false },
    assessmentScore: { type: Number, default: 0 },
    streakDays: { type: Number, default: 1 },
    lastActiveDate: { type: String },
    weeklyMinutes: { type: Number, default: 0 },
    roleReadinessPercent: { type: Number, default: 10 },
  },
  { timestamps: true }
);

// 3. Stage & Topic
const TopicSchema = new Schema({
  id: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  status: { type: String, enum: ["mastered", "active", "locked"], default: "active" },
  completed: { type: Boolean, default: false },
  time: { type: String },
  videoDuration: { type: String },
  content: { type: String },
  codeSnippet: { type: String },
});

export interface IStage extends Document {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  progress: number;
  duration: string;
  status: "in_progress" | "up_next" | "locked" | "completed";
  topics: Array<typeof TopicSchema>;
}

const StageSchema = new Schema<IStage>(
  {
    id: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    progress: { type: Number, default: 0 },
    duration: { type: String },
    status: { type: String, enum: ["in_progress", "up_next", "locked", "completed"], default: "locked" },
    topics: [TopicSchema],
  },
  { timestamps: true }
);

// 4. Assessment Question
export interface IQuestion extends Document {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    id: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
  },
  { timestamps: true }
);

// 5. Practice Item
export interface IPracticeItem extends Document {
  id: string;
  userId: string;
  topic: string;
  title: string;
  status: string;
  memoryStrength: number;
  lastReviewed: string;
  dueToday: boolean;
}

const PracticeItemSchema = new Schema<IPracticeItem>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    topic: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, default: "Needs review" },
    memoryStrength: { type: Number, default: 50 },
    lastReviewed: { type: String },
    dueToday: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 6. Project
export interface IProject extends Document {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: string;
  estimatedHours: string;
  status: string;
  isCapstone: boolean;
  competencies: string[];
  rubricCriteria: string[];
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String },
    difficulty: { type: String },
    estimatedHours: { type: String },
    status: { type: String, default: "available" },
    isCapstone: { type: Boolean, default: false },
    competencies: [{ type: String }],
    rubricCriteria: [{ type: String }],
  },
  { timestamps: true }
);

// 7. Resource
export interface IResource extends Document {
  id: string;
  type: string;
  title: string;
  source: string;
  time: string;
  rating: string;
  url: string;
  tags: string[];
  saved: boolean;
}

const ResourceSchema = new Schema<IResource>(
  {
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    source: { type: String },
    time: { type: String },
    rating: { type: String },
    url: { type: String },
    tags: [{ type: String }],
    saved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 8. Milestone
export interface IMilestone extends Document {
  id: string;
  userId: string;
  targetDate: string;
  title: string;
  progress: number;
  status: string;
}

const MilestoneSchema = new Schema<IMilestone>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    targetDate: { type: String, required: true },
    title: { type: String, required: true },
    progress: { type: Number, default: 0 },
    status: { type: String, default: "Upcoming" },
  },
  { timestamps: true }
);

// 9. Notification
export interface INotification extends Document {
  id: string;
  userId: string;
  title: string;
  description: string;
  timestamp: string;
  tone: "blue" | "green" | "purple" | "amber";
  unread: boolean;
}

const NotificationSchema = new Schema<INotification>(
  {
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    timestamp: { type: String },
    tone: { type: String, enum: ["blue", "green", "purple", "amber"], default: "blue" },
    unread: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Export Mongoose Models
export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const LearnerProfileModel = mongoose.models.LearnerProfile || mongoose.model<ILearnerProfile>("LearnerProfile", LearnerProfileSchema);
export const StageModel = mongoose.models.Stage || mongoose.model<IStage>("Stage", StageSchema);
export const QuestionModel = mongoose.models.Question || mongoose.model<IQuestion>("Question", QuestionSchema);
export const PracticeItemModel = mongoose.models.PracticeItem || mongoose.model<IPracticeItem>("PracticeItem", PracticeItemSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export const ResourceModel = mongoose.models.Resource || mongoose.model<IResource>("Resource", ResourceSchema);
export const MilestoneModel = mongoose.models.Milestone || mongoose.model<IMilestone>("Milestone", MilestoneSchema);
export const NotificationModel = mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema);
