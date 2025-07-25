const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Activity = require("../../models/activityModel");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Activity.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Activity API", () => {
  describe("GET /api/activities", () => {
    it("should return all activities", async () => {
      const sampleActivities = [
        { title: "Reading", category: "Education", description: "Read a book", time: "10:00", status: "In Progress" },
        { title: "Running", category: "Fitness", description: "Morning run", time: "07:00", status: "Completed" },
      ];

      await Activity.insertMany(sampleActivities);

      const res = await request(app).get("/api/activities");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0]).toHaveProperty("title", "Reading");
    });
  });

  describe("POST /api/activities", () => {
    it("should create a new activity", async () => {
      const newActivity = {
        title: "Painting",
        category: "Art",
        description: "Paint a landscape",
        time: "15:00",
        status: "In Progress",
      };

      const res = await request(app)
        .post("/api/activities")
        .send(newActivity);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.title).toBe("Painting");

      const activityInDb = await Activity.findOne({ title: "Painting" });
      expect(activityInDb).not.toBeNull();
    });

    it("should return 400 if required fields are missing", async () => {
      const incompleteActivity = {
        title: "",
        category: "General"
        // Missing description, time, status
      };

      const res = await request(app)
        .post("/api/activities")
        .send(incompleteActivity);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });
  });
});
