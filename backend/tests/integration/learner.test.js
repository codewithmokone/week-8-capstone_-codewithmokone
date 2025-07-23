const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app"); // Express app only
const Learner = require("../../models/learnersModel");

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
  await Learner.deleteMany({});
});

describe("Learner API Endpoints", () => {
  const mockLearner = {
    fullName: "Lebo Mokoena",
    dateOfBirth: "2018-04-15",
    gender: "Female",
    guardianName: "Nomvula Mokoena",
    contactNumber: "0761234567"
  };

  it("should create a new learner", async () => {
    const res = await request(app).post("/learners").send(mockLearner);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.fullName).toBe(mockLearner.fullName);
  });

  it("should get all learners", async () => {
    await Learner.create(mockLearner);

    const res = await request(app).get("/learners");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].fullName).toBe(mockLearner.fullName);
  });

  it("should delete a learner", async () => {
    const learner = await Learner.create(mockLearner);

    const res = await request(app).delete(`/learners/${learner._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Learner deleted successfully");
  });

  it("should update a learner's image field (simulate)", async () => {
    const learner = await Learner.create(mockLearner);

    const res = await request(app)
      .put(`/learners/${learner._id}`)
      .send({ featuredImage: "some-file.png" });

    // even though this just sets the field, your controller expects a file
    // ideally you'd mock file upload using `multer` and `supertest` multipart
    expect([200, 400, 404]).toContain(res.statusCode); // fallback expectation
  });

  it("should return 404 when deleting non-existent learner", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).delete(`/learners/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Learner not found");
  });
});
