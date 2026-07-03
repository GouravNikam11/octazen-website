const router = require('express').Router();
const { login, getMe, updatePassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginLimiter } = require('../middleware/rateLimit');

router.post('/login', loginLimiter, login);
router.get('/me', protect, getMe);
router.put('/password', protect, updatePassword);

module.exports = router;
