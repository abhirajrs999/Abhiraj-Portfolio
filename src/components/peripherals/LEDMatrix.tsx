import { useState, useEffect } from 'react';

const LEDMatrix = () => {
  const [pattern, setPattern] = useState<boolean[][]>(
    Array(8).fill(null).map(() => Array(8).fill(false))
  );
  const [scrollText, setScrollText] = useState('C Python React Embedded AI GPU CAN HIL ');
  const [scrollPosition, setScrollPosition] = useState(0);

  // Create letter patterns (simplified 5x8 patterns)
  const letterPatterns: { [key: string]: boolean[][] } = {
    'C': [
      [false, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, true],
      [false, true, true, true, false]
    ],
    'P': [
      [true, true, true, true, false],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, false, false, false, false]
    ],
    // Add more letters as needed, or use a simpler scrolling pattern
    ' ': Array(8).fill(null).map(() => Array(5).fill(false))
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Create a simple scrolling pattern
      const newPattern = Array(8).fill(null).map(() => Array(8).fill(false));
      
      // Simple scrolling dots pattern
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const pos = (col + scrollPosition) % 16;
          if (pos < 8 && (pos === row || pos === 7 - row)) {
            newPattern[row][col] = true;
          }
        }
      }
      
      setPattern(newPattern);
      setScrollPosition((prev) => (prev + 1) % 16);
    }, 200);

    return () => clearInterval(interval);
  }, [scrollPosition]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 8x8 LED Matrix */}
      <div className="grid grid-cols-8 gap-1 p-4 bg-led-bg rounded-lg border border-border">
        {pattern.map((row, rowIndex) =>
          row.map((isOn, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                isOn ? 'led-on' : 'led-off'
              }`}
            />
          ))
        )}
      </div>

      {/* Matrix Info */}
      <div className="text-center text-sm text-muted-foreground">
        <div>8×8 LED Matrix Display</div>
        <div className="font-mono">Pattern: Scrolling Skills</div>
        <div className="text-xs">
          Status: <span className="text-terminal-success">Active</span> | 
          Refresh: 200ms | 
          Mode: Scroll
        </div>
      </div>
    </div>
  );
};

export default LEDMatrix;