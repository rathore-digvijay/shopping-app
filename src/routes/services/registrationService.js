const dbQuery = require('../../database/dbQuery.js');

function getPlayerDetails(data) {
    const query = { userName: data.userName };
    return new Promise((resolve, reject) => {
        dbQuery.findUser(query, (err, player) => {
            if (err) {
                reject(new Error('Something bad happened'));
            } else {
                resolve(player);
            }
        });
    });
}

function createPlayer(data) {
    const playerData = { userName: data.userName, password: data.password };
    return new Promise((resolve, reject) => {
        dbQuery.createPlayer(playerData, (err, player) => {
            if (err) {
                reject(new Error('Error while creating Player'));
            } else {
                resolve(player);
            }
        });
    });
}

async function registerUser(req, res) {
    console.log('inside register user');
    console.log(JSON.stringify(req.body));
    try {
        const playerDetails = await getPlayerDetails(req.body);
        if (playerDetails) {
            throw new Error('User already exists with this username.');
        }
        // TODO : Encrypt password
        await createPlayer(req.body);
        return res.json({ success: true, result: 'User Created' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}


async function loginPlayer(req, res) {
    try {
        const playerDetails = await getPlayerDetails(req.body);
        if (!playerDetails) {
            throw new Error('No user found. Kindly register');
        }
        // TODO : Decrypt password and match
        if (playerDetails.password !== req.body.password) {
            throw new Error('Incorrect Password.');
        }
        return res.json({
            success: true,
        });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

module.exports = {
    registerUser,
    loginPlayer,
};
