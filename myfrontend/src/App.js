import LoanForm from './components/LoanForm';
import ApplicationList from './components/ApplicationList';
import Login from './components/Login';

function App() {
  return (
    <div>
      <h1>Loan Origination Dashboard</h1>
      <LoanForm />
      <ApplicationList />
      <Login />
    </div>
  );
}

export default App;
