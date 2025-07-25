const employeeController = require('../../controllers/employeesController');
const employeeModel = require('../../models/employeesModel');

jest.mock('../../models/employeesModel'); // mock the entire model

// Helper to mock req and res
const mockReq = (params = {}, body = {}) => ({
  params,
  body,
});
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Employee Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllEmployees', () => {
    it('should return formatted employees with status 200', async () => {
      const fakeEmployees = [
        {
          toObject: () => ({
            _id: '1',
            fullName: 'John Doe',
            featuredImage: {
              data: Buffer.from('abc'),
              contentType: 'image/png',
            },
          }),
        },
      ];

      employeeModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(fakeEmployees),
      });

      const req = mockReq();
      const res = mockRes();

      await employeeController.getAllEmployees(req, res);

      expect(employeeModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          _id: '1',
          fullName: 'John Doe',
          featuredImage: {
            type: 'image/png',
            data: fakeEmployees[0].toObject().featuredImage.data.toString('base64'),
          },
        },
      ]);
    });

    it('should handle errors and return 500', async () => {
      employeeModel.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('DB failure')),
      });

      const req = mockReq();
      const res = mockRes();

      await employeeController.getAllEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB failure' });
    });
  });

  describe('getEmplyeeById', () => {
    it('should return an employee with status 200', async () => {
      const fakeEmployee = { _id: '1', fullName: 'Jane Doe' };
      employeeModel.findById.mockResolvedValue(fakeEmployee);

      const req = mockReq({ id: '1' });
      const res = mockRes();

      await employeeController.getEmplyeeById(req, res);

      expect(employeeModel.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeEmployee);
    });

    it('should return 404 if employee not found', async () => {
      employeeModel.findById.mockResolvedValue(null);

      const req = mockReq({ id: 'nonexistent' });
      const res = mockRes();

      await employeeController.getEmplyeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 500 on error', async () => {
      employeeModel.findById.mockRejectedValue(new Error('DB error'));

      const req = mockReq({ id: '1' });
      const res = mockRes();

      await employeeController.getEmplyeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
  });

  describe('createEmployees', () => {
    it('should create and return new employee with status 201', async () => {
      const newEmpData = {
        fullName: 'Alice',
        email: 'alice@example.com',
        position: 'Engineer',
        contactNumber: '12345',
        department: 'R&D',
        address: '123 Road',
        dateHired: '2023-01-01',
      };

      const createdEmp = { _id: 'abc123', ...newEmpData };
      employeeModel.create.mockResolvedValue(createdEmp);

      const req = mockReq({}, newEmpData);
      const res = mockRes();

      await employeeController.createEmployees(req, res);

      expect(employeeModel.create).toHaveBeenCalledWith(newEmpData);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdEmp);
    });

    it('should return 400 on creation error', async () => {
      employeeModel.create.mockRejectedValue(new Error('Validation error'));

      const req = mockReq({}, { fullName: 'Incomplete' });
      const res = mockRes();

      await employeeController.createEmployees(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
    });
  });

  describe('updateEmployee', () => {
    it('should update employee and return 200', async () => {
      const updatedEmp = { _id: '1', fullName: 'Updated Name' };
      employeeModel.findByIdAndUpdate.mockResolvedValue(updatedEmp);

      const req = mockReq({ id: '1' }, { fullName: 'Updated Name' });
      const res = mockRes();

      await employeeController.updateEmployee(req, res);

      expect(employeeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '1',
        { fullName: 'Updated Name' },
        { new: true, runValidators: true }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedEmp);
    });

    it('should return 404 if employee not found', async () => {
      employeeModel.findByIdAndUpdate.mockResolvedValue(null);

      const req = mockReq({ id: 'nonexistent' }, { fullName: 'Name' });
      const res = mockRes();

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });

    it('should return 400 on update error', async () => {
      employeeModel.findByIdAndUpdate.mockRejectedValue(new Error('Update error'));

      const req = mockReq({ id: '1' }, { fullName: 'Name' });
      const res = mockRes();

      await employeeController.updateEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Update error' });
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee and return 200', async () => {
      employeeModel.findByIdAndDelete.mockResolvedValue({ _id: '1' });

      const req = mockReq({ id: '1' });
      const res = mockRes();

      await employeeController.deleteEmployee(req, res);

      expect(employeeModel.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 if employee not found', async () => {
      employeeModel.findByIdAndDelete.mockResolvedValue(null);

      const req = mockReq({ id: 'nonexistent' });
      const res = mockRes();

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on delete error', async () => {
      employeeModel.findByIdAndDelete.mockRejectedValue(new Error('Delete error'));

      const req = mockReq({ id: '1' });
      const res = mockRes();

      await employeeController.deleteEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Delete error' });
    });
  });
});
