import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { createApp } from "../src/app.js";
import { db } from "../src/database/db.js";

describe("Auth Module Integration Tests", () => {
  let app: ReturnType<typeof createApp>;

  before(async () => {
    await db.init();
    app = createApp();
  });

  it("should successfully register a new learner account", async () => {
    const uniqueEmail = `testuser_${Date.now()}@example.com`;
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test Learner",
        email: uniqueEmail,
        password: "SecurePassword123!",
        goal: "Become an AI Engineer",
        fields: ["Artificial Intelligence"],
      });

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user.email, uniqueEmail);
    assert.equal(res.body.data.user.name, "Test Learner");
    assert.ok(res.body.data.token, "Token should be issued");
  });

  it("should reject registration with duplicate email", async () => {
    const email = "alex@example.com";
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Alex Duplicate",
        email,
        password: "SecurePassword123!",
      });

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.match(res.body.error.message, /already exists/i);
  });

  it("should reject registration with invalid password length", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Short Pwd",
        email: `short_${Date.now()}@example.com`,
        password: "123",
      });

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("should login with default seeded credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "alex@example.com",
        password: "Password123!",
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user.name, "Alex Morgan");
    assert.ok(res.body.data.token);
  });

  it("should reject invalid login credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "alex@example.com",
        password: "WrongPassword999!",
      });

    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });
});
