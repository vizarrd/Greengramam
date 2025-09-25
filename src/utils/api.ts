// API utility functions for external integrations

// Weather API functions
export const getWeatherData = async (lat: number, lon: number) => {
  try {
    // In production, use your OpenWeatherMap API key
    const API_KEY = 'your_openweather_api_key';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: getWeatherIcon(data.weather[0].main),
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data as fallback
    return {
      temperature: 28,
      humidity: 72,
      condition: 'Partly Cloudy',
      description: 'partly cloudy',
      icon: '⛅',
    };
  }
};

// Get weather icon based on condition
const getWeatherIcon = (condition: string): string => {
  const iconMap: { [key: string]: string } = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
  };
  
  return iconMap[condition] || '⛅';
};

// Geolocation functions
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
};

// Soil data simulation (replace with real API)
export const getSoilData = async (lat: number, lon: number) => {
  try {
    // Mock soil data - in production, integrate with soil data APIs
    return {
      ph: 6.5 + Math.random() * 2, // pH between 6.5-8.5
      nitrogen: Math.floor(Math.random() * 100), // N percentage
      phosphorus: Math.floor(Math.random() * 100), // P percentage
      potassium: Math.floor(Math.random() * 100), // K percentage
      organicMatter: Math.floor(Math.random() * 10), // Organic matter percentage
      soilType: ['Clay', 'Sandy', 'Loamy', 'Silty'][Math.floor(Math.random() * 4)],
    };
  } catch (error) {
    console.error('Error fetching soil data:', error);
    return null;
  }
};

// Gemini API integration for crop suggestions (mock implementation)
export const getCropSuggestions = async (userProfile: any, weather: any, soil: any) => {
  try {
    // In production, integrate with Gemini API
    // const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${your_gemini_api_key}`
    //   },
    //   body: JSON.stringify({
    //     contents: [{
    //       parts: [{
    //         text: `Based on the following farmer profile and conditions, suggest suitable crops:
    //                Location: ${userProfile.location}
    //                Farm Size: ${userProfile.farmSize}
    //                Experience: ${userProfile.experience}
    //                Weather: ${weather.condition}, ${weather.temperature}°C
    //                Soil Type: ${soil?.soilType}
    //                Soil pH: ${soil?.ph}
    //                
    //                Please provide 4-6 crop suggestions with reasons.`
    //       }]
    //     }]
    //   })
    // });
    
    // Mock crop suggestions
    const keralaCrops = [
      { name: 'Rice', season: 'Monsoon', icon: '🌾', reason: 'Staple crop, suitable for Kerala climate' },
      { name: 'Coconut', season: 'Year-round', icon: '🥥', reason: 'Traditional Kerala crop, high economic value' },
      { name: 'Rubber', season: 'Year-round', icon: '🌳', reason: 'High demand, suitable for hilly areas' },
      { name: 'Spices (Cardamom)', season: 'Post-monsoon', icon: '🌿', reason: 'High export value, specialty of Kerala' },
      { name: 'Black Pepper', season: 'Year-round', icon: '🫘', reason: 'King of spices, ideal for Kerala' },
      { name: 'Banana', season: 'Year-round', icon: '🍌', reason: 'Quick growing, good market demand' },
    ];
    
    return keralaCrops.slice(0, 4);
  } catch (error) {
    console.error('Error getting crop suggestions:', error);
    return [];
  }
};

// Location-based crop database
export const getLocationBasedCrops = (location: string) => {
  const cropDatabase: { [key: string]: any[] } = {
    'Kerala': [
      { name: 'Rice', season: 'Kharif', suitability: 95 },
      { name: 'Coconut', season: 'Perennial', suitability: 98 },
      { name: 'Rubber', season: 'Perennial', suitability: 90 },
      { name: 'Cardamom', season: 'Post-monsoon', suitability: 85 },
      { name: 'Black Pepper', season: 'Monsoon', suitability: 92 },
      { name: 'Ginger', season: 'Pre-monsoon', suitability: 88 },
      { name: 'Turmeric', season: 'Post-monsoon', suitability: 87 },
      { name: 'Banana', season: 'Year-round', suitability: 93 },
    ]
  };
  
  return cropDatabase[location] || cropDatabase['Kerala'];
};