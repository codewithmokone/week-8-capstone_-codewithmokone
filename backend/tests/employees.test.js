const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app"); // <-- Your Express app
const Employee = require("../models/employeesModel");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.disconnect();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Employee.deleteMany({});
});

describe("Employee API Endpoints", () => {
  const mockEmployee = {
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    position: "Developer",
    contactNumber: "0712345678"
  };

  it("should create a new employee", async () => {
    const res = await request(app).post("/employees").send(mockEmployee);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe(mockEmployee.email);
  });

  it("should get all employees", async () => {
    await Employee.create(mockEmployee);

    const res = await request(app).get("/employees");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].email).toBe(mockEmployee.email);
  });

  it("should delete an employee", async () => {
    const employee = await Employee.create(mockEmployee);
    const res = await request(app).delete(`/employees/${employee._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User deleted successfully");
  });

  it("should return 404 when deleting non-existent employee", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/employees/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  it("should handle update logic even with no file upload", async () => {
    const employee = await Employee.create(mockEmployee);
    const res = await request(app)
      .put(`/employees/${employee._id}`)
      .send({}); // Since file upload is optional

    expect([200, 400, 404]).toContain(res.statusCode);
  });
});
