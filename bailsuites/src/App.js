import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './Pages/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import Login from './Pages/Login';
import ProtectedRoute from './user-routes/PrivateRoute';
import Register from './Pages/Register';
import TopNav from './Pages/TopNav';
import LawyerDashboard from './Pages/Lawyer/Home';
import CreateApplication from './Pages/Applicant/CreateApplication'

function App() {
  return (
    <>
      <Navbar />
      <TopNav />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-application" element={<CreateApplication />} />
        <Route path="/lawyer-dashboard" element={<LawyerDashboard />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;