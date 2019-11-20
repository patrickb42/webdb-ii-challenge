const { get } = require('../data/cars');

const verifyCarId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await get({ id });
    if (result.length === 0) return res.status(404).json({ message: `No car found under id ${id}` });
    req.car = result;
  } catch (error) {
    return res.status(500).json({
      error: error.response,
      message: `error getting car by id ${id}`,
    });
  }
  return next();
};

module.exports = { verifyCarId };
