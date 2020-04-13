const express = require('express');
const auth = require('./middlewares/auth');
const routes = require("express").Router();
const multer = require('multer');
const multerConfig = require("./config/multer");
const ImageController = require('./controllers/ImageController')


routes.use(auth);
routes.get('/authenticate', (req, res) => {return res.status(200).send('Authenticated')});

routes.delete('/images/:id', ImageController.delete);
routes.post("/images", multer(multerConfig).single("file"), ImageController.store );

module.exports = routes;