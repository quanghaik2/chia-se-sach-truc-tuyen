const { report } = require('../controllers');
const middlewares = require('../middlewares');

const router = require('express').Router();

router
   .route('/list_by_userId/:userId')
   .get(middlewares.checkToken, report.getListReportsByUserId);
router
   .route('/:reportId')
   .patch(middlewares.checkToken, report.updateReport)
   .get(middlewares.checkToken, report.getOneReportById)
   .delete(middlewares.checkToken, report.deleteReport);
router
   .route('/')
   .get(middlewares.checkToken, middlewares.checkRole, report.getAllReports)
   .post(middlewares.checkToken, report.createReport);

module.exports = router;
