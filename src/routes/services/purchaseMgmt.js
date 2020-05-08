const ObjectId = require('mongodb').ObjectID;
const dbQuery = require('../../database/dbQuery.js');

function getUserInfo(customerName) {
    return new Promise((resolve, reject) => {
        dbQuery.findUser({ userName: customerName }, (err, customerInfo) => {
            if (err) {
                return reject(new Error(`Bad happened${err}`));
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
    purchaseData.status = 'Order Requested'; // 0- Order placed, 1- Accepted, 2- Rejected
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
        const productData = await getProductDetails(req.body.productId);
        const custInfo = await getUserInfo(req.body.customer);
        if (!custInfo || custInfo.role !== 'customer') {
            throw new Error('You aren\'t customer. Kindly SignUp');
        }
        const purchaseData = preparePurchaseData(custInfo, productData);
        await placeOrder(purchaseData);
        return res.json({ success: true, result: 'Order Placed' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

function getListfromDb(params, userInfo) {
    const query = {};
    if (userInfo.role === 'customer') {
        query.customer = userInfo.userName;
    } else {
        query.seller = userInfo.userName;
    }
    return new Promise((resolve, reject) => {
        dbQuery.findPurchaseList(query, (err, purchaseList) => {
            if (err) {
                return reject(new Error('Error while fetching list'));
            }
            return resolve(purchaseList);
        });
    });
}

async function getPurchaseList(req, res) {
    try {
        const userInfo = await getUserInfo(req.body.userName);
        if (!userInfo) {
            throw new Error('Sign In to continue!');
        }
        const purchaseList = await getListfromDb(req.body, userInfo);
        return res.json({ success: true, result: purchaseList });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

function updateOrder(userInfo, params) {
    const query = { _id: ObjectId(params.purchaseId), seller: userInfo.userName };
    const updateData = { status: params.status };
    return new Promise((resolve, reject) => {
        dbQuery.updateOrderStatus(query, updateData, (err, updateResult) => {
            if (err) {
                return reject(new Error('Error while updating order status'));
            }
            if (!updateResult.matchedCount) {
                return reject(new Error('You cannot update this order'));
            }
            return resolve(updateResult);
        });
    });
}

async function updateOrderInfo(req, res) {
    try {
        const userInfo = await getUserInfo(req.body.userName);
        if (!userInfo) {
            throw new Error('Sign In to continue!');
        }
        await updateOrder(userInfo, req.body);
        return res.json({ success: true, result: 'Order Updated' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

module.exports = {
    purchaseProduct,
    getPurchaseList,
    updateOrderInfo,
};
