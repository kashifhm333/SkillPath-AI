import { createBrowserRouter } from "react-router";
import { PublicLayout } from "../components/layout/PublicLayout";
import { AppLayout } from "../components/layout/AppLayout";

import { LandingPage } from "../features/marketing/LandingPage";
import { FeaturesPage, FieldsPage, LegalPage, NotFoundPage } from "../features/marketing/Pages";
import { AuthPage } from "../features/auth/AuthPage";
import { OnboardingPage } from "../features/onboarding/OnboardingPage";
import { AssessmentPage } from "../features/assessment/AssessmentPage";
import { DashboardPage } from "../features/dashboard/DashboardPage";
import { RoadmapPage } from "../features/roadmap/RoadmapPage";
import { StagePage } from "../features/roadmap/StagePage";
import { TopicPage } from "../features/roadmap/TopicPage";
import { ResourcesPage } from "../features/resources/ResourcesPage";
import { PracticePage } from "../features/practice/PracticePage";
import { ProjectsPage } from "../features/projects/ProjectsPage";
import { AnalyticsPage } from "../features/analytics/AnalyticsPage";
import { GoalsPage } from "../features/goals/GoalsPage";
import { NotificationsPage } from "../features/notifications/NotificationsPage";
import { ProfilePage, SettingsPage } from "../features/settings/SettingsPages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "features", Component: FeaturesPage },
      { path: "fields", Component: FieldsPage },
      { path: "signin", element: <AuthPage mode="signin" /> },
      { path: "signup", element: <AuthPage mode="signup" /> },
      { path: "privacy", element: <LegalPage type="Privacy Policy" /> },
      { path: "terms", element: <LegalPage type="Terms of Service" /> },
    ],
  },
  { path: "/onboarding", Component: OnboardingPage },
  { path: "/assessment", Component: AssessmentPage },
  {
    path: "/app",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "roadmap", Component: RoadmapPage },
      { path: "roadmap/:stageId", Component: StagePage },
      { path: "learn", Component: TopicPage },
      { path: "learn/:topicId", Component: TopicPage },
      { path: "resources", Component: ResourcesPage },
      { path: "practice", Component: PracticePage },
      { path: "projects", Component: ProjectsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "goals", Component: GoalsPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "profile", Component: ProfilePage },
      { path: "settings", Component: SettingsPage },
    ],
  },
  { path: "*", Component: NotFoundPage },
]);
