const { report } = require('../services');

module.exports = {
   async getAllReports(req, res, next) {
      try {
         const result = await report.getAllReports();
         res.send(result);
      } catch (e) {
         next(e);
      }
   },

   async createReport(req, res, next) {
      try {
         const userId = req.body.userId || req.user.id;
         const result = await report.createReport(userId, req.body);
         res.status(200).json(result);
      } catch (e) {
         next(e);
      }
   },

   async updateReport(req, res, next) {
      try {
         const { reportId } = req.params;
         const result = await report.updateReport(reportId, req.body);
         res.status(200).json(result);
      } catch (e) {
         next(e);
      }
   },

   async deleteReport(req, res, next) {
      try {
         const { reportId } = req.params;
         const result = await report.deleteReport(reportId);
         res.status(200).json(result);
      } catch (e) {
         next(e);
      }
   },
};
