var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dhcrp'); 

var Application = require('../models/application');
var ApplicationInquiry = require('../models/application_inquiry');
var GeneralInquiry = require('../models/general_inquiry');

const APPLICATION_STATUS_NOT_SUBMITTED = 0;
const APPLICATION_STATUS_SUBMITTED = 1;
const APPLICATION_STATUS_EMAIL_SENT = 2;
const APPLICATION_STATUS_CONFIRMED = 3;
const APPLICATION_STATUS_DOCUMENT_SENT = 4;
const APPLICATION_STATUS_SIGNED = 5;
const APPLICATION_STATUS_COMPLETED = 6;

module.exports = {
	getApplication: function (applicationId, next) {
		Application.findOne({ _id: applicationId }, function (err, dbApplication) {
			return next(err, dbApplication);
		});
	},
	
	getApplications: function (next) {
		Application.find({ }, function (err, dbApplications) {
			return next(err, dbApplications);
		});
	},
	
	getApplicationsByStatus: function (statusId, next) {
		Application.find({ statusId: statusId }, function (err, dbApplications) {
			return next(err, dbApplications);
		});
	},
	
	getInquiriedApplications: function (recordLimit, next) {
		ApplicationInquiry.find({ }, function (err, dbApplicationInquiries) {
			return next(err, dbApplicationInquiries);
		});
	},
	
	saveApplication: function (submittedApplication, next) {
		if(submittedApplication._id){
			Application.findOne({ _id: submittedApplication._id }, function (err, dbApplication) {
				if (err)
					return next(err);
					
				if(!dbApplication)
					return next('No record found.');

				dbApplication.statusId = submittedApplication.statusId;
				dbApplication.employer = submittedApplication.employer;
				dbApplication.domesticHelper = submittedApplication.domesticHelper;
				dbApplication.updateOn = Date.now();

				dbApplication.save(function (err) {
					return next(err);
				});
			});
		}else{
			var newApplication = new Application();

			newApplication.statusId = APPLICATION_STATUS_NOT_SUBMITTED;
			newApplication.employer = submittedApplication.employer;
			newApplication.domesticHelper = submittedApplication.domesticHelper;
			
			newApplication.save(function (err) {
				return next(err, newApplication);
			});
		}
	},
	
	getGeneralInquiry: function (generalInquiryId, next) {
		GeneralInquiry.findOne({ _id: generalInquiryId }, function (err, dbGeneralInquiry) {
			return next(err, dbGeneralInquiry);
		});
	},
	
	getGeneralInquiries: function (recordLimit, next) {
		GeneralInquiry.find({  }, function (err, dbGeneralInquiry) {
			return next(err, dbGeneralInquiry);
		});
	}
}