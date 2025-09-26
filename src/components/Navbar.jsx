import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const { user, signOut } = useAuth();

  // Different navigation for authenticated vs non-authenticated users
  const publicNavigation = [
    { name: t('home'), href: '/', external: false },
  ];

  const authenticatedNavigation = [
    { name: t('home'), href: '/', external: false },
    { name: t('game'), href: 'https://green-gramam.vercel.app/', external: true },
    { name: t('dailyChallenge'), href: '/daily-challenge', external: false },
    { name: t('leaderboard'), href: '/leaderboard', external: false },
    { name: t('profile'), href: '/profile', external: false },
  ];

  const navigation = user ? authenticatedNavigation : publicNavigation;

  const isActive = (href) => location.pathname === href;

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ml" : "en";
    i18n.changeLanguage(newLang);
    // Store language preference in localStorage
    localStorage.setItem('preferred-language', newLang);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };
  return (
    <nav className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <span className="text-text font-bold">G</span>
              </div>
              <h1 className="text-white text-xl font-display font-semibold">{t('welcome')}</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navigation.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-green-100 hover:bg-green-700 hover:text-white"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-secondary text-white'
                        : 'text-green-100 hover:bg-green-700 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`w-16 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ml-4 ${
                  i18n.language === "ml" ? "bg-green-600" : "bg-gray-300"
                }`}
                title={i18n.language === "en" ? "Switch to Malayalam" : "Switch to English"}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs font-bold ${
                    i18n.language === "ml" ? "translate-x-8 text-green-600" : "translate-x-0 text-gray-600"
                  }`}
                >
                  {i18n.language === "en" ? "EN" : "à´®"}
                </div>
              </button>

              {/* Auth Buttons */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-green-100 hover:bg-red-600 hover:text-white ml-2"
                  title="Sign Out"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 bg-accent text-white hover:bg-accent-dark ml-2"
                  title="Sign In / Sign Up"
                >
                  {t('signIn')}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <div className="flex items-center space-x-2">
              {/* Mobile Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                  i18n.language === "ml" ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-xs font-bold ${
                    i18n.language === "ml" ? "translate-x-6 text-green-600" : "translate-x-0 text-gray-600"
                  }`}
                >
                  {i18n.language === "en" ? "EN" : "à´®"}
                </div>
              </button>
              
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-100 hover:text-white p-2"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-green-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-green-100 hover:bg-green-600 hover:text-white"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'bg-secondary text-white'
                      : 'text-green-100 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Mobile Auth Buttons */}
            {user ? (
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 text-green-100 hover:bg-red-600 hover:text-white"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 bg-accent text-white hover:bg-accent-dark"
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
