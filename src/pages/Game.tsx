import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameInstance, setGameInstance] = useState<any>(null);
  const [selectedTile, setSelectedTile] = useState<any>(null);
  const [playerStats, setPlayerStats] = useState({
    coins: 250,
    xp: 120,
    level: 3,
    energy: 85,
    maxEnergy: 100,
  });
  const [isPlantModalOpen, setIsPlantModalOpen] = useState(false);
  const [crops, setCrops] = useState([
    { id: 1, name: 'Rice', cost: 20, time: 300, icon: '🌾', xp: 15 },
    { id: 2, name: 'Coconut', cost: 100, time: 1200, icon: '🥥', xp: 50 },
    { id: 3, name: 'Spices', cost: 50, time: 600, icon: '🌶️', xp: 25 },
    { id: 4, name: 'Banana', cost: 30, time: 450, icon: '🍌', xp: 20 },
  ]);

  useEffect(() => {
    // Initialize Phaser.js game
    if (typeof window !== 'undefined' && gameRef.current) {
      initializeGame();
    }

    return () => {
      if (gameInstance) {
        gameInstance.destroy(true);
      }
    };
  }, []);

  const initializeGame = () => {
    if (!window.Phaser) {
      // Fallback to manual grid for now
      createManualGrid();
      return;
    }

    const config = {
      type: window.Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current,
      backgroundColor: '#F9FAF5',
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new window.Phaser.Game(config);
    setGameInstance(game);
  };

  const createManualGrid = () => {
    if (!gameRef.current) return;

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-6 gap-2 p-4 bg-gradient-to-br from-green-200 to-green-300 rounded-lg';
    gridContainer.style.width = '100%';
    gridContainer.style.maxWidth = '600px';
    gridContainer.style.height = '400px';

    for (let i = 0; i < 24; i++) {
      const tile = document.createElement('div');
      tile.className = 'aspect-square bg-earth rounded-md cursor-pointer transition-all duration-200 hover:bg-earth/80 flex items-center justify-center text-2xl';
      tile.dataset.tileId = i.toString();
      
      // Add some random elements
      if (Math.random() > 0.7) {
        tile.innerHTML = ['🌱', '🌿', '🌾'][Math.floor(Math.random() * 3)];
        tile.dataset.planted = 'true';
      }

      tile.addEventListener('click', () => handleTileClick(i, tile));
      gridContainer.appendChild(tile);
    }

    if (gameRef.current) {
      gameRef.current.appendChild(gridContainer);
    }
  };

  const preload = function(this: any) {
    // In a real implementation, load sprites here
  };

  const create = function(this: any) {
    // Create isometric grid
    const tileWidth = 64;
    const tileHeight = 32;
    
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 10; col++) {
        const x = (col - row) * (tileWidth / 2) + 400;
        const y = (col + row) * (tileHeight / 2) + 100;
        
        const tile = this.add.rectangle(x, y, tileWidth, tileHeight, 0x795548);
        tile.setStrokeStyle(2, 0x5D4037);
        tile.setInteractive();
        tile.setData('row', row);
        tile.setData('col', col);
        
        tile.on('pointerdown', () => {
          setSelectedTile({ row, col, x, y });
          setIsPlantModalOpen(true);
        });
      }
    }
  };

  const update = function(this: any) {
    // Game update loop
  };

  const handleTileClick = (tileId: number, tileElement: HTMLElement) => {
    if (tileElement.dataset.planted === 'true') {
      // Harvest logic
      const harvestReward = Math.floor(Math.random() * 50) + 20;
      setPlayerStats(prev => ({
        ...prev,
        coins: prev.coins + harvestReward,
        xp: prev.xp + 10,
      }));
      tileElement.innerHTML = '';
      tileElement.dataset.planted = 'false';
      tileElement.className = tileElement.className.replace('bg-green-400', 'bg-earth');
    } else {
      setSelectedTile({ id: tileId, element: tileElement });
      setIsPlantModalOpen(true);
    }
  };

  const handlePlantCrop = (crop: any) => {
    if (selectedTile && playerStats.coins >= crop.cost) {
      setPlayerStats(prev => ({
        ...prev,
        coins: prev.coins - crop.cost,
        xp: prev.xp + crop.xp,
      }));

      if (selectedTile.element) {
        selectedTile.element.innerHTML = crop.icon;
        selectedTile.element.dataset.planted = 'true';
        selectedTile.element.className = selectedTile.element.className.replace('bg-earth', 'bg-green-400');
      }

      setIsPlantModalOpen(false);
      setSelectedTile(null);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Game Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text mb-4">
            Your Virtual Farm
          </h1>
          
          {/* Player Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-sm text-muted">Coins</p>
                  <p className="text-xl font-semibold text-accent">{playerStats.coins}</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-sm text-muted">XP</p>
                  <p className="text-xl font-semibold text-primary">{playerStats.xp}</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-sm text-muted">Level</p>
                  <p className="text-xl font-semibold text-secondary">{playerStats.level}</p>
                </div>
              </div>
            </Card>
            
            <Card>
              <div>
                <ProgressBar 
                  progress={playerStats.energy} 
                  max={playerStats.maxEnergy} 
                  label="Energy" 
                  color="sky"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Game Canvas */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <h2 className="text-xl font-display font-semibold mb-4">Farm Grid</h2>
              <div 
                ref={gameRef} 
                className="w-full min-h-[400px] bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center"
              >
                <p className="text-muted">Click on empty plots to plant crops, or on grown crops to harvest!</p>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" size="sm">
                  💧 Water Crops
                </Button>
                <Button variant="accent" className="w-full" size="sm">
                  🌱 Plant Seeds
                </Button>
                <Button variant="secondary" className="w-full" size="sm">
                  🏪 Visit Market
                </Button>
              </div>
            </Card>

            {/* Weather */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Weather</h3>
              <div className="text-center">
                <div className="text-3xl mb-2">☀️</div>
                <p className="text-lg font-medium">Sunny</p>
                <p className="text-sm text-muted">Perfect for farming!</p>
                <p className="text-xs text-muted mt-2">28°C • Humidity 65%</p>
              </div>
            </Card>

            {/* Daily Challenges */}
            <Card>
              <h3 className="font-display font-semibold mb-4">Daily Challenges</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Plant 5 crops</span>
                  <span className="text-xs bg-accent text-text px-2 py-1 rounded-full">3/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Harvest 3 crops</span>
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Water plants</span>
                  <span className="text-xs bg-muted text-white px-2 py-1 rounded-full">0/10</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Plant Crop Modal */}
        <Modal 
          isOpen={isPlantModalOpen} 
          onClose={() => setIsPlantModalOpen(false)}
          title="Choose a Crop to Plant"
        >
          <div className="grid grid-cols-2 gap-3">
            {crops.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handlePlantCrop(crop)}
                disabled={playerStats.coins < crop.cost}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-center transition-colors duration-200"
              >
                <div className="text-2xl mb-2">{crop.icon}</div>
                <p className="font-medium text-sm">{crop.name}</p>
                <p className="text-xs text-muted">💰 {crop.cost} • ⭐ {crop.xp} XP</p>
                <p className="text-xs text-muted">⏱️ {Math.floor(crop.time / 60)}min</p>
              </button>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Game;