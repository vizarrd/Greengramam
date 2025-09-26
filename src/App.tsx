import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Game from './pages/Game';
import DailyChallenge from './pages/DailyChallenge';
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