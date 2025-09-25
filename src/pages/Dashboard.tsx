import React from 'react';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';

const Dashboard = () => {
  const userStats = {
    name: 'Farmer Ravi',
    level: 12,
    xp: 1850,
    nextLevelXp: 2000,
    sustainabilityScore: 85,
    totalCropsGrown: 156,
    totalHarvested: 142,
    ecoFriendlyPractices: 23,
    carbonFootprintReduced: 2.4,
  };

  const badges = [
    { id: 1, name: 'Green Thumb', description: 'Planted 50+ crops', icon: '🌱', earned: true },
    { id: 2, name: 'Water Saver', description: 'Used drip irrigation', icon: '💧', earned: true },
    { id: 3, name: 'Organic Master', description: 'No chemical pesticides for 30 days', icon: '🌿', earned: false },
    { id: 4, name: 'Harvest Hero', description: 'Harvested 100+ crops', icon: '🌾', earned: true },
    { id: 5, name: 'Eco Warrior', description: 'Sustainability score 90+', icon: '🛡️', earned: false },
    { id: 6, name: 'Community Leader', description: 'Top 10 in leaderboard', icon: '👑', earned: false },
  ];

  const recentAchievements = [
    { id: 1, title: 'Completed mulching practice', time: '2 hours ago', xp: 25 },
    { id: 2, title: 'Harvested organic tomatoes', time: '1 day ago', xp: 15 },
    { id: 3, title: 'Switched to bio-pesticides', time: '3 days ago', xp: 50 },
    { id: 4, title: 'Installed rainwater harvesting', time: '1 week ago', xp: 100 },
  ];

  const sustainabilityBreakdown = [
    { practice: 'Organic Farming', score: 90, color: 'primary' as const },
    { practice: 'Water Conservation', score: 85, color: 'sky' as const },
    { practice: 'Soil Health', score: 80, color: 'accent' as const },
    { practice: 'Biodiversity', score: 88, color: 'primary' as const },
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            Farmer Dashboard
          </h1>
          <p className="text-muted">Track your sustainable farming journey</p>
        </div>

        {/* User Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🌾</span>
              </div>
              <h2 className="font-display font-semibold text-lg">{userStats.name}</h2>
              <p className="text-muted mb-4">Level {userStats.level} Farmer</p>
              <ProgressBar 
                progress={userStats.xp} 
                max={userStats.nextLevelXp} 
                label="XP Progress"
                color="primary"
              />
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🌿</div>
              <h3 className="font-display font-semibold text-2xl text-primary">
                {userStats.sustainabilityScore}%
              </h3>
              <p className="text-sm text-muted">Sustainability Score</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🌾</div>
              <h3 className="font-display font-semibold text-2xl text-secondary">
                {userStats.totalHarvested}
              </h3>
              <p className="text-sm text-muted">Crops Harvested</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="text-3xl mb-2">🌱</div>
              <h3 className="font-display font-semibold text-2xl text-accent">
                {userStats.carbonFootprintReduced}kg
              </h3>
              <p className="text-sm text-muted">CO₂ Reduced</p>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sustainability Breakdown */}
          <Card>
            <h3 className="font-display font-semibold text-xl mb-6">Sustainability Breakdown</h3>
            <div className="space-y-4">
              {sustainabilityBreakdown.map((item, index) => (
                <div key={index}>
                  <ProgressBar 
                    progress={item.score} 
                    max={100} 
                    label={item.practice}
                    color={item.color}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <h3 className="font-display font-semibold text-xl mb-6">Recent Achievements</h3>
            <div className="space-y-4">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-muted">{achievement.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      +{achievement.xp} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Badges & Rewards */}
        <Card className="mt-8">
          <h3 className="font-display font-semibold text-xl mb-6">Badges & Achievements</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`text-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  badge.earned 
                    ? 'border-primary bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <h4 className="font-medium text-sm mb-1">{badge.name}</h4>
                <p className="text-xs text-muted">{badge.description}</p>
                {badge.earned && (
                  <div className="mt-2">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      ✓ Earned
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-display font-semibold">This Week</h4>
            <p className="text-2xl font-bold text-primary">+15</p>
            <p className="text-sm text-muted">New crops planted</p>
          </Card>

          <Card className="text-center">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-display font-semibold">Challenge Progress</h4>
            <p className="text-2xl font-bold text-accent">7/10</p>
            <p className="text-sm text-muted">Monthly challenges</p>
          </Card>

          <Card className="text-center">
            <div className="text-2xl mb-2">🏆</div>
            <h4 className="font-display font-semibold">Ranking</h4>
            <p className="text-2xl font-bold text-secondary">#12</p>
            <p className="text-sm text-muted">In your panchayat</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;