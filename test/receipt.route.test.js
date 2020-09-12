var bodyParser = require('body-parser');
const assert = require('assert');
const receiptRoute = require('../src/node_service/routes/receipt');

const request = require("supertest");
const express = require("express");
const app = express();


app.use(bodyParser.json())
app.use("/", receiptRoute);

describe('receipt routes:post', () => {
    it('200',  () => {
        const body = {
            vehicle_no: "mh12ab9087",
            way_type: "oneway",
            paid_amount: 100
        };
        const expectedResult = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100
        }

        request(app)
            .post("/")
            .send(body)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response  => {
                assert.strictEqual(response.body.vehicle_no, expectedResult.vehicle_no);
                assert.strictEqual(response.body.way_type, expectedResult.way_type);
                assert.strictEqual(response.body.paid_amount, expectedResult.paid_amount);
              });

    });

});

describe('receipt routes:get', () => {
    it('has_return_receipt_by_vehical_no: 200 ',  () => {
        const body = {
            vehicle_no: "mh12ab9087",
            way_type: "oneway",
            paid_amount: 100
        };
        const expectedResult = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100
        }

        request(app)
            .get("/has_return_receipt_by_vehical_no?vehical_no=123")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response  => {
              });

    });

});