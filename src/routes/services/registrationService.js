const bcrypt = require('bcrypt');
const dbQuery = require('../../database/dbQuery.js');

const saltRounds = 10;

function getPlayerDetails(data) {
    const query = { userName: data.userName };
    return new Promise((resolve, reject) => {
        dbQuery.findUser(query, (err, player) => {
            if (err) {
                return reject(new Error('Something bad happened'));
            }
            return resolve(player);
        });
    });
}

function createUser(data, hash) {
    const userData = {};
    userData.userName = data.userName;
    userData.password = hash;
    userData.role = data.role;
    return new Promise((resolve, reject) => {
        dbQuery.createUser(userData, (err, player) => {
            if (err) {
                return reject(new Error('Error while creating Player'));
            }
            return resolve(player);
        });
    });
}

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return reject(new Error('Error while encrypting password'));
            }
            return resolve(hash);
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
        const hashPassword = await encryptPassword(req.body.password);
        await createUser(req.body, hashPassword);
        return res.json({ success: true, result: 'User Created' });
    } catch (error) {
        console.error(`Error Name - ${error.name} & message -  ${error.message}`);
        return res.json({ success: false, errorInfo: error.message });
    }
}

function validatePassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                return reject(new Error('Error in login process'));
            }
            return resolve(result);
        });
    });
}

async function loginPlayer(req, res) {
    try {
        const playerDetails = await getPlayerDetails(req.body);
        if (!playerDetails) {
            throw new Error('No user found. Kindly register');
        }
        // TODO : Decrypt password and match
        const passwordInfo = await validatePassword(req.body.password, playerDetails.password);
        if (!passwordInfo) {
            throw new Error('Incorrect Password. Try again');
        }
        return res.json({
            success: true, result: { userName: playerDetails.userName, role: playerDetails.role },
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
