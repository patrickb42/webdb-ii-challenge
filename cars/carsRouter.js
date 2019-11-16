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
} = require('../data/Cars');

router.get('/', async (req, res) => {
  try {
    const result = await getCars();
    return (result.length === 0)
      ? res.status(404).json({ message: 'no cars found' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error getting cars',
    });
  }
});

router.get('/:id', verifyCarId, async (req, res) => res.status(200).json(req.car));

router.post('/', validateCar, async (req, res) => {
  try {
    const result = await insertCar({ car: req.car });
    return (result === undefined)
      ? res.status(500).json({ message: 'Error adding car' })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: 'Error adding car',
    });
  }
});

router.put('/:id', verifyCarId, validateCar, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await updateCar({ id, changes: req.car });
    return (result === undefined)
      ? res.status(500).json({ message: `Error updating id ${id}` })
      : res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error updating id ${id}`,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await removeCar({ id });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `Error removing id ${id}`,
    });
  }
});

module.exports = { router };
