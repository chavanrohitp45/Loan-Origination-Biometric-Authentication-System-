import { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await axios.get('http://localhost:8000/api/loan-applications');
      setApplications(res.data);
    };
    fetchApplications();
  }, []);

  return (
    <div>
      <h2>Applications:</h2>
      <ul>
        {applications.map((app) => (
          <li key={app._id}>
            {app.applicant_name} - ₹{app.amount} - Status: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
