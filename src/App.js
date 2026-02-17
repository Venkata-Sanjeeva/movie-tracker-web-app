import './App.css'; // Add this at the very top
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { AuthPage } from './components/Auth';
import Dashboard from './components/Dashboard';
import AddMovie from './components/AddMovie';


function App() {
  return (
    <div className="min-vh-100 bg-black text-white">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage isLogin={true} />} />
          <Route path="/register" element={<AuthPage isLogin={false} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddMovie />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;