import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Navbar from './Pages/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Login'
import Login from './Pages/Login';
import ProtectedRoute from './user-routes/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;