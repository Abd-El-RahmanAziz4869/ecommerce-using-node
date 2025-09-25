
const { body, validationResult } = require('express-validator'); 

exports.validateRegistration = [
  body('name').isLength({ min: 3 }).withMessage('Name must be >= 3 chars'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be >= 6 chars')
];

exports.validateLogin = [
  body('email').isEmail(),
  body('password').exists()
];

exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); 
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};
