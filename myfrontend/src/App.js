import LoanForm from './components/LoanForm';
import ApplicationList from './components/ApplicationList';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div>
      <h1>Loan Origination Dashboard</h1>
      <LoanForm />
      <ApplicationList />
      <Register />
      <Login />
    </div>
  );
}

export default App;
