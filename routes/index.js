const RECORD_LIMIT = 10;

exports.index = function(req, res, controllerMongoDB){
  var sizeOfSubmittedApplications, sizeOfConfirmedApplications, sizeOfSignedApplications, inquiriedApplications;
	
  controllerMongoDB.getApplicationsByStatus(1, function(err, applications){
	sizeOfSubmittedApplications = applications.length;
	
	controllerMongoDB.getApplicationsByStatus(3, function(err, applications){
	  sizeOfConfirmedApplications = applications.length;
	
	  controllerMongoDB.getApplicationsByStatus(5, function(err, applications){
		sizeOfSignedApplications = applications.length;
	
		controllerMongoDB.getInquiriedApplications(RECORD_LIMIT, function(err, applications){
		  inquiriedApplications = applications;
		  
		  res.render('../views/index', {
			  sizeOfSubmittedApplications : sizeOfSubmittedApplications,
			  sizeOfConfirmedApplications : sizeOfConfirmedApplications,
			  sizeOfSignedApplications : sizeOfSignedApplications,
			  inquiriedApplications : inquiriedApplications,
		  });
		});
	  });
	});
  });
};

exports.changeApplicationStatus = function(req, res, controllerMongoDB){
  res.sendStatus(200);
};