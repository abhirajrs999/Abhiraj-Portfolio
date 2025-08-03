import { useState, useEffect } from 'react';
import ASCIIBanner from './ASCIIBanner';

interface BootMessage {
  text: string;
  status: 'loading' | 'ok' | 'warning' | 'error';
  delay: number;
}

interface BootloaderProps {
  onBootComplete: () => void;
}

const Bootloader = ({ onBootComplete }: BootloaderProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pressedEnter, setPressedEnter] = useState(false);

  const bootMessages: BootMessage[] = [
    { text: "Initializing skills module…", status: 'ok', delay: 800 },
    { text: "Detecting experience modules…", status: 'ok', delay: 600 },
    { text: "Loading education firmware…", status: 'ok', delay: 700 },
    { text: "Verifying thesis integration…", status: 'ok', delay: 900 },
    { text: "Mounting project filesystem…", status: 'ok', delay: 650 },
  ];

  useEffect(() => {
    if (currentMessageIndex < bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, currentMessageIndex === -1 ? 1500 : bootMessages[currentMessageIndex]?.delay || 500);
      
      return () => clearTimeout(timer);
    } else if (currentMessageIndex === bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, bootMessages]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showPrompt && !pressedEnter) {
        setPressedEnter(true);
        setTimeout(() => {
          onBootComplete();
        }, 500);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPrompt, pressedEnter, onBootComplete]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ok': return 'status-ok';
      case 'warning': return 'status-warning';
      case 'error': return 'status-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusSymbol = (status: string, isVisible: boolean) => {
    if (!isVisible) return '    ';
    switch (status) {
      case 'ok': return ' OK ';
      case 'warning': return 'WARN';
      case 'error': return 'ERR ';
      default: return '... ';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground terminal flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* ASCII Banner */}
        <div className="mb-12">
          <ASCIIBanner />
        </div>

        {/* Boot Messages */}
        <div className="space-y-2 mb-8 font-mono text-sm">
          {bootMessages.map((message, index) => {
            const isVisible = index <= currentMessageIndex;
            const isCompleted = index < currentMessageIndex;
            
            return (
              <div 
                key={index}
                className={`flex items-center transition-opacity duration-300 ${
                  isVisible ? 'opacity-100 boot-message' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span className="mr-2 text-muted-foreground">[</span>
                <span className={`w-4 text-center ${getStatusClass(
                  isCompleted ? message.status : 'loading'
                )}`}>
                  {getStatusSymbol(
                    isCompleted ? message.status : 'loading', 
                    isVisible
                  )}
                </span>
                <span className="mr-2 text-muted-foreground">]</span>
                <span className="text-foreground">{message.text}</span>
                {isCompleted && (
                  <span className={`ml-2 ${getStatusClass(message.status)}`}>
                    {message.status === 'ok' ? 'OK' : message.status.toUpperCase()}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Boot Complete Prompt */}
        {showPrompt && (
          <div className="text-center space-y-4">
            <div className="text-primary text-lg">
              Boot sequence complete.
            </div>
            <div className="text-foreground">
              <span className="typing-cursor">
                Press Enter to load kernel →
              </span>
            </div>
            <div className="text-muted-foreground text-sm">
              or accept boot command.
            </div>
          </div>
        )}

        {pressedEnter && (
          <div className="text-center mt-4 text-primary animate-fadeInUp">
            Loading kernel...
          </div>
        )}
      </div>
    </div>
  );
};

export default Bootloader;