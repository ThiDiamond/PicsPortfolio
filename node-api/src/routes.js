const express = require('express');
const routes = express.Router();
const ImageController = require('./controllers/ImageController');
const AuthController = require('./controllers/AuthController');
const EmailController = require('./controllers/EmailController');


routes.get('/images',ImageController.index);


//login routes
routes.post('/login', AuthController.login);
routes.post('/user', AuthController.store);

//email route
routes.post('/email', EmailController.sendEmail)

//images route
routes.get('/images/:id', ImageController.show);


module.exports = routes;