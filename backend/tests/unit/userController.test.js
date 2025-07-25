const userController = require('../../controllers/userController');
const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

jest.mock('../../models/userModel');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const mockReq = (params = {}, body = {}, headers = {}, user = null) => ({
  params,
  body,
  header: (name) => headers[name],
  user,
});
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('User Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users formatted', async () => {
      const fakeUsers = [
        {
          toObject: () => ({
            _id: 'u1',
            fullName: 'Test User',
            featuredImage: {
              data: Buffer.from('imgdata'),
              contentType: 'image/png',
            },
          }),
        },
      ];
      userModel.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(fakeUsers),
      });

      const req = mockReq();
      const res = mockRes();

      await userController.getAllUsers(req, res);

      expect(userModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        {
          _id: 'u1',
          fullName: 'Test User',
          featuredImage: {
            type: 'image/png',
            data: fakeUsers[0].toObject().featuredImage.data.toString('base64'),
          },
        },
      ]);
    });

    it('should handle errors and return 500', async () => {
      userModel.find.mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('DB failure')),
      });
      const req = mockReq();
      const res = mockRes();

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB failure' });
    });
  });

  describe('getUserProfile', () => {
    it('should return user profile without password', async () => {
      const fakeUser = { _id: 'u1', fullName: 'Profile User' };
      userModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(fakeUser),
      });

      const req = mockReq({}, {}, {}, { id: 'u1' });
      const res = mockRes();

      await userController.getUserProfile(req, res);

      expect(userModel.findById).toHaveBeenCalledWith('u1');
      expect(res.json).toHaveBeenCalledWith(fakeUser);
    });

    it('should return 404 if user not found', async () => {
      userModel.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const req = mockReq({}, {}, {}, { id: 'notfound' });
      const res = mockRes();

      await userController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on error', async () => {
      userModel.findById.mockReturnValue({
        select: jest.fn().mockRejectedValue(new Error('DB error')),
      });

      const req = mockReq({}, {}, {}, { id: 'error' });
      const res = mockRes();

      await userController.getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    });
  });

  describe('registerUser', () => {
    it('should register user and return token', async () => {
      const reqBody = { fullName: 'John', email: 'john@example.com', password: 'pass123', contactNumber: '12345' };
      userModel.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPass');
      userModel.prototype.save = jest.fn().mockResolvedValue();

      const saveSpy = jest.spyOn(userModel.prototype, 'save').mockResolvedValue();

      const req = mockReq({}, reqBody);
      const res = mockRes();

      jwt.sign.mockReturnValue('token123');

      // mock User constructor to return an instance with save method
      const User = require('../../models/userModel');
      jest.spyOn(User.prototype, 'save').mockResolvedValue();

      await userController.registerUser(req, res);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.hash).toHaveBeenCalledWith('pass123', 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "User registered successfully", token: 'token123' });
    });

    it('should return 400 if user exists', async () => {
      userModel.findOne.mockResolvedValue({ email: 'exists@example.com' });

      const req = mockReq({}, { email: 'exists@example.com' });
      const res = mockRes();

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
    });

    it('should return 500 on error', async () => {
      userModel.findOne.mockRejectedValue(new Error('DB error'));

      const req = mockReq({}, { email: 'error@example.com' });
      const res = mockRes();

      await userController.registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Server error" }));
    });
  });

  describe('loginUser', () => {
    it('should login user and return token', async () => {
      const reqBody = { email: 'user@example.com', password: 'pass123' };
      const fakeUser = { _id: 'u1', email: 'user@example.com', password: 'hashedPass' };

      userModel.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('tokenXYZ');

      const req = mockReq({}, reqBody);
      const res = mockRes();

      await userController.loginUser(req, res);

      expect(userModel.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('pass123', 'hashedPass');
      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Login successful", user: fakeUser, token: 'tokenXYZ' });
    });

    it('should return 400 for invalid email', async () => {
      userModel.findOne.mockResolvedValue(null);

      const req = mockReq({}, { email: 'wrong@example.com', password: 'pass' });
      const res = mockRes();

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it('should return 400 for invalid password', async () => {
      const fakeUser = { _id: 'u1', email: 'user@example.com', password: 'hashedPass' };
      userModel.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);

      const req = mockReq({}, { email: 'user@example.com', password: 'wrongpass' });
      const res = mockRes();

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });

    it('should return 500 on error', async () => {
      userModel.findOne.mockRejectedValue(new Error('DB error'));

      const req = mockReq({}, { email: 'error@example.com', password: 'pass' });
      const res = mockRes();

      await userController.loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: "Server error" }));
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return 200', async () => {
      userModel.findByIdAndDelete.mockResolvedValue({ _id: 'u1' });

      const req = mockReq({ id: 'u1' });
      const res = mockRes();

      await userController.deleteUser(req, res);

      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('u1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 if user not found', async () => {
      userModel.findByIdAndDelete.mockResolvedValue(null);

      const req = mockReq({ id: 'notfound' });
      const res = mockRes();

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 500 on delete error', async () => {
      userModel.findByIdAndDelete.mockRejectedValue(new Error('Delete error'));

      const req = mockReq({ id: 'u1' });
      const res = mockRes();

      await userController.deleteUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Delete error' });
    });
  });
});
