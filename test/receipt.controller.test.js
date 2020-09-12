const assert = require('assert');
const controller = require('../src/node_service/controller/receipt');

describe('receipt controller test: create method', () => {
    it('all value are given', async () => {
        const body = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100
        };
        const expectedResult = {
            "vehicle_no": "mh12ab9087",
            "way_type": "oneway",
            "paid_amount": 100,
        }
        const actualResult = await controller.create(body);
        assert.strictEqual(actualResult.vehicle_no, expectedResult.vehicle_no);
        assert.strictEqual(actualResult.way_type, expectedResult.way_type);
        assert.strictEqual(actualResult.paid_amount, expectedResult.paid_amount);
    });
    it('if vehicle_no is not given', async () => {
        try {
            const body = {
                "way_type": "oneway",
                "paid_amount": 100
            };
            await controller.create(body);

        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalno,way_type,paid_amount are required!");
        }

    });
    it('if way_type is not given', async () => {
        try {
            const body = {
                "vehicle_no": "mh12ab9087",
                "paid_amount": 100
            };
            await controller.create(body);

        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalno,way_type,paid_amount are required!");
        }

    });

    it('if paid_amount is not given', async () => {
        try {
            const body = {
                "vehicle_no": "mh12ab9087",
                "way_type": "oneway",
            };
            await controller.create(body);

        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalno,way_type,paid_amount are required!");
        }

    });
    
    it('if empty data is pass', async () => {
        try {
            const body = {};
            await controller.create(body);
        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalno,way_type,paid_amount are required!");
        }

    });

    it('if undefine data is pass', async () => {
        try {
            await controller.create();
        } catch (error) {
            assert.strictEqual(error.message, "Error: body is undefined!");
        }

    });
});

describe('receipt controller test: getReturnReceiptByVehicalNo method', () => {
    it('all value are given', async () => {
        const body = {
            "vehicle_no": "mh12ab9087",
            "way_type": "twoway",
            "paid_amount": 200
        };

        const expectedResult = {
            "vehicle_no": "mh12ab9087",
            "way_type": "twoway",
            "paid_amount": 200
        }

        const vehicalNo = "mh12ab9087"
        await controller.create(body);
        const actualResult = await controller.getReturnReceiptByVehicalNo(vehicalNo);

        assert.strictEqual(actualResult.vehicle_no, expectedResult.vehicle_no);
        assert.strictEqual(actualResult.way_type, expectedResult.way_type);
        assert.strictEqual(actualResult.paid_amount, expectedResult.paid_amount);
    });

    it('if vehicalNo is not pass', async () => {
        try {
            const body = {
                "vehicle_no": "mh12ab9087",
                "way_type": "twoway",
                "paid_amount": 200
            };
    
            await controller.create(body);
            await controller.getReturnReceiptByVehicalNo();
        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalNo is undefined!");
        }
    });

    it('if vehicalNo is empty', async () => {
        try {
            const body = {
                "vehicle_no": "mh12ab9087",
                "way_type": "twoway",
                "paid_amount": 200
            };
    
            await controller.create(body);
            await controller.getReturnReceiptByVehicalNo("");
        } catch (error) {
            assert.strictEqual(error.message, "Error: vehicalNo is undefined!");
        }
    });

    it('if vehicalNo is not in list', async () => {
        try {
            const body = {
                "vehicle_no": "mh12ab9087",
                "way_type": "twoway",
                "paid_amount": 200
            };
    
            await controller.create(body);
            const expected = await controller.getReturnReceiptByVehicalNo("mh");
            assert.strictEqual({}, expected);
        } catch (error) {}
    });
})