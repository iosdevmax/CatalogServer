let express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Item = require('../Item/Item');
let uuid = require('uuid');
var errorHandler = require('../ErrorHandler');

/*
    -------------------------------------
    API Endpoint for adding a new product
    -------------------------------------
*/

router.post('/item', function (req, res) {

    Item.create({
            uuid: uuid.v1(),
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        },
        function (err, item) {
            if (err) return errorHandler.itemNotCreated(res);

            res.status(200).send(item);
        });

});

/*
    -------------------------------------
    API Endpoint for getting all products
    -------------------------------------
*/

router.get('/item', function (req, res) {

    let itemsUUIDs = req.body;
    var query = {};
    console.log(itemsUUIDs.length);
    if (isEmpty(itemsUUIDs)) {

    } else {
        query = {"itemUUID" : {"$in" : ["b85e1ef0-6935-11e9-9f0d-3901b0f61681"] }};
    }

    Item.find(query, function (error, items) {
        if (error) return errorHandler.serverError(res);
        res.status(200).send(items);
    });

});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/*
    ----------------------------------------
    API Endpoint for getting a product by id
    ----------------------------------------
*/

router.get('/item/:id', function (req, res) {

    let id = req.params.id.toString();

    Item.findOne({uuid: id}, function (error, item) {
        if (error) return errorHandler.serverError(res);
        if (!item) return errorHandler.itemDoesNotExist(res);
        res.status(200).send(item);
    });
});

module.exports = router;