const express = require('express');
const statusRoutes = require('../src/health/routes');
const userRoutes = require('../src/users/routes');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send("Welcome to JalSync backend API!");
  })
  app.use('/status', statusRoutes);
  app.use('/auth', userRoutes);

  // Handle 404 - Not Found
  app.use('*', (req, res, next) => {
    if (req.originalUrl.startsWith('/admin')) {
      return next(); // Pass the request to the next middleware
    }

    // For all other URLs, return a 404 response
    res.status(404).send('Not found!!!');
  });

};
