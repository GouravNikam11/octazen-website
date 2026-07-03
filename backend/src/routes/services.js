const router = require('express').Router();
const { createCRUD } = require('../controllers/crudFactory');
const { protect } = require('../middleware/auth');

const modelName = 'services';
const modelMap = {
  services: require('../models/Service'),
  technologies: require('../models/Technology'),
  testimonials: require('../models/Testimonial'),
  team: require('../models/TeamMember'),
  careers: require('../models/Career'),
  industries: require('../models/Industry'),
  stats: require('../models/Stat'),
};

const ctrl = createCRUD(modelMap['services'], { isActive: true });

router.get('/', ctrl.getAll);
router.get('/admin', protect, ctrl.getAllAdmin);
router.get('/:id', ctrl.getOne);
router.post('/', protect, ctrl.create);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.delete);

module.exports = router;
