const { report } = require('../controllers');

const router = require('express').Router();

router.route('/list_by_userId/:userId').get(report.getListReportsByUserId);
router
   .route('/:reportId')
   .patch(report.updateReport)
   .get(report.getOneReportById)
   .delete(report.deleteReport);
router.route('/').get(report.getAllReports).post(report.createReport);

module.exports = router;
