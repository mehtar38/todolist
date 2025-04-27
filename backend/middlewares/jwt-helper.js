const jwt = require('jsonwebtoken');
const secretKey= '98f0446420c2a9c6227d36f4e493d850d1c9650fc85abf4a5ed8b20e35c8155f';

function generateToken(email) {
    return jwt.sign({email}, secretKey, {expiresIn: '1h'});
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // 'Bearer <token>'
  
    if (!token) {
      return res.redirect("/register");
    }

    try {
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}  

module.exports = {generateToken, verifyToken, authenticateToken};

