const { report } = require('../controllers');

const router = require('express').Router();

router.route('/').get(report.getAllReports).post(report.createReport);
router
   .route('/:reportId')
   .patch(report.updateReport)
   .delete(report.deleteReport);

module.exports = router;
