const router = require('express').Router();
const ctrl = require('../controllers/contactController');
const { protect } = require('../middleware/auth');

router.post('/', ctrl.submit);
router.get('/', protect, ctrl.getAll);
router.put('/:id', protect, ctrl.updateStatus);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
