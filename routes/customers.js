const router = require('express').Router();
let Customer = require('../models/customer.model');

router.route('/').get((req, res) => {
    Customer.find()
        .then(customers => res.json(customers))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const customer = req.body.customer;
    const newCustomer = new Customer({customer});

    newCustomer.save()
    .then(customers => res.json('Customer added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;