import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import Modal from '../components/Modal';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    name: 'Ravi Kumar',
    age: 45,
    location: 'Thrissur, Kerala',
    farmSize: '2.5 acres',
    primaryCrops: ['Rice', 'Coconut', 'Spices'],
    experience: '15 years',
    avatar: '👨‍🌾',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [weather, setWeather] = useState({
    temperature: 28,
    humidity: 72,
    condition: 'Partly Cloudy',
    icon: '⛅',
  });

  const [recommendedCrops, setRecommendedCrops] = useState([
    { name: 'Organic Tomatoes', season: 'Winter', icon: '🍅', reason: 'High demand, good soil conditions' },
    { name: 'Turmeric', season: 'Post-monsoon', icon: '🌿', reason: 'Kerala specialty, medicinal value' },
    { name: 'Black Pepper', season: 'Year-round', icon: '🫘', reason: 'High export value, suitable climate' },
    { name: 'Cardamom', season: 'Year-round', icon: '🌱', reason: 'Premium spice, ideal for hills' },
  ]);

  const farmingPreferences = [
    { id: 1, label: 'Organic Farming', selected: true },
    { id: 2, label: 'Water Conservation', selected: true },
    { id: 3, label: 'Crop Rotation', selected: false },
    { id: 4, label: 'Integrated Pest Management', selected: true },
    { id: 5, label: 'Soil Testing', selected: false },
    { id: 6, label: 'Composting', selected: true },
  ];

  const achievements = [
    { title: 'Sustainability Champion', date: '2024-01-15', icon: '🏆' },
    { title: 'Water Conservation Expert', date: '2023-12-20', icon: '💧' },
    { title: 'Organic Farming Pioneer', date: '2023-11-10', icon: '🌱' },
    { title: 'Community Helper', date: '2023-10-05', icon: '🤝' },
  ];

  const personalStats = {
    totalXP: 2450,
    level: 12,
    cropsGrown: 147,
    sustainabilityScore: 89,
    daysActive: 245,
    badgesEarned: 15,
  };

  // Simulate getting user location and weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you'd call weather API here
          console.log('Location:', position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log('Location access denied:', error);
        }
      );
    }
  }, []);

  const handleProfileUpdate = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            Farmer Profile
          </h1>
          <p className="text-muted">Manage your farming journey and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display font-semibold text-xl">Basic Information</h2>
                <Button 
                  variant="accent" 
                  size="sm"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  ✏️ Edit Profile
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center md:text-left">
                  <div className="text-6xl mb-4 inline-block">{userProfile.avatar}</div>
                  <h3 className="font-display font-semibold text-xl mb-2">{userProfile.name}</h3>
                  <p className="text-muted">📍 {userProfile.location}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted">Age:</span>
                    <span className="font-medium">{userProfile.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Farm Size:</span>
                    <span className="font-medium">{userProfile.farmSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Experience:</span>
                    <span className="font-medium">{userProfile.experience}</span>
                  </div>
                  <div>
                    <span className="text-muted">Primary Crops:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userProfile.primaryCrops.map((crop, index) => (
                        <span key={index} className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Farming Preferences */}
            <Card>
              <h2 className="font-display font-semibold text-xl mb-6">Farming Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {farmingPreferences.map((preference) => (
                  <div 
                    key={preference.id}
                    className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                      preference.selected 
                        ? 'border-primary bg-green-50 text-primary' 
                        : 'border-gray-200 bg-gray-50 text-muted'
                    }`}
                  >
                    <div className="text-lg mb-1">
                      {preference.selected ? '✅' : '⚪'}
                    </div>
                    <p className="text-sm font-medium">{preference.label}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommended Crops */}
            <Card>
              <h2 className="font-display font-semibold text-xl mb-6">Recommended Crops</h2>
              <p className="text-muted mb-4">Based on your location, soil, and weather conditions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCrops.map((crop, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{crop.icon}</span>
                      <div>
                        <h3 className="font-medium">{crop.name}</h3>
                        <p className="text-sm text-muted mb-1">Best season: {crop.season}</p>
                        <p className="text-xs text-muted">{crop.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <h2 className="font-display font-semibold text-xl mb-6">Recent Achievements</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{achievement.icon}</span>
                      <div>
                        <p className="font-medium">{achievement.title}</p>
                        <p className="text-sm text-muted">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Stats */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{personalStats.totalXP}</p>
                  <p className="text-sm text-muted">Total XP</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-semibold text-secondary">{personalStats.level}</p>
                    <p className="text-xs text-muted">Level</p>
                  </div>
                  <div>
                    <p className="font-semibold text-accent">{personalStats.badgesEarned}</p>
                    <p className="text-xs text-muted">Badges</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-semibold">{personalStats.cropsGrown}</p>
                    <p className="text-xs text-muted">Crops Grown</p>
                  </div>
                  <div>
                    <p className="font-semibold">{personalStats.daysActive}</p>
                    <p className="text-xs text-muted">Days Active</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">{personalStats.sustainabilityScore}%</div>
                  <p className="text-xs text-muted">Sustainability Score</p>
                </div>
              </div>
            </Card>

            {/* Current Weather */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Local Weather</h3>
              <div className="text-center">
                <div className="text-4xl mb-2">{weather.icon}</div>
                <p className="font-medium text-lg">{weather.condition}</p>
                <p className="text-2xl font-bold text-primary mb-2">{weather.temperature}°C</p>
                <p className="text-sm text-muted">Humidity: {weather.humidity}%</p>
                <div className="mt-4 p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-700">Perfect weather for rice cultivation!</p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  📊 View Full Dashboard
                </Button>
                <Button variant="accent" className="w-full" size="sm">
                  🎮 Start Farming Game
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  🏆 Check Leaderboard
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Modal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Profile"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">Name</label>
              <input 
                type="text" 
                defaultValue={userProfile.name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Age</label>
              <input 
                type="number" 
                defaultValue={userProfile.age}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">Farm Size</label>
              <input 
                type="text" 
                defaultValue={userProfile.farmSize}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <Button onClick={() => handleProfileUpdate(userProfile)} className="flex-1">
                Save Changes
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;