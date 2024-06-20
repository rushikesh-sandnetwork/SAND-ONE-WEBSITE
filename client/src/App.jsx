import './App.css';
import LoginPage from './pages/globals/LoginPage/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/users/admin/pages/AdminLandingPage/AdminLandingPage';
import AdminCreateForms from './pages/users/admin/pages/AdminCreateForm/AdminCreateForms';
import MisLandingPage from './pages/users/mis/MisLandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/admin/generateForm" element={<AdminCreateForms />} />

        <Route path="/mis" element={<MisLandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
