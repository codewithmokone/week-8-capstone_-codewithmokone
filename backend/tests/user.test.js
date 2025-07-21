const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const User = require('../models/userModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('Auth API', () => {
  const userData = {
    fullname: 'testuser',
    email: 'test@example.com',
    password: 'Password123!',
  };

  test('POST /api/user/register - registers a new user', async () => {
    await User.create(userData);
    
    const res = await request(app)
      .post('/api/user/register')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  test('POST /api/user/register - fails if email already exists', async () => {
    await User.create(userData);

    const res = await request(app)
      .post('/api/users/register')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
  });

  test('POST /api/user/login - logs in existing user', async () => {
    // Create user first (make sure password is hashed properly in model middleware)
    await request(app).post('/api/user/register').send(userData);

    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: userData.email,
        password: userData.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe(userData.email);
  });

  test('POST /api/user/login - fails with wrong password', async () => {
    await request(app).post('/api/user/login').send(userData);

    const res = await request(app)
      .post('/api/user/login')
      .send({
        email: userData.email,
        password: 'wrongpassword',
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
  });

  // test('GET /api/protected - access with valid token', async () => {
  //   const signupRes = await request(app).post('/api/auth/signup').send(userData);
  //   const token = signupRes.body.token;
    
  //   const res = await request(app)
  //     .get('/api/protected')
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body).toHaveProperty('message');
  // });

  // test('GET /api/protected - access denied without token', async () => {
  //   const res = await request(app).get('/api/protected');
  //   expect(res.statusCode).toBe(401);
  // });
});