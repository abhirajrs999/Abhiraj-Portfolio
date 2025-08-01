import { useState } from 'react';
import Bootloader from './Bootloader';
import Terminal from './Terminal';
import Userland from './Userland';

type Stage = 'bootloader' | 'kernel' | 'userland';

const EmbeddedPortfolio = () => {
  const [currentStage, setCurrentStage] = useState<Stage>('bootloader');

  const handleBootComplete = () => {
    setCurrentStage('kernel');
  };

  const handleLaunchUserland = () => {
    setCurrentStage('userland');
  };

  const handleBackToTerminal = () => {
    setCurrentStage('kernel');
  };

  return (
    <div className="w-full">
      {currentStage === 'bootloader' && (
        <Bootloader onBootComplete={handleBootComplete} />
      )}
      
      {currentStage === 'kernel' && (
        <Terminal onLaunchUserland={handleLaunchUserland} />
      )}
      
      {currentStage === 'userland' && (
        <Userland onBackToTerminal={handleBackToTerminal} />
      )}
    </div>
  );
};

export default EmbeddedPortfolio;