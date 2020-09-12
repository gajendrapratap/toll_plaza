const assert = require('assert');
const model = require('../src/node_service/model/receipt');

describe('receipt model test', () => {
    it('all value are given', async () => {
        const body = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100,
            "todayDate": new Date("Sun Sep 13 2020 03:27:37 GMT+0530 (India Standard Time)")
        };
        const expectedResult = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100,
            "todayDate": new Date("Sun Sep 13 2020 03:27:37 GMT+0530 (India Standard Time)")
        }
        const actualResult = await model(body.vehicle_no,body.way_type,body.paid_amount, body.todayDate);
        assert.deepStrictEqual(actualResult, expectedResult);
    });
    
});