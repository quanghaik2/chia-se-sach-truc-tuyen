const { Report } = require('../models');

module.exports = {
   async createReport(userId, body) {
      const { bookId, title, image, content } = body;

      console.log(userId, body);
      if (!bookId || !title || !content || !userId) {
         throw new Error('Missing required fields');
      }

      const report = await Report.create({
         userId,
         bookId,
         title,
         image,
         content,
      });

      return report;
   },

   async getReports(userId) {
      const reports = await Report.find({ userId }).populate('bookId');

      return reports;
   },

   async getReportById(reportId) {
      return await Report.findById(reportId).populate('bookId');
   },

   async getAllReports() {
      return await Report.find({}).populate('bookId');
   },

   async updateReport(reportId, body) {
      const { status } = body;

      if (!status) {
         throw new Error('Missing required fields');
      }

      const report = await Report.findByIdAndUpdate(
         reportId,
         { status },
         { new: true }
      );

      return report;
   },

   async deleteReport(reportId) {
      return await Report.findByIdAndDelete(reportId);
   },
};
