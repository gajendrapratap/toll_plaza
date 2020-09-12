const Receipt = require('../model/receipt');

let receiptList = [];

let receiptController = {};
receiptController.create = async (body) => {
    try {
        if(!body) throw new Error('body is undefined!');
        const { vehicle_no, way_type, paid_amount } = body;
        if(!vehicle_no || !way_type || !paid_amount) throw new Error('vehicalno,way_type,paid_amount are required!');
        let model = await Receipt(vehicle_no, way_type, paid_amount, new Date());
        model.date = getDate(model.todayDate);
        model.time =  getTime(model.todayDate);
        receiptList.push(model);
        return model;
    } catch (error) {
        throw new Error(error);
    }
}

receiptController.getReturnReceiptByVehicalNo = async (vehicalNo) => {
    try {
        if(!vehicalNo || vehicalNo.toString().length === 0) throw new Error('vehicalNo is undefined!');
        const result = receiptList.find(receipt => {
            const currentDate = new Date().toDateString();
            const receiptDate = receipt.todayDate.toDateString();
            const registerdVehicleNo = receipt.vehicle_no;
            const wayType = receipt.way_type;
            return ((vehicalNo === registerdVehicleNo) && 
            (currentDate === receiptDate) && (wayType === "twoway"))
        });
        return result ? result : {};
    } catch (error) {
        throw new Error(error);
    }
}

const getDate = (date) => {
    return `${date.getUTCDate()}/${date.getUTCMonth() +  1}/${date.getFullYear()}`;
    
};

const getTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};


module.exports = receiptController;