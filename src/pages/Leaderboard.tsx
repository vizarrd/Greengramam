import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';

const Leaderboard = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('panchayat');

  const leaderboardData = {
    panchayat: [
      { rank: 1, name: 'Farmer Suresh', location: 'Thrissur', xp: 2850, sustainabilityScore: 95, avatar: '👨‍🌾' },
      { rank: 2, name: 'Maya Devi', location: 'Thrissur', xp: 2640, sustainabilityScore: 92, avatar: '👩‍🌾' },
      { rank: 3, name: 'Ravi Kumar', location: 'Thrissur', xp: 2450, sustainabilityScore: 89, avatar: '👨‍🌾' },
      { rank: 4, name: 'Priya Nair', location: 'Thrissur', xp: 2320, sustainabilityScore: 87, avatar: '👩‍🌾' },
      { rank: 5, name: 'Anjan Das', location: 'Thrissur', xp: 2180, sustainabilityScore: 85, avatar: '👨‍🌾' },
      { rank: 6, name: 'Lakshmi Menon', location: 'Thrissur', xp: 2050, sustainabilityScore: 82, avatar: '👩‍🌾' },
      { rank: 7, name: 'Krishnan Pillai', location: 'Thrissur', xp: 1920, sustainabilityScore: 80, avatar: '👨‍🌾' },
      { rank: 8, name: 'Radha Krishna', location: 'Thrissur', xp: 1850, sustainabilityScore: 78, avatar: '👩‍🌾' },
    ],
    district: [
      { rank: 1, name: 'Farmer Suresh', location: 'Thrissur', xp: 2850, sustainabilityScore: 95, avatar: '👨‍🌾' },
      { rank: 2, name: 'Vineeth George', location: 'Kochi', xp: 2780, sustainabilityScore: 94, avatar: '👨‍🌾' },
      { rank: 3, name: 'Anjali Kumari', location: 'Kannur', xp: 2720, sustainabilityScore: 93, avatar: '👩‍🌾' },
      { rank: 4, name: 'Maya Devi', location: 'Thrissur', xp: 2640, sustainabilityScore: 92, avatar: '👩‍🌾' },
    ],
    state: [
      { rank: 1, name: 'Vineeth George', location: 'Kochi', xp: 2850, sustainabilityScore: 96, avatar: '👨‍🌾' },
      { rank: 2, name: 'Farmer Suresh', location: 'Thrissur', xp: 2820, sustainabilityScore: 95, avatar: '👨‍🌾' },
      { rank: 3, name: 'Dr. Priya Menon', location: 'Wayanad', xp: 2780, sustainabilityScore: 94, avatar: '👩‍🌾' },
      { rank: 4, name: 'Rajesh Nair', location: 'Palakkad', xp: 2750, sustainabilityScore: 93, avatar: '👨‍🌾' },
    ],
  };

  const filters = [
    { key: 'panchayat', label: t('myPanchayat'), icon: '🏘️' },
    { key: 'district', label: t('districtLevel'), icon: '🏛️' },
    { key: 'state', label: t('kerala'), icon: '🌴' },
  ];

  const achievements = [
    { title: t('topSustainabilityScore'), description: t('achievedSustainability'), icon: '🌿' },
    { title: t('waterConservationChampion'), description: t('reducedWaterUsage'), icon: '💧' },
    { title: t('organicPioneer'), description: t('monthsWithoutChemicals'), icon: '🌱' },
    { title: t('communityMentor'), description: t('helpedFarmers'), icon: '👥' },
  ];

  const currentUser = { rank: 12, name: t('you'), xp: 1850, sustainabilityScore: 85 };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-muted';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            {t('leaderboardTitle')}
          </h1>
          <p className="text-muted">{t('leaderboardSubtitle')}</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedFilter === filter.key
                  ? 'bg-primary text-white'
                  : 'bg-surface text-text hover:bg-gray-100'
              }`}
            >
              <span>{filter.icon}</span>
              <span className="font-medium">{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-3">
            <Card>
              <h2 className="font-display font-semibold text-xl mb-6">
                {filters.find(f => f.key === selectedFilter)?.label} {t('rank')}
              </h2>
              
              <div className="space-y-4">
                {leaderboardData[selectedFilter as keyof typeof leaderboardData].map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                      player.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                        {getRankIcon(player.rank)}
                      </div>
                      <div className="text-3xl">{player.avatar}</div>
                      <div>
                        <h3 className="font-semibold text-text">{player.name}</h3>
                        <p className="text-sm text-muted">{player.location}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-sm text-muted">XP</p>
                          <p className="font-semibold text-primary">{player.xp.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted">Sustainability</p>
                          <p className="font-semibold text-secondary">{player.sustainabilityScore}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Current User Position */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-primary">#{currentUser.rank}</div>
                    <div className="text-3xl">👨‍🌾</div>
                    <div>
                      <h3 className="font-semibold text-text">{currentUser.name}</h3>
                      <p className="text-sm text-muted">{t('yourPosition')}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm text-muted">{t('xpPoints')}</p>
                        <p className="font-semibold text-primary">{currentUser.xp.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted">{t('sustainabilityScore')}</p>
                        <p className="font-semibold text-secondary">{currentUser.sustainabilityScore}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weekly Challenge */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Weekly Challenge</h3>
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-medium">Organic Week</p>
                <p className="text-sm text-muted mb-4">No chemical pesticides for 7 days</p>
                <div className="text-xs bg-accent text-text px-3 py-1 rounded-full inline-block">
                  2 days left
                </div>
              </div>
            </Card>

            {/* Top Achievements */}
            <Card>
              <h3 className="font-display font-semibold mb-4">{t('achievements')}</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 rounded-md hover:bg-gray-50">
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-muted">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Leaderboard Stats */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Total Farmers</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Active This Week</span>
                  <span className="font-semibold">892</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Average Score</span>
                  <span className="font-semibold">76%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted">Your Percentile</span>
                  <span className="font-semibold text-primary">Top 15%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;