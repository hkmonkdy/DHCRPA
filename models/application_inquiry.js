var mongoose		= require('mongoose');

var application_inquirySchema = mongoose.Schema({
	queryInformation			: mongoose.Schema.Types.Mixed,
	createOn					: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('application_inquiry', application_inquirySchema);