const jwt = require('jsonwebtoken');

const Auth = (req, res, next) => {
    const array = req.headers.authorization.split(" ");
    const token = array[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();

    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(409).json({
            message: `Authentication failed..`,
            Error: {
                error: error.message
            }
        });
    }
};



module.exports = Auth;