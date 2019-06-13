var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
    uuid: String,
    name: String,
    price: Number,
    description: String
});
mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');
