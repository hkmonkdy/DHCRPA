exports.application = function(req, res, controllerMongoDB){
  var applicationId = req.query.applicationId;
  
  if(applicationId){
	controllerMongoDB.getApplication(applicationId, function(err, application){
	  res.render('../views/application', { application : application });
	});  
  }
};