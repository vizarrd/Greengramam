import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDataTranslations } from '../utils/dataTranslations';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { translateGender, translateState, translateTaluk } = useDataTranslations();
  
  const [profileData, setProfileData] = useState<{
    name: string;
    age: number;
    state: string;
    taluk: string;
    gender: string;
  } | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Dashboard data
  const userStats = {
    level: 12,
    xp: 1850,
    nextLevelXp: 2000,
    sustainabilityScore: 85,
    totalCropsGrown: 156,
    totalHarvested: 142,
    ecoFriendlyPractices: 23,
    carbonFootprintReduced: 2.4,
    auraPoints: parseInt(localStorage.getItem('auraPoints') || '0'),
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

  // Simple function to fetch profile directly from Supabase
  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('🔍 Fetching profile for user:', user.id);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError) {
        console.error('❌ Supabase error:', fetchError);
        if (fetchError.code === 'PGRST116') {
          // No profile found - user needs to complete profile creation
          setError('Profile not found. You need to complete your profile creation first.');
          return;
        }
        setError(`Failed to fetch profile: ${fetchError.message}`);
        return;
      }

      if (data) {
        console.log('✅ Profile found:', data);
        setProfileData(data);
      }
    } catch (err) {
      console.error('❌ Unexpected error:', err);
      setError('An unexpected error occurred while fetching your profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteProfile = () => {
    navigate('/profile-creation');
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌱</div>
          <p className="text-gray-600">{t('loading')}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-red-600 mb-6 max-w-md mx-auto">{error}</p>
            
            <div className="space-x-4">
              {error.includes('Profile not found') ? (
                <Button 
                  variant="primary" 
                  onClick={handleCompleteProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  🌱 {t('completeProfileCreation')}
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={fetchProfile}
                  className="bg-green-600 hover:bg-green-700"
                >
                  🔄 {t('tryAgain')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              It looks like you haven't completed your profile creation yet. Let's get you set up!
            </p>
            <Button 
              variant="primary" 
              onClick={handleCompleteProfile}
              className="bg-green-600 hover:bg-green-700"
            >
              🌱 Complete Profile Creation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-2">
            {t('welcomeFarmer').replace('Farmer', profileData.name)}! 👋
          </h1>
          <p className="text-muted">{t('trackYourJourney')}</p>
        </div>

        {/* User Overview */}
        <div className="grid grid-cols-1 mb-8">
          <Card className="max-w-md mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">
                  {profileData.gender === 'female' ? '👩‍🌾' : '👨‍🌾'}
                </span>
              </div>
              <h2 className="font-display font-semibold text-lg">{profileData.name}</h2>
              <p className="text-muted mb-2">Level {userStats.level} Farmer</p>
              <p className="text-sm text-gray-600 mb-4">
                📍 {translateTaluk(profileData.taluk)}, {translateState(profileData.state)}
              </p>
              <ProgressBar 
                progress={userStats.xp} 
                max={userStats.nextLevelXp} 
                label="XP Progress"
                color="primary"
              />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('age')}:</span>
                  <span className="font-medium">{profileData.age} {t('years')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('gender')}:</span>
                  <span className="font-medium">{translateGender(profileData.gender)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">✨ Aura Points:</span>
                  <span className="font-bold text-purple-600">{userStats.auraPoints}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Middle Section - Achievements and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sustainability Breakdown */}
          <Card>
            <h3 className="font-display font-semibold text-lg mb-4">{t('sustainabilityBreakdown')}</h3>
            <div className="space-y-3">
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
            <h3 className="font-display font-semibold text-lg mb-4">{t('recentAchievements')}</h3>
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-xs">{achievement.title}</p>
                    <p className="text-xs text-muted">{achievement.time}</p>
                  </div>
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    +{achievement.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-xl">📈</div>
                <p className="text-lg font-bold text-primary">+15</p>
                <p className="text-xs text-muted">{t('newCropsPlanted')}</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl">🎯</div>
                <p className="text-lg font-bold text-accent">7/10</p>
                <p className="text-xs text-muted">{t('monthlyChallenges')}</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-xl">🏆</div>
                <p className="text-lg font-bold text-secondary">#12</p>
                <p className="text-xs text-muted">{t('inYourPanchayat')}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Badges & Achievements */}
        <Card>
          <h3 className="font-display font-semibold text-xl mb-6">{t('badgesAchievements')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id} 
                className={`text-center p-3 rounded-lg border-2 transition-all duration-200 ${
                  badge.earned 
                    ? 'border-primary bg-green-50 hover:bg-green-100' 
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <h4 className="font-medium text-xs mb-1">{badge.name}</h4>
                <p className="text-xs text-muted mb-2">{badge.description}</p>
                {badge.earned && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    ✓ {t('earned')}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;