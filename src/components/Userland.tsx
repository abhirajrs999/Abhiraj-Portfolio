import { useState, useEffect } from 'react';
import { Cpu, Zap, Settings, Monitor, Wifi } from 'lucide-react';
import LEDMatrix from './peripherals/LEDMatrix';
import LCDDisplay from './peripherals/LCDDisplay';
import I2CScanner from './peripherals/I2CScanner';
import WatchdogTimer from './peripherals/WatchdogTimer';
import RegisterDump from './peripherals/RegisterDump';
import ThemeController from './peripherals/ThemeController';

interface UserlandProps {
  onBackToTerminal: () => void;
}

const Userland = ({ onBackToTerminal }: UserlandProps) => {
  const [activePeripheral, setActivePeripheral] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState({
    cpu: 45,
    memory: 68,
    i2c: 'Active',
    spi: 'Ready',
    can: 'Online'
  });

  useEffect(() => {
    // Simulate system monitoring
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(40, Math.min(90, prev.memory + (Math.random() - 0.5) * 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const peripherals = [
    {
      id: 'i2c',
      name: 'I2C Scanner',
      icon: <Cpu className="w-5 h-5" />,
      description: 'Scan I2C bus for connected devices',
      component: <I2CScanner />
    },
    {
      id: 'watchdog',
      name: 'Watchdog Timer',
      icon: <Zap className="w-5 h-5" />,
      description: 'System uptime and health monitoring',
      component: <WatchdogTimer />
    },
    {
      id: 'registers',
      name: 'Register Dump',
      icon: <Monitor className="w-5 h-5" />,
      description: 'Memory-mapped register inspection',
      component: <RegisterDump />
    },
    {
      id: 'theme',
      name: 'Theme Controller',
      icon: <Settings className="w-5 h-5" />,
      description: 'Switch between display modes',
      component: <ThemeController />
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground terminal">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl text-primary">Userland Applications</h1>
              <p className="text-muted-foreground text-sm">Embedded System Peripherals</p>
            </div>
            <button
              onClick={onBackToTerminal}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded border border-border hover:bg-accent transition-colors"
            >
              Back to Terminal
            </button>
          </div>

          {/* System Status Bar */}
          <div className="flex items-center space-x-6 text-sm bg-card p-3 rounded border border-border">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span>CPU: {systemStatus.cpu}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Monitor className="w-4 h-4 text-primary" />
              <span>MEM: {systemStatus.memory}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-terminal-success" />
              <span>I2C: {systemStatus.i2c}</span>
            </div>
            <div className="text-terminal-success">
              SPI: {systemStatus.spi} | CAN: {systemStatus.can}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Peripherals */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg text-primary border-b border-border pb-2">
              Available Peripherals
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {peripherals.map((peripheral) => (
                <div
                  key={peripheral.id}
                  className={`p-4 border rounded cursor-pointer transition-all ${
                    activePeripheral === peripheral.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50 bg-card'
                  }`}
                  onClick={() => setActivePeripheral(
                    activePeripheral === peripheral.id ? null : peripheral.id
                  )}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="text-primary">{peripheral.icon}</div>
                    <div className="text-foreground font-medium">{peripheral.name}</div>
                  </div>
                  <p className="text-muted-foreground text-sm">{peripheral.description}</p>
                </div>
              ))}
            </div>

            {/* Active Peripheral Component */}
            {activePeripheral && (
              <div className="mt-6 p-4 bg-card border border-border rounded">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-primary font-medium">
                    {peripherals.find(p => p.id === activePeripheral)?.name}
                  </h3>
                  <button
                    onClick={() => setActivePeripheral(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
                {peripherals.find(p => p.id === activePeripheral)?.component}
              </div>
            )}
          </div>

          {/* Right Column - Hardware Displays */}
          <div className="space-y-6">
            {/* LCD Display */}
            <div className="bg-card border border-border rounded p-4">
              <h3 className="text-primary font-medium mb-3">16×2 LCD Display</h3>
              <LCDDisplay />
            </div>

            {/* LED Matrix */}
            <div className="bg-card border border-border rounded p-4">
              <h3 className="text-primary font-medium mb-3">8×8 LED Matrix</h3>
              <LEDMatrix />
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded p-4">
              <h3 className="text-primary font-medium mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => window.open('mailto:abhiraj.singh@iitkgp.ac.in')}
                  className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-accent transition-colors"
                >
                  Send Email
                </button>
                <button
                  onClick={() => window.open('https://linkedin.com/in/abhiraj-singh', '_blank')}
                  className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-accent transition-colors"
                >
                  LinkedIn Profile
                </button>
                <button
                  onClick={() => window.open('https://github.com/abhiraj-singh', '_blank')}
                  className="w-full px-3 py-2 bg-secondary text-secondary-foreground rounded text-sm hover:bg-accent transition-colors"
                >
                  GitHub Repository
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userland;