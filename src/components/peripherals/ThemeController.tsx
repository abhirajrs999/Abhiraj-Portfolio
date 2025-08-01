import { useState } from 'react';
import { Monitor, Palette, Zap } from 'lucide-react';

const ThemeController = () => {
  const [currentTheme, setCurrentTheme] = useState('terminal');
  const [dipSwitches, setDipSwitches] = useState({
    switch1: false, // Normal/BIOS mode
    switch2: false, // CRT effect
    switch3: true,  // Scanlines
    switch4: false, // High contrast
  });

  const themes = [
    {
      id: 'terminal',
      name: 'Normal Mode',
      description: 'Standard green-on-black terminal',
      className: '',
      preview: { bg: '#000000', fg: '#00ff00', accent: '#ffff00' }
    },
    {
      id: 'bios',
      name: 'Dark BIOS Mode', 
      description: 'Classic blue BIOS interface',
      className: 'theme-bios',
      preview: { bg: '#000040', fg: '#d4d4d4', accent: '#ffff80' }
    },
    {
      id: 'crt',
      name: 'Green CRT Mode',
      description: 'Retro CRT with scanlines',
      className: 'theme-crt crt-effect',
      preview: { bg: '#0d0d0d', fg: '#00ff41', accent: '#00ff00' }
    }
  ];

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId);
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      // Remove existing theme classes
      document.body.classList.remove('theme-bios', 'theme-crt', 'crt-effect');
      
      // Add new theme classes
      if (theme.className) {
        const classes = theme.className.split(' ');
        document.body.classList.add(...classes);
      }
    }
  };

  const handleDipSwitch = (switchName: string) => {
    setDipSwitches(prev => ({
      ...prev,
      [switchName]: !prev[switchName as keyof typeof prev]
    }));

    // Apply DIP switch effects
    if (switchName === 'switch1') {
      handleThemeChange(dipSwitches.switch1 ? 'terminal' : 'bios');
    } else if (switchName === 'switch2') {
      if (!dipSwitches.switch2) {
        document.body.classList.add('crt-effect');
      } else {
        document.body.classList.remove('crt-effect');
      }
    }
  };

  const currentThemeData = themes.find(t => t.id === currentTheme);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Monitor className="w-5 h-5 text-primary" />
        <span className="text-primary font-medium">Display Controller</span>
      </div>

      {/* Current Theme Display */}
      <div className="bg-card border border-border rounded p-3">
        <div className="text-sm text-muted-foreground mb-2">Current Theme:</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-foreground">{currentThemeData?.name}</div>
            <div className="text-xs text-muted-foreground">{currentThemeData?.description}</div>
          </div>
          <div className="flex space-x-1">
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: currentThemeData?.preview.bg }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: currentThemeData?.preview.fg }}
            />
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: currentThemeData?.preview.accent }}
            />
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Available Themes:</div>
        <div className="grid grid-cols-1 gap-2">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`p-3 text-left rounded border transition-all ${
                currentTheme === theme.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50 bg-card'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-foreground">{theme.name}</div>
                  <div className="text-xs text-muted-foreground">{theme.description}</div>
                </div>
                <div className="flex space-x-1">
                  <div 
                    className="w-3 h-3 rounded border border-border"
                    style={{ backgroundColor: theme.preview.bg }}
                  />
                  <div 
                    className="w-3 h-3 rounded border border-border"
                    style={{ backgroundColor: theme.preview.fg }}
                  />
                  <div 
                    className="w-3 h-3 rounded border border-border"
                    style={{ backgroundColor: theme.preview.accent }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* DIP Switches */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Hardware DIP Switches</span>
        </div>
        
        <div className="bg-card border border-border rounded p-3">
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(dipSwitches).map(([switchName, isOn], index) => (
              <div key={switchName} className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  SW{index + 1}: {
                    index === 0 ? 'BIOS Mode' :
                    index === 1 ? 'CRT Effect' :
                    index === 2 ? 'Scanlines' :
                    'High Contrast'
                  }
                </div>
                <button
                  onClick={() => handleDipSwitch(switchName)}
                  className={`w-8 h-4 rounded-full border-2 transition-all ${
                    isOn 
                      ? 'bg-primary border-primary' 
                      : 'bg-secondary border-border'
                  }`}
                >
                  <div 
                    className={`w-2 h-2 bg-white rounded-full transition-transform ${
                      isOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Display Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>Display Controller: VGA Compatible</div>
        <div>Resolution: Adaptive | Color Depth: 24-bit</div>
        <div>Refresh Rate: 60Hz | Status: <span className="text-terminal-success">Active</span></div>
      </div>
    </div>
  );
};

export default ThemeController;