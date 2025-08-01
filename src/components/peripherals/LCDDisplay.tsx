import { useState, useEffect } from 'react';

const LCDDisplay = () => {
  const [line1, setLine1] = useState('Loading Portfolio...');
  const [line2, setLine2] = useState('Ready for Commands');
  
  const messages = [
    { line1: 'Abhiraj R Singh', line2: 'M.Tech @ IIT KGP   ' },
    { line1: 'Embedded Systems', line2: 'Real-time Control ' },
    { line1: 'C++ | Python | AI', line2: 'HIL | CAN | GPU   ' },
    { line1: 'Stanford Research', line2: 'ML for Healthcare ' },
    { line1: 'Portfolio Active ', line2: 'System Ready...   ' }
  ];

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      const message = messages[messageIndex];
      setLine1(message.line1);
      setLine2(message.line2);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* LCD Screen */}
      <div className="bg-led-bg border-2 border-border p-3 font-mono text-sm">
        <div className="bg-terminal-success/20 text-terminal-success p-2 space-y-1">
          <div className="h-4 flex items-center">
            <span className="block w-full text-center">{line1.padEnd(16).substring(0, 16)}</span>
          </div>
          <div className="h-4 flex items-center">
            <span className="block w-full text-center">{line2.padEnd(16).substring(0, 16)}</span>
          </div>
        </div>
      </div>

      {/* LCD Info */}
      <div className="text-center text-xs text-muted-foreground">
        <div>16×2 Character LCD</div>
        <div>I2C Address: 0x27</div>
      </div>
    </div>
  );
};

export default LCDDisplay;