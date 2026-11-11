import { db } from "../../database/db.js";
import { NotFoundError } from "../../common/errors.js";

export class ProjectsService {
  public async getProjects() {
    const dataStore = db.getData();
    const featured = dataStore.projects.find((p) => p.id === "proj_data_analyzer") || dataStore.projects[0];
    const library = dataStore.projects.filter((p) => p.id !== featured.id);

    return {
      featured,
      library,
    };
  }

  public async getProject(id: string) {
    const dataStore = db.getData();
    const project = dataStore.projects.find((p) => p.id === id);
    if (!project) throw new NotFoundError("Project not found");
    return project;
  }

  public async submitProject(id: string, submissionUrl: string, notes?: string) {
    const dataStore = db.getData();
    const project = dataStore.projects.find((p) => p.id === id);
    if (!project) throw new NotFoundError("Project not found");

    project.status = "submitted";

    const notifId = `notif_${Date.now()}`;
    dataStore.notifications.unshift({
      id: notifId,
      userId: "usr_alex_morgan",
      title: "Project submission received",
      description: `Your submission for "${project.title}" has been queued for automated rubric evaluation.`,
      timestamp: "Just now",
      tone: "blue",
      unread: true,
    });

    await db.persist();

    return {
      success: true,
      project,
      submissionUrl,
      notes,
      evaluationStatus: "in_review",
    };
  }
}

export const projectsService = new ProjectsService();
