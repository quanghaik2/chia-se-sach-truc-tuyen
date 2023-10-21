const { report } = require('../controllers');

const router = require('express').Router();

router
   .route('/')
   .get(report.getAllReports)
   .post(report.createReport)
   .delete(report.deleteReport);
router.route('/:reportId').patch(report.updateReport);

module.exports = router;
