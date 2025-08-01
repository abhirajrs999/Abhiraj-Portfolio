import { useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';

const I2CScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const devices = [
    {
      address: '0x10',
      name: 'AV-Fusion Module',
      description: 'Multi-sensor fusion for autonomous vehicles',
      project: 'MTP Thesis',
      status: 'Active',
      details: 'Real-time sensor fusion using Kalman filters and particle filters for enhanced vehicle perception.'
    },
    {
      address: '0x20', 
      name: 'ESCOIN GPU Optimizer',
      description: 'GPU acceleration for sparse CNNs',
      project: 'GPU Research',
      status: 'Optimized',
      details: 'CUDA-based optimization achieving 3x speedup for sparse convolutional neural networks.'
    },
    {
      address: '0x30',
      name: 'Many-Body Simulator',
      description: '1000-body physics simulation',
      project: 'OpenMP Project',
      status: 'Parallel',
      details: 'High-performance parallel simulation using OpenMP for gravitational N-body problems.'
    },
    {
      address: '0x40',
      name: 'Vehicle Security',
      description: 'Connected vehicle attack resilience',
      project: 'Cybersecurity',
      status: 'Secured',
      details: 'Framework for detecting and mitigating attacks on connected vehicle networks.'
    }
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {/* Scanner Control */}
      <div className="flex items-center justify-between">
        <div className="text-primary font-medium">I2C Bus Scanner</div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="flex items-center space-x-2 px-3 py-1 bg-secondary text-secondary-foreground rounded border border-border hover:bg-accent transition-colors disabled:opacity-50"
        >
          <Search className="w-4 h-4" />
          <span>{scanning ? 'Scanning...' : 'Scan Bus'}</span>
        </button>
      </div>

      {/* Bus Status */}
      <div className="text-sm space-y-1">
        <div>Bus Status: <span className="text-terminal-success">Online</span></div>
        <div>Clock: 400kHz (Fast Mode)</div>
        <div>Devices Found: {devices.length}</div>
      </div>

      {/* Device List */}
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground border-b border-border pb-1">
          Detected I2C Devices:
        </div>
        
        {devices.map((device) => (
          <div 
            key={device.address}
            className={`p-3 border rounded cursor-pointer transition-all ${
              selectedDevice === device.address 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedDevice(
              selectedDevice === device.address ? null : device.address
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-primary font-medium">{device.address}:</span>
                <span className="text-foreground">{device.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  device.status === 'Active' ? 'bg-terminal-success/20 text-terminal-success' :
                  device.status === 'Optimized' ? 'bg-terminal-warning/20 text-terminal-warning' :
                  'bg-secondary text-secondary-foreground'
                }`}>
                  {device.status}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground mt-1">
              {device.description}
            </div>

            {selectedDevice === device.address && (
              <div className="mt-3 p-3 bg-card border border-border rounded text-sm">
                <div className="font-medium text-primary mb-2">Device Details</div>
                <div className="space-y-1">
                  <div><span className="text-muted-foreground">Project:</span> {device.project}</div>
                  <div><span className="text-muted-foreground">Description:</span> {device.details}</div>
                  <div><span className="text-muted-foreground">I2C Address:</span> {device.address}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {scanning && (
        <div className="text-center text-muted-foreground animate-pulse">
          Scanning I2C bus... Please wait.
        </div>
      )}
    </div>
  );
};

export default I2CScanner;