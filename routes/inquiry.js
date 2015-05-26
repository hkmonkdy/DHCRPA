exports.inquiry = function(req, res, controllerMongoDB){
  var inquiryId = req.query.inquiryId;
  
  if(inquiryId){
	controllerMongoDB.getGeneralInquiry(inquiryId, function(err, inquiry){
	  res.render('../views/inquiry', { inquiry : inquiry });
	});  
  }
};

exports.inquiries = function(req, res, controllerMongoDB){
  var inquiryNumber = req.body.inquiryNumber;
  var email = req.body.email;
  var contactNumber = req.body.contactNumber;
  var text = req.body.text;
  
  controllerMongoDB.getGeneralInquiries(function(err, inquiries){
	res.render('../views/inquiries', { inquiries : inquiries });
  });  
};