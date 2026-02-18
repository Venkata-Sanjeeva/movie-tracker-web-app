import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthPage } from './components/Auth';
import Dashboard from './components/Dashboard';
import AddMovie from './components/AddMovie';
import NotFound from './components/NotFound';

import ProtectedRoute from './components/ProtectedRoute';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
    return (
        <div className="min-vh-100 bg-black text-white">
            <Router>
                <Navbar />
                <Routes>

                    <Route path="/" element={<Home />} />

                    {/* Public Routes */}
                    <Route path="/login" element={ <AuthPage isLogin={true} /> } />
                    <Route path="/register" element={ <AuthPage isLogin={false} /> }/>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />

                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
                    <Route path="/add" element={<ProtectedRoute><AddMovie /></ProtectedRoute>}/>

                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
