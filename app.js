let express = require('express');
let app = express();
const db = require('./db');

let itemController = require('./Item/ItemController');
app.use('/api/catalog', itemController);

module.exports = app;
