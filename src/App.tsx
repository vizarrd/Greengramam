import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import SignInSignUp from './pages/SignInSignUp';
import ProfileCreation from './pages/ProfileCreation';
import LocationApiDemo from './components/LocationApiDemo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<SignInSignUp />} />
            <Route path="/profile-creation" element={<ProfileCreation />} />
            <Route path="/location-test" element={<LocationApiDemo />} />
            
            {/* Protected routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;