const express = require('express');
const router = express.Router();

const controller = require('../controller/receipt');

router.post('/', (req, res, next) => {
    return controller.create(req.body)
            .then((data) => (res.status(200).send(data)))
            .catch((err) => next(err));
});

router.get('/has_return_receipt_by_vehical_no', (req, res, next) => {
    const {vehical_no} = req.query;
    return controller.getReturnReceiptByVehicalNo(vehical_no)
            .then((data) => (res.status(200).send(data)))
            .catch((err) => next(err));
});


module.exports = router;