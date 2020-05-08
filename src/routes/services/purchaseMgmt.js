const ObjectId = require('mongodb').ObjectID;
const dbQuery = require('../../database/dbQuery.js');

function getUserInfo(customerName) {
    return new Promise((resolve, reject) => {
        dbQuery.findUser({ userName: customerName }, (err, customerInfo) => {
            if (err) {
                return reject(new Error(`Bad happened${err}`));
            }
            if (!customerInfo || customerInfo.role !== 'customer') {
                return reject(new Error('You aren\'t customer. Kindly SignUp'));
            }
            return resolve(customerInfo);
        });
    });
}

function getProductDetails(productId) {
    return new Promise((resolve, reject) => {
        dbQuery.getAllProducts({ _id: ObjectId(productId) }, (err, productDetails) => {
            if (err || productDetails.length < 1) {
                return reject(new Error('No product with this ProductId'));
            }
            return resolve(productDetails[0]);
        });
    });
}

function preparePurchaseData(custInfo, productData) {
    const purchaseData = {};
    purchaseData.productId = productData._id;
    purchaseData.productName = productData.name;
    purchaseData.seller = productData.seller;
    purchaseData.customer = custInfo.userName;
    purchaseData.status = 0; // 0- Order placed, 1- Accepted, 2- Rejected
    return purchaseData;
}

function placeOrder(purchaseData) {
    return new Promise((resolve, reject) => {
        dbQuery.insertPurchaseData(purchaseData, (err, placeResult) => {
            if (err) {
                return reject(new Error('Error while plcaing order. Try again!'));
            }
            return resolve(placeResult);
        });
    });
}

async function purchaseProduct(req, res) {
    try {
        console.log('ok');
        const productData = await getProductDetails(req.body.productId);
        const custInfo = await getUserInfo(req.body.customer);
        const purchaseData = preparePurchaseData(custInfo, productData);
        await placeOrder(purchaseData);
        return res.json({ success: true, result: 'Order Placed' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

module.exports = {
    purchaseProduct,
};
