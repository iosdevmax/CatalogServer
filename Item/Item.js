var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    description: String
});
mongoose.model('Item', ItemSchema);

module.exports = mongoose.model('Item');
