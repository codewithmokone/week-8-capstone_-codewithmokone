// tests/unit/eventController.test.js

const eventController = require('../../controllers/eventController');
const Event = require('../../models/eventModel');

jest.mock('../../models/eventModel');

const mockReq = (body = {}) => ({
  body,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Event Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getEvents', () => {
    it('should return all events with status 200', async () => {
      const fakeEvents = [{ name: 'Event1' }, { name: 'Event2' }];
      Event.find.mockResolvedValue(fakeEvents);

      const req = mockReq();
      const res = mockRes();

      await eventController.getEvents(req, res);

      expect(Event.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(fakeEvents);
    });

    it('should return 500 if error occurs', async () => {
      Event.find.mockRejectedValue(new Error('DB error'));

      const req = mockReq();
      const res = mockRes();

      await eventController.getEvents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
    });
  });

  describe('createEvent', () => {
    it('should create a new event and return 201', async () => {
      const newEventData = {
        name: 'Party',
        date: '2025-12-01',
        type: 'Celebration',
        description: 'Year-end party',
      };

      const createdEvent = { _id: '1', ...newEventData };
      Event.create.mockResolvedValue(createdEvent);

      const req = mockReq(newEventData);
      const res = mockRes();

      await eventController.createEvent(req, res);

      // Event.create is called with an instance of Event constructed with newEventData
      expect(Event.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(createdEvent);
    });

    it('should return 400 if creation fails', async () => {
      Event.create.mockRejectedValue(new Error('Validation error'));

      const req = mockReq({
        name: '',
        date: '',
        type: '',
        description: '',
      });
      const res = mockRes();

      await eventController.createEvent(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
    });
  });
});
