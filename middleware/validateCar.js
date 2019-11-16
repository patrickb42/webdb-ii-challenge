const validateCar = (req, res, next) => {
  const { vin, make, model, mileage, transmissionType, titleStatus } = req.body;

  req.car = { vin, make, model, mileage, transmissionType, titleStatus };
  return (vin === undefined
          || make === undefined
          || model === undefined
          || mileage === undefined)
    ? res.status(400).json({ message: 'Cars must have a make, model, mileage and unique vin' })
    : next();
};

module.exports = { validateCar };
