const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../../app'); // Your Express app
const Employee = require('../../models/employeesModel');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Employee.deleteMany(); // Clean after each test
});

describe('Employee API', () => {
  it('should create a new employee', async () => {
    const newEmployee = {
      fullName: 'John Doe',
      email: 'john@example.com',
      position: 'Developer',
      contactNumber: '1234567890',
      department: 'Engineering',
      address: '123 Main St',
      dateHired: '2023-01-01',
    };

    const res = await request(app)
      .post('/api/employees/register') // Adjust route if different
      .send(newEmployee);

    expect(res.statusCode).toBe(201);
    expect(res.body.fullName).toBe(newEmployee.fullName);
  });

  it('should fetch all employees', async () => {
    await Employee.create([
      { fullName: 'John A', email: 'a@example.com', position: 'Dev', contactNumber: '1', department: 'Eng', address: 'A St', dateHired: '2023-01-01' },
      { fullName: 'John B', email: 'b@example.com', position: 'Dev', contactNumber: '2', department: 'Eng', address: 'B St', dateHired: '2023-02-01' }
    ]);

    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it('should fetch an employee by ID', async () => {
    const emp = await Employee.create({
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      position: 'Manager',
      contactNumber: '999',
      department: 'Admin',
      address: 'X St',
      dateHired: '2022-01-01',
    });

    const res = await request(app).get(`/api/employees/${emp._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe('Jane Smith');
  });

  it('should update an employee', async () => {
    const emp = await Employee.create({
      fullName: 'Mark',
      email: 'mark@example.com',
      position: 'Tester',
      contactNumber: '456',
      department: 'QA',
      address: 'Y St',
      dateHired: '2022-01-01',
    });

    const res = await request(app)
      .put(`/api/employees/${emp._id}`)
      .send({ fullName: 'Mark Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe('Mark Updated');
  });

  it('should delete an employee', async () => {
    const emp = await Employee.create({
      fullName: 'ToDelete',
      email: 'del@example.com',
      position: 'HR',
      contactNumber: '777',
      department: 'HR',
      address: 'Z St',
      dateHired: '2022-01-01',
    });

    const res = await request(app).delete(`/api/employees/${emp._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');

    const check = await Employee.findById(emp._id);
    expect(check).toBeNull();
  });
});
