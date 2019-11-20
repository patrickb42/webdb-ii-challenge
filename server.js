const express = require('express');

const { router: carsRouter } = require('./cars');

const server = express();

server.use(express.json());
server.use('/api/cars', carsRouter);

module.exports = server;
