exports.seed = (knex) => knex('cars').truncate().then(() => knex('cars').insert([
  {
    id: 1, // this is not actually needed, but it can be useful
    vin: '123456789abcdefgh',
    make: 'make test',
    model: 'model test',
    mileage: 5.1,
    transmissionType: null,
    titleStatus: null,
  },
  {
    id: 2,
    vin: '223456789abcdefgh',
    make: 'make test',
    model: 'model test',
    mileage: 5.1,
    titleStatus: null,
  },
  {
    id: 3,
    vin: '323456789abcdefgh',
    make: 'make test',
    model: 'model test',
    mileage: 5.1,
    transmissionType: null,
  },
  {
    id: 4,
    vin: '423456789abcdefgh',
    make: 'make test',
    model: 'model test',
    mileage: 5.1,
  },
]));
