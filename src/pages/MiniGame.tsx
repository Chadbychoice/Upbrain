import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ComicPanel from '../components/ComicPanel';
import { TrophyIcon } from 'lucide-react';
import heroSprite from '/hero.webp';

const SPRITE_FRAME_COUNT = 10;
const SPRITE_WIDTH = 128; // px, adjust if needed
const SPRITE_HEIGHT = 128; // px, adjust if needed

const MiniGame: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const obstaclesRef = useRef<HTMLDivElement[]>([]);
  const animationFrameRef = useRef<number>(0);
  const [playerFrame, setPlayerFrame] = useState(0);
  const [isPlayerJumping, setIsPlayerJumping] = useState(false);
  
  // Game initialization
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(90);
    obstaclesRef.current = [];
  };
  
  // Animation frame cycling
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    if (isPlayerJumping) return; // Don't animate while jumping
    const interval = setInterval(() => {
      setPlayerFrame(f => (f + 1) % SPRITE_FRAME_COUNT);
    }, 80); // ~12.5fps
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isPlayerJumping]);
  
  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const gameArea = gameAreaRef.current;
    const player = playerRef.current;
    
    if (!gameArea || !player) return;
    
    let playerY = 16;
    let playerVelocity = 0;
    let jumpPower = 15;
    let gravity = -0.8;
    let isJumping = false;
    let currentSpeed = 6; // Initial obstacle speed
    let framesElapsed = 0; // Counter for increasing speed
    const speedIncreaseInterval = 350; // Increase speed every 600 frames ( ~10 seconds)
    const speedIncrement = 2; // How much to increase speed by
    const maxSpeed = 500; // Maximum obstacle speed
    
    // Handle player movement
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !isJumping) {
        playerVelocity = jumpPower;
        isJumping = true;
        setIsPlayerJumping(true);
      }
    };
    
    // Handle touch for mobile
    const handleTouch = () => {
      if (!isJumping) {
        playerVelocity = jumpPower;
        isJumping = true;
        setIsPlayerJumping(true);
      }
    };
    
    // Spawn obstacles
    let lastObstacleRight = 0;
    const boxWidth = 48; // px (w-12)
    const minGap = 3 * boxWidth + 24; // 3 boxes + buffer
    const spawnObstacle = () => {
      // Check the rightmost obstacle's position
      let canSpawn = true;
      if (obstaclesRef.current.length > 0) {
        const lastObstacle = obstaclesRef.current[obstaclesRef.current.length - 1];
        const lastRight = parseInt(lastObstacle.style.right || '0');
        if (lastRight < minGap) {
          canSpawn = false;
        }
      }
      if (canSpawn) {
        const obstacle = document.createElement('div');
        obstacle.className = 'absolute bg-primary h-12 w-12 comic-border';
        obstacle.style.bottom = '0';
        obstacle.style.right = '-50px';
        gameArea.appendChild(obstacle);
        obstaclesRef.current.push(obstacle);
      }
      // Always try again soon, but only spawn if enough gap
      setTimeout(spawnObstacle, Math.random() * 500 + 2000);
    };
    
    // Timer countdown
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Game animation loop
    const updateGame = () => {
      if (gameOver) return;
      
      framesElapsed++; // Increment frame counter
      
      // Increase speed periodically
      if (framesElapsed % speedIncreaseInterval === 0 && currentSpeed < maxSpeed) {
        currentSpeed += speedIncrement;
      }
      
      // Update player position
      playerVelocity += gravity;
      playerY += playerVelocity;
      
      // Ground collision
      if (playerY <= 16) {
        playerY = 16;
        playerVelocity = 0;
        isJumping = false;
        setIsPlayerJumping(false);
      }
      
      player.style.bottom = `${playerY}px`;
      
      // Update obstacles
      obstaclesRef.current.forEach((obstacle, index) => {
        const obstacleX = parseInt(obstacle.style.right || '0') + currentSpeed; // Use currentSpeed
        obstacle.style.right = `${obstacleX}px`;
        
        // Check if obstacle passed the player (score point)
        if (obstacleX > gameArea.clientWidth && !obstacle.dataset.scored) {
          setScore(prev => prev + 10);
          obstacle.dataset.scored = 'true';
        }
        
        // Remove obstacles that are off-screen
        if (obstacleX > gameArea.clientWidth + 100) {
          obstacle.remove();
          obstaclesRef.current.splice(index, 1);
        }
        
        // Collision detection (with smaller hitbox)
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        
        // Define padding for hitbox reduction (increased padding)
        const hitboxPaddingFactor = 0.35;
        const playerHPadding = playerRect.width * hitboxPaddingFactor / 2;
        const playerVPadding = playerRect.height * hitboxPaddingFactor / 2;
        const obstacleHPadding = obstacleRect.width * hitboxPaddingFactor / 2;
        const obstacleVPadding = obstacleRect.height * hitboxPaddingFactor / 2;

        if (
          playerRect.right - playerHPadding > obstacleRect.left + obstacleHPadding &&
          playerRect.left + playerHPadding < obstacleRect.right - obstacleHPadding &&
          playerRect.bottom - playerVPadding > obstacleRect.top + obstacleVPadding &&
          playerRect.top + playerVPadding < obstacleRect.bottom - obstacleVPadding
        ) {
          // Collision detected
          clearInterval(timerInterval);
          setGameOver(true);
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(updateGame);
    };
    
    // Start the game
    window.addEventListener('keydown', handleKeyDown);
    gameArea.addEventListener('touchstart', handleTouch);
    spawnObstacle();
    animationFrameRef.current = requestAnimationFrame(updateGame);
    
    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      gameArea.removeEventListener('touchstart', handleTouch);
      clearInterval(timerInterval);
      cancelAnimationFrame(animationFrameRef.current);
      obstaclesRef.current.forEach(obstacle => obstacle.remove());
    };
  }, [gameStarted, gameOver]);
  
  return (
    <div className="space-y-6">
      <header className="text-center">
        <motion.h1 
          className="font-bangers text-4xl md:text-6xl text-accent mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          DISTRACTION RUNNER
        </motion.h1>
        <p className="font-comic text-xl text-comic-black">
          Jump over obstacles and collect brain-coins!
        </p>
      </header>
      
      <ComicPanel className="bg-comic-gray-800 relative overflow-hidden" style={{ height: '400px' }}>
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-comic-black bg-opacity-70 z-10">
            <h2 className="font-bangers text-4xl text-comic-white mb-6">READY TO PLAY?</h2>
            <button 
              className="comic-btn bg-accent text-comic-black"
              onClick={startGame}
            >
              START GAME
            </button>
            <p className="font-comic text-comic-white mt-4">
              Press SPACE or TAP screen to jump
            </p>
          </div>
        )}
        
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-comic-black bg-opacity-70 z-10">
            <h2 className="font-bangers text-4xl text-comic-white mb-4">GAME OVER!</h2>
            <div className="flex items-center mb-6">
              <TrophyIcon size={32} className="text-accent mr-2" />
              <span className="font-bangers text-3xl text-accent">SCORE: {score}</span>
            </div>
            <button 
              className="comic-btn bg-accent text-comic-black mb-4"
              onClick={startGame}
            >
              PLAY AGAIN
            </button>
            <p className="font-comic text-comic-white text-center max-w-md">
              Great job! Taking this time to play helps reset your brain and break unwanted patterns.
            </p>
          </div>
        )}
        
        {/* Game UI */}
        <div className="absolute top-4 left-4 z-10 flex space-x-6">
          <div className="comic-panel bg-accent py-1 px-4">
            <span className="font-bangers text-xl">SCORE: {score}</span>
          </div>
          <div className="comic-panel bg-primary py-1 px-4">
            <span className="font-bangers text-xl text-comic-white">
              TIME: {timeLeft}s
            </span>
          </div>
        </div>
        
        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="w-full h-full bg-comic-black bg-halftone-dark relative overflow-hidden"
          style={{ 
            backgroundColor: '#000033',
            backgroundImage: 'linear-gradient(to bottom, #000033, #000066)'
          }}
        >
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-16 bg-comic-gray-900"></div>
          
          {/* Player */}
          <div
            ref={playerRef}
            className="absolute left-20 bottom-[16px]"
            style={{
              width: SPRITE_WIDTH,
              height: SPRITE_HEIGHT,
              backgroundImage: `url(${heroSprite})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `-${(isPlayerJumping ? 0 : playerFrame) * SPRITE_WIDTH}px 0px`,
              backgroundSize: `${SPRITE_WIDTH * SPRITE_FRAME_COUNT}px ${SPRITE_HEIGHT}px`,
            }}
          ></div>
        </div>
      </ComicPanel>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComicPanel className="bg-comic-white">
          <h3 className="font-bangers text-2xl text-primary mb-4">
            HOW THIS HELPS
          </h3>
          <p className="font-comic text-lg">
            Playing games for a short time activates your brain's reward system in a healthy way. This helps interrupt craving cycles and gives you time for urges to naturally subside.
          </p>
        </ComicPanel>
        
        <ComicPanel className="bg-comic-white">
          <h3 className="font-bangers text-2xl text-primary mb-4">
            BRAIN COINS
          </h3>
          <p className="font-comic text-lg">
            Each point you earn converts to Brain Coins that you can use to unlock character customizations and power-ups. Your current balance: <span className="font-bold">{score} coins</span>
          </p>
        </ComicPanel>
      </div>
    </div>
  );
};

export default MiniGame;