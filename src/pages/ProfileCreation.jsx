import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { createProfile } from '../utils/supabase';
import { 
  getStates, 
  getDistrictsByState, 
  getTaluksByDistrict,
  formatOptionsForDropdown
} from '../utils/locationApi.js';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';
import LanguageToggle from '../components/LanguageToggle';
import { UserIcon, MapPinIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const ProfileCreation = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedTaluk, setSelectedTaluk] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // API data states
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingTaluks, setLoadingTaluks] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Load states on component mount
  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true);
      try {
        const statesData = await getStates();
        setStates(statesData);
      } catch (error) {
        console.error('Error loading states:', error);
      } finally {
        setLoadingStates(false);
      }
    };

    loadStates();
  }, []);

  // Load districts when state changes
  useEffect(() => {
    if (selectedState) {
      const loadDistricts = async () => {
        setLoadingDistricts(true);
        setDistricts([]);
        setTaluks([]);
        setSelectedDistrict('');
        setSelectedTaluk('');

        try {
          const districtData = await getDistrictsByState(parseInt(selectedState));
          setDistricts(districtData);
        } catch (error) {
          console.error('Error loading districts:', error);
        } finally {
          setLoadingDistricts(false);
        }
      };

      loadDistricts();
    }
  }, [selectedState]);

  // Load taluks when district changes
  useEffect(() => {
    console.log('🏘️ District changed to:', selectedDistrict);
    if (selectedDistrict) {
      const loadTaluks = async () => {
        setLoadingTaluks(true);
        setTaluks([]);
        setSelectedTaluk('');

        try {
          console.log('📄 Loading taluks for district:', selectedDistrict);
          const talukData = await getTaluksByDistrict(parseInt(selectedDistrict));
          console.log('✅ Received taluk data:', talukData);
          setTaluks(talukData);
        } catch (error) {
          console.error('❌ Error loading taluks:', error);
        } finally {
          setLoadingTaluks(false);
        }
      };

      loadTaluks();
    } else {
      console.log('🚫 No district selected, clearing taluks');
      setTaluks([]);
      setSelectedTaluk('');
    }
  }, [selectedDistrict]);

  const genderOptions = [
    { value: 'male', label: t('male') },
    { value: 'female', label: t('female') },
    { value: 'other', label: t('other') },
    { value: 'prefer_not_to_say', label: t('preferNotToSay') },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('No authenticated user found. Please sign in again.');
      navigate('/auth');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Find the selected state, district, and taluk names
      const stateName = states.find(s => s.state_code.toString() === selectedState)?.state || '';
      const talukName = taluks.find(t => t.taluk_code.toString() === selectedTaluk)?.taluk || '';

      const profileData = {
        name: name.trim(),
        age: parseInt(age),
        taluk: talukName,
        gender: gender,
        state: stateName,
      };

      const { error: profileError } = await createProfile(user.id, profileData);
      
      if (profileError) {
        setError(profileError.message);
        return;
      }

      // Successfully created profile, redirect to home
      navigate('/');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Language Toggle - positioned at top right */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle variant="light" />
      </div>
      
      {/* Background farming illustration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🌾</div>
        <div className="absolute top-20 right-20 text-4xl">🌱</div>
        <div className="absolute bottom-20 left-20 text-5xl">🚜</div>
        <div className="absolute bottom-10 right-10 text-3xl">🌿</div>
        <div className="absolute top-1/2 left-1/4 text-2xl">🍃</div>
        <div className="absolute top-1/3 right-1/3 text-3xl">🌾</div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t('profileCreation')}</h1>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {t('completeProfile')}
          </h2>
          <p className="text-gray-600">
            {t('tellUsAboutYourself')}
          </p>
        </div>

        {/* Form Card */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label={t('name')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('name')}
              required
              icon={<UserIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('age')}
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t('age')}
              required
              icon={<IdentificationIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('gender')}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={genderOptions}
              required
              icon={<IdentificationIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('state')}
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              options={formatOptionsForDropdown(states, 'state_code', 'state')}
              required
              icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('district')}
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              options={formatOptionsForDropdown(districts, 'district_code', 'district')}
              placeholder={loadingDistricts ? t('loading') : t('selectDistrict')}
              required
              icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('taluk')}
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              options={formatOptionsForDropdown(taluks, 'taluk_code', 'taluk')}
              placeholder={loadingTaluks ? t('loading') : t('selectTaluk')}
              required
              icon={<MapPinIcon className="h-5 w-5 text-gray-400" />}
            />

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {t('loading')}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  {t('saveProfile')}
                </div>
              )}
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            This information helps us provide better farming insights for your region
          </p>
          {loadingStates && (
            <div className="mt-2 flex items-center justify-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
              Loading location data...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCreation;