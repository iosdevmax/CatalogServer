let express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var Item = require('../item/Item');
var uuid = require('uuid');
var errorHandler = require('../ErrorHandler');

/*
    -------------------------------------
    API Endpoint for adding a new product
    -------------------------------------
*/

router.post('/addProduct', function (req, res) {

    Item.create({
            id: uuid.v1(),
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

router.get('/getProducts', function (req, res) {

    Item.find({}, function (error, items) {
        if (error) return errorHandler.serverError(res);
        res.status(200).send(items);
    });
});

/*
    ----------------------------------------
    API Endpoint for getting a product by id
    ----------------------------------------
*/

router.get('/getProduct/:id', function (req, res) {

    let id = req.params.id.toString();

    Item.find({id: id}, function (error, item) {
        if (error) return errorHandler.serverError(res);
        if (item.length === 0) return errorHandler.itemDoesNotExist(res);
        res.status(200).send(item);
    });
});

module.exports = router;