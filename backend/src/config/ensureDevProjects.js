const Project = require('../models/Project');
const { withSlugs } = require('./projectSeedData');

/** Add default portfolio projects when missing (does not delete admin-created projects). */
const ensureDevProjects = async () => {
  const seedProjects = withSlugs();
  let added = 0;

  for (const project of seedProjects) {
    const exists = await Project.findOne({ slug: project.slug });
    if (!exists) {
      await Project.create(project);
      added += 1;
    }
  }

  if (added > 0) {
    console.log(`📁 Added ${added} default portfolio project(s)`);
  }
};

module.exports = ensureDevProjects;
