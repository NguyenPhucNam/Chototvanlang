const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token,'secret');
    req.userData = decoded;
    next();
}
