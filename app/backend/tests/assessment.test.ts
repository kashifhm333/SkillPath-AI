import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";
import { db } from "../src/database/db.js";

describe("Diagnostic Assessment Integration Tests", () => {
  let app: ReturnType<typeof createApp>;

  before(async () => {
    await db.init();
    app = createApp();
  });

  it("should get questions without exposing correct answers", async () => {
    const res = await request(app).get("/api/assessment/questions");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);

    for (const q of res.body.data) {
      assert.equal(q.correctAnswer, undefined, "Anti-cheat: correctAnswer must not be returned");
      assert.ok(q.question);
      assert.ok(Array.isArray(q.options));
    }
  });

  it("should calculate score and yield recommendation upon submission", async () => {
    // 4 questions in seeds, answers [1, 1, 2, 0]
    const res = await request(app)
      .post("/api/assessment/submit")
      .send({ answers: [1, 1, 2, 0] });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.scorePercentage, 100);
    assert.equal(res.body.data.passed, true);
    assert.ok(res.body.data.recommendation);
  });
});
