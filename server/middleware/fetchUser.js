const jwt = require('jsonwebtoken');

const fetchUser = async(req, res, next) => {
    const token = req.header('token');
    if(!token){
        return res.status(400).json({error:"Please send a valid JWT token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(400).json({error:"Please send a valid JWT token"});
    }
};

module.exports = fetchUser;