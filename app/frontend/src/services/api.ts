import type {
  User,
  LearnerProfile,
  RoadmapData,
  Stage,
  Topic,
  DiagnosticQuestion,
  DiagnosticResult,
  PracticeItem,
  Project,
  ResourceItem,
  Milestone,
  NotificationItem,
  AnalyticsData,
} from "../types";

export class ApiError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("skillpath_token");
  const headers = new Headers(options.headers || {});

  headers.set("Content-Type", "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || response.statusText || "Request failed";
    throw new ApiError(errorMsg, response.status, data?.error?.details);
  }

  return data.data as T;
}

export const api = {
  auth: {
    register: (payload: { name: string; email: string; password: string; goal?: string; fields?: string[] }) =>
      request<{ user: User; profile: LearnerProfile; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    login: (payload: { email: string; password: string }) =>
      request<{ user: User; profile: LearnerProfile; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    logout: () =>
      request<{ success: boolean }>("/auth/logout", {
        method: "POST",
      }),

    me: () =>
      request<{ user: User; profile: LearnerProfile | null }>("/auth/me", {
        method: "GET",
      }),

    updateProfile: (patch: Partial<LearnerProfile> & { name?: string }) =>
      request<{ user: User; profile: LearnerProfile }>("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
  },

  roadmap: {
    getRoadmap: () => request<RoadmapData>("/roadmap"),
    getStage: (stageId: string) => request<Stage>(`/roadmap/stages/${stageId}`),
    getTopic: (topicId: string) => request<Topic>(`/roadmap/topics/${topicId}`),
    toggleTopic: (topicId: string, completed?: boolean) =>
      request<{ topic: Topic; stage: Stage; overallProgress: number }>(`/roadmap/topics/${topicId}/toggle`, {
        method: "POST",
        body: JSON.stringify({ completed }),
      }),
    adaptRoadmap: () => request<{ message: string; adaptedAt: string }>("/roadmap/adapt", { method: "POST" }),
  },

  assessment: {
    getQuestions: () => request<DiagnosticQuestion[]>("/assessment/questions"),
    submit: (answers: number[]) =>
      request<DiagnosticResult>("/assessment/submit", {
        method: "POST",
        body: JSON.stringify({ answers }),
      }),
  },

  practice: {
    getItems: () => request<{ dueCount: number; estimatedTimeMinutes: number; items: PracticeItem[] }>("/practice"),
    reviewItem: (id: string) => request<PracticeItem>(`/practice/${id}/review`, { method: "POST" }),
    startSession: () => request<{ message: string; activeReviewItems: PracticeItem[] }>("/practice/start-session", { method: "POST" }),
  },

  projects: {
    getProjects: () => request<{ featured: Project; library: Project[] }>("/projects"),
    getProject: (id: string) => request<Project>(`/projects/${id}`),
    submit: (id: string, submissionUrl: string, notes?: string) =>
      request<{ success: boolean; project: Project; evaluationStatus: string }>(`/projects/${id}/submit`, {
        method: "POST",
        body: JSON.stringify({ submissionUrl, notes }),
      }),
  },

  resources: {
    getResources: (filter?: string, search?: string) => {
      const params = new URLSearchParams();
      if (filter) params.set("filter", filter);
      if (search) params.set("search", search);
      const query = params.toString() ? `?${params.toString()}` : "";
      return request<ResourceItem[]>(`/resources${query}`);
    },
    toggleSave: (id: string) => request<ResourceItem>(`/resources/${id}/toggle-save`, { method: "POST" }),
  },

  analytics: {
    getAnalytics: () => request<AnalyticsData>("/analytics"),
  },

  goals: {
    getGoals: () =>
      request<{
        primaryGoal: string;
        targetDate: string;
        weeklyHours: number;
        overallProgress: number;
        milestones: Milestone[];
      }>("/goals"),
    createMilestone: (title: string, targetDate: string) =>
      request<Milestone>("/goals/milestones", {
        method: "POST",
        body: JSON.stringify({ title, targetDate }),
      }),
    updateMilestone: (id: string, patch: { progress?: number; status?: string }) =>
      request<Milestone>(`/goals/milestones/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
  },

  notifications: {
    getNotifications: () => request<{ unreadCount: number; notifications: NotificationItem[] }>("/notifications"),
    markAllRead: () => request<{ success: boolean }>("/notifications/mark-all-read", { method: "POST" }),
    markOneRead: (id: string) => request<{ success: boolean }>(`/notifications/${id}/read`, { method: "PATCH" }),
  },
};
