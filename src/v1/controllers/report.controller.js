const { report } = require('../services');

module.exports = {
   async getAllReports(req, res, next) {
      try {
         const result = await report.getAllReports();
         res.status(200).json({
            error: 'false',
            message: 'Get all reports successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },

   async createReport(req, res, next) {
      try {
         const userId = req.body.userId || req.user.id;
         const result = await report.createReport(userId, req.body);
         res.status(201).json({
            error: 'false',
            message: 'Create report successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },

   async updateReport(req, res, next) {
      try {
         const { reportId } = req.params;
         const result = await report.updateReport(reportId, req.body);
         res.status(200).json({
            error: 'false',
            message: 'Update report successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },

   async deleteReport(req, res, next) {
      try {
         const { reportId } = req.params;
         const result = await report.deleteReport(reportId);
         res.status(200).json({
            error: 'false',
            message: 'Delete report successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },

   async getListReportsByUserId(req, res, next) {
      try {
         const { userId } = req.params;
         const result = await report.getReports(userId);
         res.status(200).json({
            error: 'false',
            message: 'Get list reports by userId successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },

   async getOneReportById(req, res, next) {
      try {
         const { reportId } = req.params;
         const result = await report.getReportById(reportId);
         res.status(200).json({
            error: 'false',
            message: 'Get one report by id successfully',
            data: result,
         });
      } catch (e) {
         next(e);
      }
   },
};
