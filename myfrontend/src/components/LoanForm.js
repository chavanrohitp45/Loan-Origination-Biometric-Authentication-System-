import { useState } from 'react';
import axios from 'axios';

const LoanForm = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    amount: '',
    credit_score: '',
    income: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/loan-applications', formData);
      setResponseMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message);
      } else {
        setResponseMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="applicant_name" placeholder="Applicant Name" onChange={handleChange} />
        <input name="amount" placeholder="Loan Amount" onChange={handleChange} />
        <input name="credit_score" placeholder="Credit Score" onChange={handleChange} />
        <input name="income" placeholder="Income" onChange={handleChange} />
        <button type="submit">Submit Application</button>
      </form>

      {responseMessage && (
        <p><strong>Result:</strong> {responseMessage}</p>
      )}
    </div>
  );
};

export default LoanForm;
