const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app');
const Event = require('../../models/eventModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Event.deleteMany(); 
});

describe('Event API', () => {

  describe('GET /api/events', () => {
    it('should return empty array initially', async () => {
      const res = await request(app).get('/api/events');
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should return a list of events', async () => {
      const sampleEvent = new Event({
        name: 'Test Event',
        date: new Date(),
        type: 'Workshop',
        description: 'This is a test event'
      });
      await sampleEvent.save();

      const res = await request(app).get('/api/events');
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].name).toBe('Test Event');
    });
  });

  describe('POST /api/events', () => {
    it('should create a new event', async () => {
      const eventData = {
        name: 'Created Event',
        date: new Date().toISOString(),
        type: 'Seminar',
        description: 'Event created through API'
      };

      const res = await request(app)
        .post('/api/events')
        .send(eventData);

      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe(eventData.name);
      expect(res.body.type).toBe(eventData.type);
    });

    it('should return 400 for invalid input', async () => {
      const res = await request(app).post('/api/events').send({});
      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBeDefined();
    });
  });

});
