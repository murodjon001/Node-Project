const jwt = require('jsonwebtoken');
const MY_SECRET_KEY = 'b062c2d4ac859398840ae7d72a31ef7cadb1596a441bc5c74f787eaec3282a3d2e2adb878cc7b23067f22605cee4a9fa3dbb8632c0df7fc3091166ea922ec5e1'
;

exports.generateAccessToken = (user) => {
    return jwt.sign(user, MY_SECRET_KEY, { expiresIn: '604800s' });
  }

exports.confrimToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, MY_SECRET_KEY, (err, user) => {  
    if (err) return res.sendStatus(403)
  
      req.user = user
  
      next()
    })
  }