import './App.css';
import LoginPage from './pages/globals/LoginPage/LoginPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './pages/users/admin/pages/AdminLandingPage/AdminLandingPage';
import AdminCreateForms from './pages/users/admin/pages/AdminCreateForm/AdminCreateForms';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLandingPage />} />
        <Route path="/createNewForm" element={<AdminCreateForms />} />
      </Routes>
    </Router>
  );
}

export default App;
