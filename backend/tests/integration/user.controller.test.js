const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const User = require("../../models/userModel");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("User Controller", () => {
  const userData = {
    fullName: "Test User",
    email: "test@example.com",
    password: "Password123!",
    contactNumber: "1234567890"
  };

  it("should register a new user", async () => {
    const res = await request(app).post("/api/user/register").send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
    expect(res.body.token).toBeDefined();
  });

  it("should not register if user already exists", async () => {
    await request(app).post("/api/user/register").send(userData);
    const res = await request(app).post("/api/user/register").send(userData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User already exists");
  });

  it("should login a registered user", async () => {
    await request(app).post("/api/user/register").send(userData);
    const res = await request(app)
      .post("/api/user/login")
      .send({ email: userData.email, password: userData.password });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body.token).toBeDefined();
  });

  it("should not login with wrong password", async () => {
    await request(app).post("/api/user/register").send(userData);
    const res = await request(app)
      .post("/api/user/login")
      .send({ email: userData.email, password: "WrongPassword" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials");
  });

  it("should get all users", async () => {
    await request(app).post("/api/user/register").send(userData);
    const res = await request(app).get("/api/user");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should delete a user", async () => {
    const register = await request(app).post("/api/user/register").send(userData);
    const userId = await User.findOne({ email: userData.email }).then(user => user._id);

    const res = await request(app).delete(`/api/user/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });
});
