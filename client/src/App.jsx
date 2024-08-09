import './App.css';
import LoginPage from './pages/globals/LoginPage/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/users/admin/pages/AdminLandingPage/AdminLandingPage';
import AdminCreateForms from './pages/users/admin/pages/AdminCreateForm/AdminCreateForms';
import MisLandingPage from './pages/users/mis/MisLandingPage';
import AdminAssignCreatedForm from './pages/users/admin/pages/AdminAssignCreatedForm/AdminAssignCreatedForm';
import AdminFormViewData from './pages/users/admin/pages/AdminFormViewData/AdminFormViewData';
import AdminAcceptedData from './pages/users/admin/pages/AdminAcceptedData/AdminAcceptedData';
import AdminRejectedData from './pages/users/admin/pages/AdminRejectedData/AdminRejectedData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin/createNewForm/:campaignId" element={<AdminCreateForms />} />
        <Route path="/admin/createNestedForm/:campaignId" element={<AdminCreateForms />} />
        <Route path="/admin/viewFormData/:formId" element={<AdminFormViewData></AdminFormViewData>} />
        <Route path="/admin/assignForm/:formId" element={<AdminAssignCreatedForm />} />
        <Route path="/admin/acceptData/:formId" element={<AdminAcceptedData />} />
        <Route path="/admin/rejectData/:formId" element={<AdminRejectedData />} />
        <Route path="/admin/viewPromoters/:formId" element={<AdminAssignCreatedForm />} />
        <Route path="/mis" element={<MisLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
