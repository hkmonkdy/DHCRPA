var mongoose		= require('mongoose');

var applicationSchema = mongoose.Schema({
	statusId		: { type: Number, required: true},
	createOn		: { type: Date, default: Date.now, required: true },
	updateOn		: { type: Date, default: Date.now, required: true },
	employer		: mongoose.Schema.Types.Mixed,
	domesticHelper	: mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('application', applicationSchema);