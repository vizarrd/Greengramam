import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const features = [
    {
      title: t('sustainablePractices'),
      description: t('sustainablePracticesDesc'),
      icon: '🌱',
    },
    {
      title: t('trackProgress'),
      description: t('trackProgressDesc'),
      icon: '📊',
    },
    {
      title: t('earnRewards'),
      description: t('earnRewardsDesc'),
      icon: '🏆',
    },
    {
      title: t('communityLearning'),
      description: t('communityLearningDesc'),
      icon: '👥',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              {t('startYourJourney')}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              {t('learnSustainable')}
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              {user ? (
                <a href="https://green-gramam.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full sm:w-auto animate-gentle-bounce">
                    🚀 {t('startFarming')}
                  </Button>
                </a>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto animate-gentle-bounce">
                    🚀 {t('startFarming')}
                  </Button>
                </Link>
              )}
              {user ? (
                <Link to="/daily-challenge">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    🧠 {t('startDailyChallenge')}
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    🔐 {t('signInForQuiz')}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" className="w-full h-16 text-background fill-current">
            <path d="M0,120L48,105C96,90,192,60,288,45C384,30,480,30,576,40C672,50,768,70,864,80C960,90,1056,90,1152,85L1200,80L1200,120L1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              {t('whyChoose')}
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              {t('experienceFuture')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:animate-grow">{feature.icon}</div>
                <h3 className="text-xl font-display font-semibold text-text mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-secondary to-accent">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          {user ? (
            <>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                {t('welcomeBackFarmer')}
              </h2>
              <p className="text-lg text-white opacity-90 mb-8">
                {t('continueJourney')}
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link to="/profile">
                  <Button variant="primary" size="lg">
                    👤 {t('viewProfile')}
                  </Button>
                </Link>
                <Link to="/daily-challenge">
                  <Button variant="secondary" size="lg">
                    🧠 {t('takeChallenge')}
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                {t('readyToTransform')}
              </h2>
              <p className="text-lg text-white opacity-90 mb-8">
                {t('joinThousands')}
              </p>
              <Link to="/auth">
                <Button variant="primary" size="lg">
                  🌾 {t('getStarted')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;