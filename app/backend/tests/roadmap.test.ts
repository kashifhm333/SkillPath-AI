import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";
import { db } from "../src/database/db.js";

describe("Roadmap and Stages Integration Tests", () => {
  let app: ReturnType<typeof createApp>;

  before(async () => {
    await db.init();
    app = createApp();
  });

  it("should retrieve full roadmap with stages and topics", async () => {
    const res = await request(app).get("/api/roadmap");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.stages));
    assert.equal(res.body.data.stages.length, 4);
    assert.equal(res.body.data.stages[0].id, "foundations");
  });

  it("should retrieve a single stage by id", async () => {
    const res = await request(app).get("/api/roadmap/stages/foundations");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.id, "foundations");
    assert.ok(res.body.data.topics.length > 0);
  });

  it("should return 404 for non-existent stage", async () => {
    const res = await request(app).get("/api/roadmap/stages/non-existent-xyz");
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
  });

  it("should toggle a topic completion and update stage progress", async () => {
    const res = await request(app)
      .post("/api/roadmap/topics/top_hash_maps/toggle")
      .send({ completed: true });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.topic.completed, true);
    assert.equal(res.body.data.topic.status, "mastered");
  });
});
