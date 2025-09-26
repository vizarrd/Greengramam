import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Game from './pages/Game.jsx';
import DailyChallenge from './pages/DailyChallenge.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Profile from './pages/Profile.jsx';
import SignInSignUp from './pages/SignInSignUp.jsx';
import ProfileCreation from './pages/ProfileCreation.jsx';
import LocationApiDemo from './components/LocationApiDemo.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<SignInSignUp />} />
            <Route path="/location-test" element={<LocationApiDemo />} />
            
            {/* Protected routes */}
            <Route path="/profile-creation" element={
              <ProtectedRoute>
                <ProfileCreation />
              </ProtectedRoute>
            } />
            <Route path="/game" element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            } />
            <Route path="/daily-challenge" element={
              <ProtectedRoute>
                <DailyChallenge />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;