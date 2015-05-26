exports.application = function(req, res, controllerMongoDB){
  var applicationId = req.query.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  res.render('../views/application', { application : application });
	});  
  }
};

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