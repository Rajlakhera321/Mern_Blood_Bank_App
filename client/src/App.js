import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import { PublicRoute } from './components/Routes/PublicRoute';
import Donar from "../src/pages/dashboard/Donar";
import Hospital from './pages/dashboard/Hospital';
import Organisation from './pages/dashboard/Organisation';
import Consumer from './pages/dashboard/Consumer';
import Donations from './pages/Donations';
import Analytics from './pages/dashboard/Analytics';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />
        <Route path='/donar' element={
          <ProtectedRoute>
            <Donar />
          </ProtectedRoute>
        } />
        <Route path='/hospital' element={
          <ProtectedRoute>
            <Hospital />
          </ProtectedRoute>
        } />
        <Route path='/organisation' element={
          <ProtectedRoute>
            <Organisation />
          </ProtectedRoute>
        } />
        <Route path='/consumer' element={
          <ProtectedRoute>
            <Consumer />
          </ProtectedRoute>
        } />
        <Route path='/donation' element={
          <ProtectedRoute>
            <Donations />
          </ProtectedRoute>
        } />
        <Route path='/analytics' element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
}

export default App;
