var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dhcrp'); 

var Application = require('../models/application');
var ApplicationInquiry = require('../models/application_inquiry');
var GeneralInquiry = require('../models/general_inquiry');

const APPLICATION_STATUS_NOT_SUBMITTED = 1;

module.exports = {
	getApplication: function (applicationId, next) {
		Application.findOne({ _id: applicationId }, function (err, dbApplication) {
			return next(err, dbApplication);
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
	
	createApplicationInquiry: function (submittedApplicationInquiry, next) {
		var newApplicationInquiry = new ApplicationInquiry();

		newApplicationInquiry.queryInformation = submittedApplicationInquiry.queryInformation;
		
		newApplicationInquiry.save(function (err) {
			return next(err, newApplicationInquiry);
		});
	},
	
	createGeneralInquiry: function (submittedGeneralInquiry, next) {
		var newGeneralInquiry = new GeneralInquiry();

		newGeneralInquiry.name = submittedGeneralInquiry.name;
		newGeneralInquiry.contactNumber = submittedGeneralInquiry.contactNumber;
		newGeneralInquiry.email = submittedGeneralInquiry.email;
		newGeneralInquiry.title = submittedGeneralInquiry.title;
		newGeneralInquiry.content = submittedGeneralInquiry.content;
		
		newGeneralInquiry.save(function (err) {
			return next(err, newGeneralInquiry);
		});
	}
}