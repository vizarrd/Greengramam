import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  variant?: 'dark' | 'light';
}

const LanguageToggle = ({ variant = 'dark' }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === 'ml' ? 'en' : 'ml';
    i18n.changeLanguage(newLanguage);
    // Store language preference in localStorage
    localStorage.setItem('preferred-language', newLanguage);
  };

  const isDark = variant === 'dark';
  const isMLActive = i18n.language === 'ml';
  
  return (
    <div className="relative">
      <button
        onClick={toggleLanguage}
        className={`relative flex items-center w-20 h-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
          isDark 
            ? 'bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30' 
            : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
        }`}
        title={isMLActive ? 'Switch to English' : 'മലയാളത്തിലേക്ക് മാറുക'}
      >
        {/* Sliding indicator with text inside */}
        <div
          className={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 top-1 flex items-center justify-center ${
            isMLActive ? 'translate-x-1' : 'translate-x-11'
          }`}
        >
          <span className="text-xs font-bold text-gray-700">
            {isMLActive ? 'മ' : 'EN'}
          </span>
        </div>
        
        {/* Static background labels - positioned to show when not active */}
        <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
          <span 
            className={`text-xs font-semibold transition-opacity duration-300 ${
              isMLActive 
                ? 'opacity-0' 
                : (isDark ? 'text-white/80' : 'text-white/90')
            }`}
          >
            മ
          </span>
          <span 
            className={`text-xs font-semibold transition-opacity duration-300 ${
              !isMLActive 
                ? 'opacity-0' 
                : (isDark ? 'text-white/80' : 'text-white/90')
            }`}
          >
            EN
          </span>
        </div>
      </button>
    </div>
  );
};

export default LanguageToggle;