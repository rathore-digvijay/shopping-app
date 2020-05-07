const dbQuery = require('../../database/dbQuery.js');
const reg = require('./registrationService.js');

function checkProductAlreadyExist(params) {
    const query = { seller: params.userName, productName: params.productName };
    return new Promise((resolve, reject) => {
        dbQuery.countProduct(query, (err, result) => {
            if (err) {
                return reject(new Error('Something bad happened'));
            }
            if (result > 0) {
                return reject(new Error('Your product already listed.'));
            }
            return resolve('Ok to insert product');
        });
    });
}

function prepareProductData(params) {
    return ({
        seller: params.userName,
        name: params.productName,
        price: params.price,
        description: params.description,
    });
}

function insertProduct(productData) {
    return new Promise((resolve, reject) => {
        dbQuery.insertProductData(productData, (err, insertResult) => {
            if (err) {
                return reject(new Error(`Something bad happened${err}`));
            }
            return resolve(insertResult);
        });
    });
}

async function insertProducts(req, res) {
    console.log('here');
    try {
        const userDetails = await reg.getUserDetails({ userName: req.body.userName });
        if (!userDetails) {
            throw new Error('Invalid seller.');
        }
        console.log(userDetails);
        await checkProductAlreadyExist(req.body);
        const productData = prepareProductData(req.body);
        await insertProduct(productData);
        return res.json({ success: true, result: 'Product Listed' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

module.exports = {
    insertProducts,
};
