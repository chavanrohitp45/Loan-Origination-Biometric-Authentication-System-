const LoanApplication = require('../models/LoanApplication');

function calculateLoanAmt(income){
    if(income <= 300000){
        return income * 1.5;
    }else if(income <= 700000){
        return income * 3;
    }else if(income <= 1200000){
        return income * 5;
    }else{
        return income * 6;
    }
}

exports.submitApplication = async(req, res) => {
    try{
        const {applicant_name, amount, credit_score, income} = req.body;

        const approvedAmount = calculateLoanAmt(income);

        const status = credit_score >= 650 ? 'Eligible' : 'Pending';

        if(amount > approvedAmount){
            return res.status(400).json({ message: 'Loan request exceeds eligible amount. Loan not approved.', approvedAmount });
        }

        const application = new LoanApplication({
            applicant_name,
            amount : amount,
            credit_score,
            income,
            status
        });

        await application.save();
        res.json({message : 'Application processed', approvedAmount, application})
    } catch (err){
        res.status(500).json({ error: err.message });
    }

    console.log("Application submitted");
};

exports.getApplication = async(req, res) => {
    const apps = await LoanApplication.find();
    res.json(apps);
};