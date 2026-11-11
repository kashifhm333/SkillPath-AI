import { db } from "../../database/db.js";
import { NotFoundError } from "../../common/errors.js";

export class ResourcesService {
  public async getResources(filter?: string, search?: string) {
    const dataStore = db.getData();
    let list = [...dataStore.resources];

    if (filter && filter !== "All" && filter !== "Recommended") {
      if (filter === "Saved") {
        list = list.filter((r) => r.saved);
      } else if (filter === "Videos") {
        list = list.filter((r) => r.type.toLowerCase() === "video");
      } else if (filter === "Documentation") {
        list = list.filter((r) => r.type.toLowerCase() === "documentation");
      } else if (filter === "Interactive") {
        list = list.filter((r) => r.type.toLowerCase() === "interactive");
      }
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.source.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public async toggleSave(id: string) {
    const dataStore = db.getData();
    const resource = dataStore.resources.find((r) => r.id === id);
    if (!resource) throw new NotFoundError("Resource not found");

    resource.saved = !resource.saved;
    await db.persist();

    return resource;
  }
}

export const resourcesService = new ResourcesService();
