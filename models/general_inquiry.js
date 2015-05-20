var mongoose		= require('mongoose');

var general_inquirySchema = mongoose.Schema({
	name			: String,
	contactNumber	: String,
	email			: String,
	title			: String,
	content			: String,
	createOn		: { type: Date, default: Date.now, required: true }
});

module.exports = mongoose.model('general_inquiry', general_inquirySchema);