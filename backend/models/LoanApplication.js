const mongoose = require('mongoose')

const LoanApplicationSchema = new mongoose.Schema({
    applicant_name: String,
    amount: Number,
    credit_score: Number,
    income: Number,
    status: {type: String, default: 'Pending'}
});


module.exports = mongoose.model('LoanApplication', LoanApplicationSchema);