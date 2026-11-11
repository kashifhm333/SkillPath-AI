import fs from "node:fs/promises";
import path from "node:path";
import { env } from "../config/env.js";
import { logger } from "../common/logger.js";
import { getDefaultSeeds } from "./seeds.js";

export type DbData = Awaited<ReturnType<typeof getDefaultSeeds>>;

export class Database {
  private static instance: Database;
  private data: DbData | null = null;
  private dbPath: string;
  private isSaving = false;
  private pendingSave = false;

  private constructor() {
    this.dbPath = path.resolve(process.cwd(), env.DATA_DIR, "db.json");
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async init(): Promise<void> {
    const dir = path.dirname(this.dbPath);
    await fs.mkdir(dir, { recursive: true });

    try {
      const fileData = await fs.readFile(this.dbPath, "utf-8");
      this.data = JSON.parse(fileData);
      logger.info(`Loaded persistent database from ${this.dbPath}`);
    } catch {
      logger.info("Initializing fresh database with default seeds...");
      this.data = await getDefaultSeeds();
      await this.persist();
    }
  }

  public getData(): DbData {
    if (!this.data) {
      throw new Error("Database not initialized. Call init() first.");
    }
    return this.data;
  }

  public async persist(): Promise<void> {
    if (!this.data) return;

    if (this.isSaving) {
      this.pendingSave = true;
      return;
    }

    this.isSaving = true;
    try {
      const tempPath = `${this.dbPath}.tmp`;
      const json = JSON.stringify(this.data, null, 2);
      await fs.writeFile(tempPath, json, "utf-8");
      await fs.rename(tempPath, this.dbPath);
    } catch (err) {
      logger.error("Failed to persist database to disk", { error: String(err) });
    } finally {
      this.isSaving = false;
      if (this.pendingSave) {
        this.pendingSave = false;
        await this.persist();
      }
    }
  }

  public async reset(): Promise<void> {
    this.data = await getDefaultSeeds();
    await this.persist();
  }
}

export const db = Database.getInstance();
