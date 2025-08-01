import { useState, useEffect } from 'react';
import { Clock, Activity, Zap } from 'lucide-react';

const WatchdogTimer = () => {
  const [uptime, setUptime] = useState({
    years: 3,
    months: 4,
    days: 12,
    hours: 5,
    minutes: 23,
    seconds: 10
  });
  const [systemHealth, setSystemHealth] = useState(98);
  const [lastReset, setLastReset] = useState('2021-08-15 14:30:22');

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;
        let newDays = prev.days;
        let newMonths = prev.months;
        let newYears = prev.years;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours += 1;
        }
        if (newHours >= 24) {
          newHours = 0;
          newDays += 1;
        }
        if (newDays >= 30) {
          newDays = 0;
          newMonths += 1;
        }
        if (newMonths >= 12) {
          newMonths = 0;
          newYears += 1;
        }

        return {
          years: newYears,
          months: newMonths,
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });

      // Simulate health fluctuation
      setSystemHealth(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(95, Math.min(100, prev + change));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Zap className="w-5 h-5 text-primary" />
        <span className="text-primary font-medium">Watchdog Timer Status</span>
      </div>

      {/* Main Uptime Display */}
      <div className="bg-card border border-border rounded p-4">
        <div className="text-center">
          <div className="text-2xl font-mono text-primary mb-2">
            {formatNumber(uptime.years)}y {formatNumber(uptime.months)}m {formatNumber(uptime.days)}d
          </div>
          <div className="text-lg font-mono text-foreground">
            {formatNumber(uptime.hours)}:{formatNumber(uptime.minutes)}:{formatNumber(uptime.seconds)}
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            System Uptime Since Career Start
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-terminal-success" />
            <span className="text-sm">System Health</span>
          </div>
          <span className="text-sm font-mono text-primary">{systemHealth.toFixed(1)}%</span>
        </div>
        
        {/* Health Bar */}
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-terminal-success h-2 rounded-full transition-all duration-300"
            style={{ width: `${systemHealth}%` }}
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="text-muted-foreground">Performance Metrics:</div>
          <div className="font-mono">
            <div>Projects: <span className="text-primary">15+</span></div>
            <div>Research: <span className="text-primary">4 Papers</span></div>
            <div>Languages: <span className="text-primary">8+</span></div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-muted-foreground">System Info:</div>
          <div className="font-mono">
            <div>CPU: <span className="text-primary">Dual-Core</span></div>
            <div>Memory: <span className="text-primary">Adaptive</span></div>
            <div>Storage: <span className="text-primary">Cloud</span></div>
          </div>
        </div>
      </div>

      {/* Last Reset Info */}
      <div className="text-xs text-muted-foreground border-t border-border pt-2">
        <div className="flex items-center space-x-2">
          <Clock className="w-3 h-3" />
          <span>Last Reset: {lastReset} (First Internship)</span>
        </div>
        <div className="mt-1">
          Watchdog Timer: <span className="text-terminal-success">Enabled</span> | 
          Timeout: <span className="text-primary">∞</span> | 
          Status: <span className="text-terminal-success">Healthy</span>
        </div>
      </div>
    </div>
  );
};

export default WatchdogTimer;