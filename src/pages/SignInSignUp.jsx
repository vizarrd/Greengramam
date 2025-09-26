import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { signIn, signUp } from '../utils/supabase';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';
import LanguageToggle from '../components/LanguageToggle';
import { UserIcon, LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const SignInSignUp = () => {
  const { t } = useTranslation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Validate password confirmation
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        // Sign up new user
        const { data, error: authError } = await signUp(email, password);
        
        if (authError) {
          setError(authError.message);
          return;
        }

        if (data.user) {
          // Redirect to profile creation after successful signup
          navigate('/profile-creation');
        }
      } else {
        // Sign in existing user
        const { data, error: authError } = await signIn(email, password);
        
        if (authError) {
          setError(authError.message);
          return;
        }

        if (data.user) {
          // Redirect to intended destination or home after successful sign in
          navigate(from, { replace: true });
        }
      }
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
              <span className="text-white text-2xl">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Green Gramam</h1>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {isSignUp ? t('joinCommunity') : t('welcomeBack')}
          </h2>
          <p className="text-gray-600">
            {isSignUp 
              ? t('createAccountDesc')
              : t('signInToAccount')
            }
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              !isSignUp 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('signIn')}
          </button>
          <button
            onClick={() => {
              setIsSignUp(true);
              setError('');
              setPassword('');
              setConfirmPassword('');
            }}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
              isSignUp 
                ? 'bg-white text-primary shadow-sm' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {t('signUp')}
          </button>
        </div>

        {/* Form Card */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label={t('email')}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('email')}
              required
              icon={<EnvelopeIcon className="h-5 w-5 text-gray-400" />}
            />

            <InputField
              label={t('password')}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('password')}
              required
              icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
            />

            {isSignUp && (
              <InputField
                label={t('confirmPassword')}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirmPassword')}
                required
                icon={<LockClosedIcon className="h-5 w-5 text-gray-400" />}
              />
            )}

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
                  {isSignUp ? t('signUp') : t('signIn')}
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? t('alreadyHaveAccount') : t('dontHaveAccount')}{' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="text-primary hover:text-secondary font-medium"
              >
                {isSignUp ? t('signInHere') : t('signUpHere')}
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignInSignUp;