import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";
import { db } from "../src/database/db.js";

describe("Security and Health Checks Integration Tests", () => {
  let app: ReturnType<typeof createApp>;

  before(async () => {
    await db.init();
    app = createApp();
  });

  it("should respond to /health with process uptime and UP status", async () => {
    const res = await request(app).get("/health");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "UP");
    assert.ok(typeof res.body.uptimeSeconds === "number");
  });

  it("should respond to /health/ready with READY status", async () => {
    const res = await request(app).get("/health/ready");
    assert.equal(res.status, 200);
    assert.equal(res.body.status, "READY");
    assert.equal(res.body.database, "CONNECTED");
  });

  it("should return sanitized 404 for non-existent routes", async () => {
    const res = await request(app).get("/api/unknown-endpoint-xyz");
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.ok(res.body.correlationId);
  });

  it("should return security headers from Helmet", async () => {
    const res = await request(app).get("/health");
    assert.ok(res.headers["x-content-type-options"]);
    assert.ok(res.headers["x-correlation-id"]);
  });
});
