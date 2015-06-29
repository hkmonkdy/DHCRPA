exports.application = function(req, res, controllerMongoDB){
  var applicationId = req.query.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  res.render('../views/application', { application : application });
	});  
  }else{
	  res.render('../views/applications', { applications : {} });
  }
};

exports.saveApplication = function(req, res, controllerMongoDB){
  var applicationId = req.body.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, dbApplication){
	  updateEmployer(req, dbApplication);
	  updateDomesticHelper(req, dbApplication);
	  //updateDocuments(req, dbApplication);
	  
	  console.log(dbApplication);
		
	  controllerMongoDB.saveApplication(dbApplication, function(err, application){
		res.render('../views/application', { application : application });
	  });
	});  
  }
};

function updateEmployer(req, application){
  //---------- Employer information -----------
  var employer = {};

  employer.firstName = req.body.firstName;
  employer.lastName = req.body.lastName;
  employer.chineseName = req.body.chineseName;
  employer.DOB = req.body.DOB;
  employer.gender = req.body.gender;
  employer.HKID = req.body.HKID;
  employer.passportNumber = req.body.passportNumber;
  employer.nationality = req.body.nationality;
  employer.occupation = req.body.occupation;
  employer.address1 = req.body.address1;
  employer.address2 = req.body.address2;
  employer.contactNumber = req.body.contactNumber;
  employer.homeNumber = req.body.homeNumber;
  employer.email = req.body.email;
  
  employer.isEmployerSameAdd = req.body.isEmployerSameAdd;
  employer.houseHoldIncome = req.body.houseHoldIncome;
  employer.numOfAdult = req.body.numOfAdult;
  employer.numOfChild = req.body.numOfChild;
  employer.numOfBaby = req.body.numOfBaby;
  employer.numOfPreBorn = req.body.numOfPreBorn;
  employer.numOfSpecialCare = req.body.numOfSpecialCare;
  employer.numOfDH = req.body.numOfDH;
  
  employer.apartmentTypeId = req.body.apartmentType;
  employer.apartmentArea = req.body.apartmentArea;
  employer.numOfRoom = req.body.numOfRoom;
  employer.hasIndividualRoomDH = req.body.hasIndividualRoomDH;
  employer.DHRoomArea = req.body.DHRoomArea;
  //---------- Employer information[END] -----------
  
  //---------- Family member information -----------
  employer.familyMembers = [];

  if(req.body.familyMemberNames){
	  var count = 1;
	  for(var i=0; i<req.body.familyMemberNames.length; i++){
		if(req.body.familyMemberNames[i] != ""){
		  count++;
		  employer.familyMembers[i] = {};
		  employer.familyMembers[i].orderNum = count;
		  employer.familyMembers[i].name = req.body.familyMemberNames[i];
		  employer.familyMembers[i].birthYear = req.body.familyMemberBirthYears[i];
		  employer.familyMembers[i].relationship = req.body.familyMemberRelationships[i];
		  employer.familyMembers[i].HKID = req.body.familyMemberHKIDs[i];
		}
	  }
  }
  //---------- Family member information[END] -----------
  
  //---------- Employed DH information -----------
  employer.employedDHs = [];

  if(req.body.employedDHNames){
	  count = 0;
	  for(var i=0; i<req.body.employedDHNames.length; i++){
		if(req.body.employedDHNames[i] != ""){
		  count++;
		  employer.employedDHs[i] = {};
		  employer.employedDHs[i].orderNum = count;
		  employer.employedDHs[i].name = req.body.employedDHNames[i];
		  employer.employedDHs[i].HKID = req.body.employedDHHKIDs[i];
		  employer.employedDHs[i].VISADueDate = req.body.employedDHVISADueDates[i];
		  employer.employedDHs[i].employerName = req.body.employedDHEmployerNames[i];
		}
	  }
  }
  //---------- Employed DH information[END] -----------
  
  application.employer = employer;
};

function updateDomesticHelper(req, application){
  //---------- Domestic Helper information -----------
  var domesticHelper = {};
  
  domesticHelper.firstName = req.body.firstName;
  domesticHelper.middleName = req.body.middleName;
  domesticHelper.lastName = req.body.lastName;
  domesticHelper.HKID = req.body.HKID;
  domesticHelper.HKIDIssueDate = req.body.HKIDIssueDate;
  domesticHelper.DOB = req.body.DOB;
  domesticHelper.gender = req.body.gender;
  domesticHelper.birthPlace = req.body.birthPlace;
  domesticHelper.Nationality = req.body.Nationality;
  domesticHelper.maritalStatusId = req.body.maritalStatusId;
  domesticHelper.addOfResidence1 = req.body.addOfResidence1;
  domesticHelper.addOfResidence2 = req.body.addOfResidence2;
  domesticHelper.contactNumber = req.body.contactNumber;
  domesticHelper.email = req.body.email;
  domesticHelper.familyContactName = req.body.familyContactName;
  domesticHelper.familyContactNumber = req.body.familyContactNumber;
  domesticHelper.postRenewalArrangement = req.body.postRenewalArrangement;
  domesticHelper.postRenewalTravelStartDate = req.body.postRenewalTravelStartDate;
  domesticHelper.postRenewalTravelEndDate = req.body.postRenewalTravelEndDate;
  domesticHelper.postRenewalPostponeReason = req.body.postRenewalPostponeReason;
  domesticHelper.passortNumber = req.body.passortNumber;
  domesticHelper.passportIssueDate = req.body.passportIssueDate;
  domesticHelper.passportDueDate = req.body.passportDueDate;
  domesticHelper.passportIssueCountry = req.body.passportIssueCountry;
  domesticHelper.VISAIssueDate = req.body.VISAIssueDate;
  domesticHelper.VISADueDate = req.body.VISADueDate;
  //---------- Domestic Helper information[END] -----------
  
  application.domesticHelper = domesticHelper;
}


exports.applications = function(req, res, controllerMongoDB){
  var applicationName = req.body.applicationName;
  var statusId = req.body.statusId;
  
  if(!statusId){
	statusId = req.query.statusId;
  }
  
  if(statusId){
	controllerMongoDB.getApplicationsByStatus(statusId, function(err, applications){
	  res.render('../views/applications', { applications : applications });
	});  
  }else{
	controllerMongoDB.getApplications(function(err, applications){
	  res.render('../views/applications', { applications : applications });
	});  
  }
};