let mongoose = require('mongoose');
let config = require('./config')
mongoose.connect(config.connectionString);
