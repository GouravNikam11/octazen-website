const router = require('express').Router();
const ctrl = require('../controllers/projectController');
const { protect } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/admin', protect, ctrl.getAllAdmin);
router.get('/:slug', ctrl.getOne);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
