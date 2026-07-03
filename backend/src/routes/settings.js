const router = require('express').Router();
const ctrl = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

router.get('/public', ctrl.getPublic);
router.get('/', protect, ctrl.getAll);
router.post('/', protect, ctrl.upsert);
router.put('/:key', protect, ctrl.updateOne);

module.exports = router;
