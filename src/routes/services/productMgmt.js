const dbQuery = require('../../database/dbQuery.js');


function getProducts() {
    const query = {};
    return new Promise((resolve, reject) => {
        dbQuery.getAllProducts(query, (err, products) => {
            if (err) {
                return reject(new Error(`Something bad happened${err}`));
            }
            return resolve(products);
        });
    });
}

async function listProducts(req, res) {
    try {
        const productList = await getProducts();
        return res.json({ success: true, result: productList });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}


module.exports = {
    listProducts,
};
