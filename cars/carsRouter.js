const router = require('express').Router();

const {
  validateCar,
  verifyCarId,
} = require('../middleware');
const {
  get: getCars,
  insert: insertCar,
  update: updateCar,
  remove: removeCar,
} = require('../data/cars');

const template = ({
  dbOperation,
  dbOperationArg = {},
  operationFailed,
  operationFailureCode,
  operationFailureObject,
  opperationSuccessCode,
  operationErrorMessage,
}) => async (req, res) => {
  try {
    const result = await dbOperation(dbOperationArg);
    return (operationFailed(result))
      ? res.status(operationFailureCode).json(operationFailureObject)
      : res.status(opperationSuccessCode).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: operationErrorMessage,
    });
  }
};

router.get('/', (req, res) => {
  template({
    dbOperation: getCars,
    operationFailed: (result) => (result.length === 0),
    operationFailureCode: 404,
    operationFailureObject: { message: 'No cars found' },
    opperationSuccessCode: 200,
    operationErrorMessage: 'Error getting cars',
  })(req, res);
});

router.get('/:id', verifyCarId, async (req, res) => res.status(200).json(req.car));

router.post('/', validateCar, (req, res) => {
  template({
    dbOperation: insertCar,
    dbOperationArg: { car: req.car },
    operationFailed: (result) => (result === undefined),
    operationFailureCode: 500,
    operationFailureObject: { message: 'Car not added due to server error' },
    opperationSuccessCode: 200,
    operationErrorMessage: 'Error adding car',
  })(req, res);
});

router.put('/:id', verifyCarId, validateCar, (req, res) => {
  const { id } = req.params;

  template({
    dbOperation: updateCar,
    dbOperationArg: { id, changes: req.car },
    operationFailed: (result) => (result === undefined),
    operationFailureCode: 500,
    operationFailureObject: { message: `Error updating id ${id}` },
    opperationSuccessCode: 200,
    operationErrorMessage: `Error updating ${id}`,
  })(req, res);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  template({
    dbOperation: removeCar,
    dbOperationArg: { id },
    operationFailed: () => (false),
    operationFailureCode: 500,
    operationFailureObject: { message: 'This code should not be reached' },
    opperationSuccessCode: 200,
    operationErrorMessage: `Error updating ${id}`,
  })(req, res);
});

module.exports = { router };
