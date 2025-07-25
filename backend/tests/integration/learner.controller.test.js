const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const learnersModel = require('../../models/learnersModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await learnersModel.deleteMany();
});

describe('Learners Controller', () => {

  describe('GET /api/learners', () => {
    it('should return an empty list if no learners', async () => {
      const res = await request(app).get('/api/learners');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return all learners in descending order', async () => {
      await learnersModel.create([
        { fullName: 'John Doe', dateOfBirth: '2010-01-01', gender: 'Male', guardianName: 'Jane', contactNumber: '1234567890', createdAt: new Date('2023-01-01') },
        { fullName: 'Alice Smith', dateOfBirth: '2011-05-05', gender: 'Female', guardianName: 'Bob', contactNumber: '0987654321',createdAt: new Date('2024-01-01') },
      ]);

      const res = await request(app).get('/api/learners');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].fullName).toBe('Alice Smith');
    });
  });

  describe('POST /api/learners/register', () => {
    it('should create a new learner', async () => {
      const learner = {
        fullName: 'Test Learner',
        dateOfBirth: '2012-03-15',
        gender: 'Female',
        guardianName: 'Guardian Name',
        contactNumber: '0111222333'
      };

      const res = await request(app).post('/api/learners/register').send(learner);

      expect(res.statusCode).toBe(201);
      expect(res.body.fullName).toBe('Test Learner');

      const count = await learnersModel.countDocuments();
      expect(count).toBe(1);
    });

    it('should fail with bad request if required fields are missing', async () => {
      const res = await request(app).post('/api/learners/register').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('PUT /api/learners/:id', () => {
    it('should update an existing learner', async () => {
      const learner = await learnersModel.create({
        fullName: 'Old Name',
        dateOfBirth: '2010-01-01',
        gender: 'Male',
        guardianName: 'Guardian',
        contactNumber: '0001112222'
      });

      const res = await request(app)
        .put(`/api/learners/${learner._id}`)
        .send({ fullName: 'Updated Name' });

      expect(res.statusCode).toBe(200);
      expect(res.body.fullName).toBe('Updated Name');
    });

    it('should return 404 if learner not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).put(`/api/learners/${fakeId}`).send({ fullName: 'Test' });
      expect(res.statusCode).toBe(404);
    });
  });

  describe('DELETE /api/learners/:id', () => {
    it('should delete a learner', async () => {
      const learner = await learnersModel.create({
        fullName: 'To Delete',
        dateOfBirth: '2009-09-09',
        gender: 'Female',
        guardianName: 'Someone',
        contactNumber: '9998887777'
      });

      const res = await request(app).delete(`/api/learners/${learner._id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Learner deleted successfully');

      const count = await learnersModel.countDocuments();
      expect(count).toBe(0);
    });

    it('should return 404 if learner not found', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/learners/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
