import { useState } from 'react';
import Bootloader from './Bootloader';
import Terminal from './Terminal';
import SimplePortfolio from './portfolio/SimplePortfolio';

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
        <div key="modern-portfolio" style={{backgroundColor: '#f3e8ff', minHeight: '100vh'}}>
          <SimplePortfolio />
        </div>
      )}
    </div>
  );
};

export default EmbeddedPortfolio;