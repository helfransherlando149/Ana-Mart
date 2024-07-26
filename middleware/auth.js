const jwt = require('jsonwebtoken');

const auth = (role) => {
  return (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send('Access Denied');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).send('Access Denied');
    }

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      if (role && req.user.role !== role) {
        return res.status(403).send('Forbidden');
      }

      next();
    } catch (error) {
      console.log('Invalid token:', token);
      console.error(error);
      res.status(400).send('Invalid Token');
    }
  };
};

module.exports = auth;
