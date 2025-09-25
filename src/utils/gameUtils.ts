// Game utility functions and constants

export interface Crop {
  id: number;
  name: string;
  icon: string;
  cost: number;
  growthTime: number; // in seconds
  harvestValue: number;
  xpReward: number;
  sustainabilityScore: number;
  waterRequirement: 'low' | 'medium' | 'high';
  season: string;
}

export interface GameTile {
  id: number;
  x: number;
  y: number;
  crop?: Crop;
  plantedAt?: Date;
  stage: 'empty' | 'planted' | 'growing' | 'ready' | 'harvested';
  soilQuality: number; // 1-100
  waterLevel: number; // 1-100
}

export interface PlayerStats {
  level: number;
  xp: number;
  coins: number;
  energy: number;
  maxEnergy: number;
  sustainabilityScore: number;
}

// Available crops in the game
export const GAME_CROPS: Crop[] = [
  {
    id: 1,
    name: 'Rice',
    icon: '🌾',
    cost: 20,
    growthTime: 300, // 5 minutes in real time
    harvestValue: 35,
    xpReward: 15,
    sustainabilityScore: 8,
    waterRequirement: 'high',
    season: 'Monsoon'
  },
  {
    id: 2,
    name: 'Coconut',
    icon: '🥥',
    cost: 100,
    growthTime: 1200, // 20 minutes
    harvestValue: 200,
    xpReward: 50,
    sustainabilityScore: 9,
    waterRequirement: 'medium',
    season: 'Year-round'
  },
  {
    id: 3,
    name: 'Spices',
    icon: '🌶️',
    cost: 50,
    growthTime: 600, // 10 minutes
    harvestValue: 80,
    xpReward: 25,
    sustainabilityScore: 10,
    waterRequirement: 'low',
    season: 'Post-monsoon'
  },
  {
    id: 4,
    name: 'Banana',
    icon: '🍌',
    cost: 30,
    growthTime: 450, // 7.5 minutes
    harvestValue: 50,
    xpReward: 20,
    sustainabilityScore: 7,
    waterRequirement: 'medium',
    season: 'Year-round'
  },
  {
    id: 5,
    name: 'Turmeric',
    icon: '🌿',
    cost: 40,
    growthTime: 720, // 12 minutes
    harvestValue: 70,
    xpReward: 30,
    sustainabilityScore: 9,
    waterRequirement: 'medium',
    season: 'Post-monsoon'
  },
  {
    id: 6,
    name: 'Black Pepper',
    icon: '🫘',
    cost: 80,
    growthTime: 900, // 15 minutes
    harvestValue: 150,
    xpReward: 40,
    sustainabilityScore: 8,
    waterRequirement: 'medium',
    season: 'Year-round'
  }
];

// Calculate crop growth progress
export const getCropGrowthProgress = (tile: GameTile): number => {
  if (!tile.crop || !tile.plantedAt) return 0;
  
  const now = new Date();
  const timePassed = (now.getTime() - tile.plantedAt.getTime()) / 1000; // seconds
  const progress = Math.min(timePassed / tile.crop.growthTime, 1);
  
  return Math.round(progress * 100);
};

// Determine crop growth stage
export const getCropStage = (tile: GameTile): GameTile['stage'] => {
  if (!tile.crop || !tile.plantedAt) return 'empty';
  
  const progress = getCropGrowthProgress(tile);
  
  if (progress === 0) return 'planted';
  if (progress < 100) return 'growing';
  return 'ready';
};

// Calculate harvest rewards
export const calculateHarvestRewards = (tile: GameTile, playerStats: PlayerStats) => {
  if (!tile.crop) return { coins: 0, xp: 0, sustainabilityBonus: 0 };
  
  let coinMultiplier = 1;
  let xpMultiplier = 1;
  
  // Bonus for soil quality
  if (tile.soilQuality > 80) {
    coinMultiplier += 0.2;
    xpMultiplier += 0.1;
  }
  
  // Bonus for proper watering
  if (tile.waterLevel > 60 && tile.waterLevel < 90) {
    coinMultiplier += 0.15;
    xpMultiplier += 0.1;
  }
  
  // Level-based multiplier
  const levelMultiplier = 1 + (playerStats.level - 1) * 0.05;
  
  const coins = Math.round(tile.crop.harvestValue * coinMultiplier * levelMultiplier);
  const xp = Math.round(tile.crop.xpReward * xpMultiplier);
  const sustainabilityBonus = tile.crop.sustainabilityScore;
  
  return { coins, xp, sustainabilityBonus };
};

// Generate random weather events
export const generateWeatherEvent = () => {
  const events = [
    { type: 'sunny', effect: 'Growth speed +20%', icon: '☀️', positive: true },
    { type: 'rain', effect: 'Water levels restored', icon: '🌧️', positive: true },
    { type: 'drought', effect: 'Water consumption +50%', icon: '🌵', positive: false },
    { type: 'storm', effect: 'Some crops may be damaged', icon: '⛈️', positive: false },
    { type: 'perfect', effect: 'Ideal conditions for all crops', icon: '🌈', positive: true },
  ];
  
  return events[Math.floor(Math.random() * events.length)];
};

// Calculate level requirements
export const calculateLevelRequirement = (level: number): number => {
  return Math.floor(100 * Math.pow(1.5, level - 1));
};

// Check if player can level up
export const checkLevelUp = (currentXP: number, currentLevel: number): boolean => {
  const requiredXP = calculateLevelRequirement(currentLevel + 1);
  return currentXP >= requiredXP;
};

// Get next level XP requirement
export const getNextLevelXP = (currentLevel: number): number => {
  return calculateLevelRequirement(currentLevel + 1);
};

// Generate daily challenges
export const generateDailyChallenges = () => {
  const challenges = [
    { id: 1, title: 'Plant 5 crops', target: 5, reward: { coins: 100, xp: 50 }, type: 'plant' },
    { id: 2, title: 'Harvest 3 crops', target: 3, reward: { coins: 150, xp: 75 }, type: 'harvest' },
    { id: 3, title: 'Water plants 10 times', target: 10, reward: { coins: 50, xp: 25 }, type: 'water' },
    { id: 4, title: 'Earn 500 coins', target: 500, reward: { coins: 100, xp: 100 }, type: 'coins' },
    { id: 5, title: 'Use organic fertilizer', target: 1, reward: { coins: 200, xp: 150 }, type: 'organic' },
  ];
  
  // Return 3 random challenges
  return challenges.sort(() => 0.5 - Math.random()).slice(0, 3);
};

// Sustainability scoring system
export const calculateSustainabilityScore = (actions: any) => {
  let score = 0;
  
  // Organic farming practices
  if (actions.organicFertilizer) score += 20;
  if (actions.noPesticides) score += 15;
  if (actions.composting) score += 10;
  
  // Water conservation
  if (actions.dripIrrigation) score += 15;
  if (actions.rainwaterHarvesting) score += 10;
  if (actions.mulching) score += 8;
  
  // Soil health
  if (actions.cropRotation) score += 12;
  if (actions.coverCrops) score += 10;
  if (actions.soilTesting) score += 5;
  
  // Biodiversity
  if (actions.diverseCrops) score += 8;
  if (actions.pollinatorFriendly) score += 7;
  
  return Math.min(score, 100); // Cap at 100%
};

// Game constants
export const GAME_CONFIG = {
  GRID_SIZE: { width: 8, height: 6 },
  INITIAL_ENERGY: 100,
  ENERGY_REGEN_RATE: 1, // per minute
  WATER_CONSUMPTION_RATE: 5, // per hour
  SOIL_DEGRADATION_RATE: 2, // per day
  MAX_TILES_PER_LEVEL: 48,
  ENERGY_COSTS: {
    plant: 5,
    water: 2,
    harvest: 3,
    fertilize: 4,
  }
};