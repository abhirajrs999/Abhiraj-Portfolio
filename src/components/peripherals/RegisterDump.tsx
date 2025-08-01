import { useState, useEffect } from 'react';
import { HardDrive, RefreshCw } from 'lucide-react';

interface Register {
  address: string;
  value: string;
  name: string;
  description: string;
  percentage?: number;
}

const RegisterDump = () => {
  const [registers, setRegisters] = useState<Register[]>([
    { address: '0x20001000', value: '0x64', name: 'SKILL_C', description: 'C/C++ Programming Proficiency', percentage: 100 },
    { address: '0x20001001', value: '0x5A', name: 'SKILL_PY', description: 'Python Development Skills', percentage: 90 },
    { address: '0x20001002', value: '0x57', name: 'SKILL_ML', description: 'Machine Learning Expertise', percentage: 87 },
    { address: '0x20001003', value: '0x5C', name: 'SKILL_EMBED', description: 'Embedded Systems Knowledge', percentage: 92 },
    { address: '0x20001004', value: '0x55', name: 'SKILL_GPU', description: 'GPU Programming (CUDA)', percentage: 85 },
    { address: '0x20001005', value: '0x58', name: 'SKILL_REALTIME', description: 'Real-time Systems', percentage: 88 },
    { address: '0x20001006', value: '0x5A', name: 'SKILL_CAN', description: 'CAN Protocol Implementation', percentage: 90 },
    { address: '0x20001007', value: '0x55', name: 'SKILL_HIL', description: 'Hardware-in-Loop Testing', percentage: 85 },
    { address: '0x20001008', value: '0x3C', name: 'AWS_CERT', description: 'Cloud Computing Certification', percentage: 60 },
    { address: '0x20001009', value: '0x4B', name: 'RESEARCH_PUB', description: 'Research Publications Count', percentage: 75 },
  ]);

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setRegisters(prev => prev.map(reg => {
        // Simulate slight fluctuations in some registers
        if (reg.name.includes('SKILL') && Math.random() > 0.8) {
          const variation = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
          const newPercentage = Math.max(70, Math.min(100, (reg.percentage || 0) + variation));
          const newValue = `0x${newPercentage.toString(16).toUpperCase().padStart(2, '0')}`;
          return { ...reg, value: newValue, percentage: newPercentage };
        }
        return reg;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const refreshRegisters = () => {
    // Simulate a manual refresh with slight randomization
    setRegisters(prev => prev.map(reg => {
      if (reg.percentage) {
        const baseValue = reg.percentage;
        const newPercentage = Math.max(baseValue - 2, Math.min(baseValue + 2, baseValue + (Math.random() - 0.5) * 4));
        const newValue = `0x${Math.floor(newPercentage).toString(16).toUpperCase().padStart(2, '0')}`;
        return { ...reg, value: newValue, percentage: newPercentage };
      }
      return reg;
    }));
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-5 h-5 text-primary" />
          <span className="text-primary font-medium">Memory-Mapped Registers</span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-2 py-1 text-xs rounded border ${
              autoRefresh 
                ? 'bg-terminal-success/20 text-terminal-success border-terminal-success' 
                : 'bg-secondary text-secondary-foreground border-border'
            }`}
          >
            Auto
          </button>
          <button
            onClick={refreshRegisters}
            className="flex items-center space-x-1 px-2 py-1 bg-secondary text-secondary-foreground rounded border border-border hover:bg-accent text-xs"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Register Table */}
      <div className="bg-card border border-border rounded overflow-hidden">
        <div className="bg-secondary text-secondary-foreground px-3 py-2 text-sm font-medium border-b border-border">
          Register Memory Map
        </div>
        
        <div className="font-mono text-xs">
          {registers.map((reg, index) => (
            <div 
              key={reg.address}
              className={`flex items-center p-2 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors ${
                index % 2 === 0 ? 'bg-background' : 'bg-muted/30'
              }`}
            >
              <div className="w-24 text-primary font-medium">{reg.address}:</div>
              <div className="w-12 text-center text-accent">{reg.value}</div>
              <div className="flex-1 ml-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">{reg.name}</span>
                  {reg.percentage && (
                    <span className="text-muted-foreground">({reg.percentage.toFixed(0)}%)</span>
                  )}
                </div>
                <div className="text-muted-foreground text-xs mt-1">{reg.description}</div>
                {reg.percentage && (
                  <div className="w-full bg-secondary rounded-full h-1 mt-1">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${reg.percentage}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Info */}
      <div className="text-xs text-muted-foreground space-y-1">
        <div>Base Address: 0x20001000 (Skills & Experience Region)</div>
        <div>Access: Read-Only | Word Size: 8-bit | Total Registers: {registers.length}</div>
        <div className="flex items-center space-x-4">
          <span>Status: <span className="text-terminal-success">Mapped</span></span>
          <span>Cache: <span className="text-primary">Enabled</span></span>
          <span>Protection: <span className="text-terminal-warning">Supervisor</span></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterDump;