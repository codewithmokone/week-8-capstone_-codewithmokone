const learnersController = require('../../controllers/learnerController');
const learnersModel = require('../../models/learnersModel');

jest.mock('../../models/learnersModel');

const mockReq = (params = {}, body = {}, file = null) => ({
    params,
    body,
    file,
});
const mockRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Learners Controller - Unit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllLearners', () => {
        it('should return formatted learners with status 200', async () => {
            const fakeLearners = [
                {
                    toObject: () => ({
                        _id: 'abc123',
                        fullName: 'Test Learner',
                        featuredImage: {
                            data: Buffer.from('testdata'),
                            contentType: 'image/png',
                        },
                    }),
                },
            ];

            learnersModel.find.mockReturnValue({
                sort: jest.fn().mockResolvedValue(fakeLearners),
            });

            const req = mockReq();
            const res = mockRes();

            await learnersController.getAllLearners(req, res);

            expect(learnersModel.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith([
                {
                    _id: 'abc123',
                    fullName: 'Test Learner',
                    featuredImage: {
                        type: 'image/png',
                        data: fakeLearners[0].toObject().featuredImage.data.toString('base64'),
                    },
                },
            ]);
        });

        it('should handle errors and return 500', async () => {
            learnersModel.find.mockReturnValue({
                sort: jest.fn().mockRejectedValue(new Error('DB failure')),
            });

            const req = mockReq();
            const res = mockRes();

            await learnersController.getAllLearners(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB failure' });
        });
    });

    describe('getLearnerById', () => {
        it('should return learner with status 200', async () => {
            const fakeLearner = { _id: 'id123', fullName: 'Learner One' };
            learnersModel.findById = jest.fn().mockResolvedValue(fakeLearner);

            const req = mockReq({ id: 'id123' });
            const res = mockRes();

            await learnersController.getLearnerById(req, res);

            expect(learnersModel.findById).toHaveBeenCalledWith('id123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(fakeLearner);
        });

        it('should return 404 if learner not found', async () => {
            learnersModel.findById = jest.fn().mockResolvedValue(null);

            const req = mockReq({ id: 'missingid' });
            const res = mockRes();

            await learnersController.getLearnerById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Learner not found' });
        });

        it('should return 500 on error', async () => {
            learnersModel.findById = jest.fn().mockRejectedValue(new Error('DB error'));

            const req = mockReq({ id: 'someid' });
            const res = mockRes();

            await learnersController.getLearnerById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'DB error' });
        });
    });

    describe('createLearner', () => {
        it('should create and return new learner with status 201', async () => {
            const newLearnerData = {
                fullName: 'New Learner',
                dateOfBirth: '2010-01-01',
                gender: 'Female',
                guardianName: 'Guardian Name',
                contactNumber: '123456789',
            };

            const createdLearner = { _id: 'abc123', ...newLearnerData };
            learnersModel.create.mockResolvedValue(createdLearner);

            const req = mockReq({}, newLearnerData);
            const res = mockRes();

            await learnersController.createLearner(req, res);

            expect(learnersModel.create).toHaveBeenCalledWith(expect.objectContaining(newLearnerData));
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(createdLearner);
        });

        it('should return 400 on creation error', async () => {
            learnersModel.create.mockRejectedValue(new Error('Validation error'));

            const req = mockReq({}, { fullName: 'Incomplete' });
            const res = mockRes();

            await learnersController.createLearner(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Validation error' });
        });
    });

    describe('updateLearner', () => {
        it('should update learner and return 200', async () => {
            const updatedLearner = { _id: 'id123', fullName: 'Updated Name' };
            learnersModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedLearner);

            const req = mockReq({ id: 'id123' }, { fullName: 'Updated Name' });
            const res = mockRes();

            await learnersController.updateLearner(req, res);

            expect(learnersModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'id123',
                { fullName: 'Updated Name' },
                { new: true, runValidators: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedLearner);
        });

        it('should include featuredImage if file present', async () => {
            const updatedLearner = { _id: 'id123', fullName: 'Updated Name', featuredImage: 'image.png' };
            learnersModel.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedLearner);

            const req = mockReq({ id: 'id123' }, { fullName: 'Updated Name' }, { filename: 'image.png' });
            const res = mockRes();

            await learnersController.updateLearner(req, res);

            expect(learnersModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'id123',
                { fullName: 'Updated Name', featuredImage: 'image.png' },
                { new: true, runValidators: true }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedLearner);
        });

        it('should return 404 if learner not found', async () => {
            learnersModel.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

            const req = mockReq({ id: 'missingid' }, { fullName: 'Name' });
            const res = mockRes();

            await learnersController.updateLearner(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Learner not found' });
        });

        it('should return 400 on update error', async () => {
            learnersModel.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Update error'));

            const req = mockReq({ id: 'id123' }, { fullName: 'Name' });
            const res = mockRes();

            await learnersController.updateLearner(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ message: 'Update error' });
        });
    });

    describe('deleteLearner', () => {
        it('should delete learner and return 200', async () => {
            learnersModel.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'id123' });

            const req = mockReq({ id: 'id123' });
            const res = mockRes();

            await learnersController.deleteLearner(req, res);

            expect(learnersModel.findByIdAndDelete).toHaveBeenCalledWith('id123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Learner deleted successfully' });
        });

        it('should return 404 if learner not found', async () => {
            learnersModel.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            const req = mockReq({ id: 'missingid' });
            const res = mockRes();

            await learnersController.deleteLearner(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'Learner not found' });
        });

        it('should return 500 on delete error', async () => {
            learnersModel.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Delete error'));

            const req = mockReq({ id: 'id123' });
            const res = mockRes();

            await learnersController.deleteLearner(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Delete error' });
        });
    });
});
