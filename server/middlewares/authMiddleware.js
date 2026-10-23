const jwt = require("jsonwebtoken");

const verifyJwt = (req, res, next) => {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({ message: "Missing token" });
    }
    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET);
        req.body.userID = decode.userID;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }
}

module.exports = verifyJwt
