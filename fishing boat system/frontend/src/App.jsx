
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources'; 
import Alerts from './pages/Alerts';  
import Market from './pages/Market'; 
import Profile from './pages/Profile'; 
import Settings from './pages/Settings';
import LoginPage from './pages/login';
import SignupPage from './pages/Signup';

const App = () => {
    return (
        <Router>
            

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/market" element={<Market />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
               
            </Routes>
        </Router>
    );
};

export default App;
