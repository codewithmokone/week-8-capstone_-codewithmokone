const { createActivity, getActivities } = require('../../controllers/activityController');
const Activity = require('../../models/activityModel');

// Mocks
jest.mock('../../models/activityModel');

const mockReq = (body = {}) => ({ body });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Activity Controller - Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getActivities', () => {
    it('should return all activities', async () => {
      const mockData = [{ title: 'Running' }, { title: 'Painting' }];
      Activity.find.mockResolvedValue(mockData);

      const req = {};
      const res = mockRes();

      await getActivities(req, res);

      expect(Activity.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle errors and return 500', async () => {
      Activity.find.mockRejectedValue(new Error('DB error'));

      const req = {};
      const res = mockRes();

      await getActivities(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
  });

  describe('createActivity', () => {
    it('should create a new activity and return 201', async () => {
      const newActivity = {
        title: 'Reading',
        category: 'Education',
        description: 'Read a book',
        time: '08:00',
        status: 'completed',
      };

      const createdActivity = { ...newActivity, _id: 'mockedId' };
      Activity.create.mockResolvedValue(createdActivity);

      const req = mockReq(newActivity);
      const res = mockRes();

      await createActivity(req, res);

      expect(Activity.create).toHaveBeenCalledWith(expect.objectContaining(newActivity));
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdActivity);
    });

    it('should handle validation error and return 400', async () => {
      Activity.create.mockRejectedValue(new Error('Validation failed'));

      const req = mockReq({
        title: 'Incomplete Activity',
        category: 'Work',
        // missing fields like description, time, status
      });
      const res = mockRes();

      await createActivity(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation failed' });
    });
  });
});
