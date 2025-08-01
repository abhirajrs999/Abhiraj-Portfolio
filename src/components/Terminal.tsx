import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

interface TerminalProps {
  onLaunchUserland: () => void;
}

interface Command {
  input: string;
  output: string[];
  timestamp: string;
}

const Terminal = ({ onLaunchUserland }: TerminalProps) => {
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: '01',
      name: 'Multi-Sensor Fusion HIL Framework',
      description: 'Real-time sensor fusion for autonomous vehicles using HIL simulation',
      tech: 'C++, CAN, HIL, Real-time Systems',
      link: '#thesis'
    },
    {
      id: '02', 
      name: 'ESCOIN GPU Sparse CNN Acceleration',
      description: 'GPU optimization for sparse convolutional neural networks',
      tech: 'CUDA, Python, Deep Learning',
      link: '#gpu-acceleration'
    },
    {
      id: '03',
      name: '1000-Body OpenMP Simulation',
      description: 'Parallel many-body physics simulation with OpenMP',
      tech: 'C++, OpenMP, Parallel Computing',
      link: '#simulation'
    },
    {
      id: '04',
      name: 'Connected Vehicles Attack Resilience',
      description: 'Security framework for connected vehicle networks',
      tech: 'Cybersecurity, V2X, Network Protocols',
      link: '#security'
    }
  ];

  const experience = [
    {
      period: '2024–25',
      title: 'IIT Kharagpur – M.Tech Dual Degree (Transportation Engg.)',
      details: [
        '• MTP Thesis: "Enhancing AV Safety through Advanced Control Systems"',
        '• Research focus: Multi-sensor fusion, real-time control systems',
        '• GPA: 8.9/10.0'
      ]
    },
    {
      period: '2024',
      title: 'Research Intern @ Stanford University',
      details: [
        '• ML algorithms for Maternal and Child Health indicators',
        '• Developed predictive models using TensorFlow and PyTorch',
        '• Published research in IEEE conference proceedings'
      ]
    },
    {
      period: '2022–24',
      title: 'Research Intern @ IIM Ahmedabad',
      details: [
        '• Sentiment Analysis for market prediction',
        '• Natural Language Processing with BERT models',
        '• Financial data analysis and visualization'
      ]
    },
    {
      period: '2022',
      title: 'Business Analyst Intern @ ISB Hyderabad',
      details: [
        '• Implemented Fama-French Three-Factor Model',
        '• Portfolio optimization and risk analysis',
        '• Quantitative finance and statistical modeling'
      ]
    }
  ];

  const skills = [
    { name: 'C/C++', level: 95 },
    { name: 'Python', level: 90 },
    { name: 'CUDA', level: 85 },
    { name: 'OpenMP', level: 88 },
    { name: 'Embedded Systems', level: 92 },
    { name: 'Real-time Systems', level: 89 },
    { name: 'Machine Learning', level: 87 },
    { name: 'CAN Protocol', level: 90 },
    { name: 'HIL Simulation', level: 85 }
  ];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const executeCommand = (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    let output: string[] = [];

    switch (cmd.toLowerCase().trim()) {
      case 'ls':
        output = [
          'projects/   experience/   skills/   thesis/   contact/',
          'peripherals/   registers/   watchdog/   i2c/   help/'
        ];
        break;

      case 'cat experience':
        output = experience.flatMap(exp => [
          `[${exp.period}] ${exp.title}`,
          ...exp.details,
          ''
        ]);
        break;

      case 'cat skills':
        output = [
          'Technical Skills Profile:',
          '',
          ...skills.map(skill => 
            `${skill.name.padEnd(20)} ${'█'.repeat(Math.floor(skill.level/10))}${skill.level}%`
          )
        ];
        break;

      case 'run projects':
        output = [
          '+----+--------------------------------------+-----------------+',
          '| #  | Project Name                         | Status          |',
          '+----+--------------------------------------+-----------------+',
          ...projects.map(p => 
            `| ${p.id} | ${p.name.padEnd(36)} | [DEPLOYED]      |`
          ),
          '+----+--------------------------------------+-----------------+',
          '',
          'Use "cat projects/<id>" for detailed information'
        ];
        break;

      case 'cat thesis':
        output = [
          'M.Tech Thesis: "Enhancing AV Safety through Advanced Control Systems"',
          '',
          'Abstract:',
          'This research focuses on developing robust multi-sensor fusion',
          'algorithms for autonomous vehicle safety systems. The work involves',
          'real-time control system design, Hardware-in-the-Loop (HIL)',
          'simulation, and comprehensive safety validation.',
          '',
          'Key Contributions:',
          '• Novel sensor fusion algorithm with 15% improved accuracy',
          '• Real-time implementation on embedded ARM Cortex-M7',
          '• HIL framework for comprehensive safety testing',
          '• Published in IEEE Transactions on Vehicular Technology'
        ];
        break;

      case 'userland':
      case 'start userland':
        onLaunchUserland();
        return;

      case 'help':
        output = [
          'Available commands:',
          '  ls                    - list directories',
          '  cat <directory>       - display directory contents',
          '  run projects          - show project portfolio',
          '  userland              - launch embedded peripherals',
          '  clear                 - clear terminal',
          '  history               - show command history',
          '  contact               - display contact information',
          '',
          'Navigation:',
          '  ↑/↓ arrows           - command history',
          '  Tab                   - autocomplete (basic)',
          ''
        ];
        break;

      case 'clear':
        setCommandHistory([]);
        return;

      case 'history':
        output = commandHistory.map((cmd, i) => `${i + 1}: ${cmd.input}`);
        break;

      case 'contact':
        output = [
          'Contact Information:',
          '',
          'Email:    abhiraj.singh@iitkgp.ac.in',
          'LinkedIn: linkedin.com/in/abhiraj-singh',
          'GitHub:   github.com/abhiraj-singh',
          'Location: Kharagpur, West Bengal, India',
          '',
          'Open to opportunities in embedded systems,',
          'autonomous vehicles, and real-time systems.'
        ];
        break;

      default:
        if (cmd.trim()) {
          output = [`bash: ${cmd}: command not found`, 'Type "help" for available commands'];
        }
        break;
    }

    if (output.length > 0) {
      setCommandHistory(prev => [...prev, { input: cmd, output, timestamp }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex].input);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground terminal">
      <div className="p-4">
        {/* Terminal Header */}
        <div className="mb-4 text-center border-b border-border pb-2">
          <div className="text-primary text-lg">Kernel Mode - Core System</div>
          <div className="text-muted-foreground text-sm">
            user@portfolio:~$ • Type 'help' for commands • 'userland' to launch peripherals
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="h-96 overflow-y-auto mb-4 space-y-2"
        >
          {/* Welcome Message */}
          <div className="text-muted-foreground">
            <div>Welcome to Abhiraj's Portfolio System v2.4.1</div>
            <div>Copyright (C) 2024 Embedded Systems Portfolio</div>
            <div>Type 'ls' to explore the filesystem or 'help' for commands.</div>
            <div></div>
          </div>

          {/* Command History */}
          {commandHistory.map((cmd, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center">
                <span className="prompt">user@portfolio:~$</span>
                <span className="ml-2 command">{cmd.input}</span>
              </div>
              <div className="output ml-4 space-y-1">
                {cmd.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="font-mono text-sm">
                    {line.includes('[DEPLOYED]') ? (
                      <div className="flex items-center justify-between">
                        <span>{line}</span>
                        <ExternalLink className="w-3 h-3 text-primary" />
                      </div>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Current Input */}
        <div className="flex items-center">
          <span className="prompt">user@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="ml-2 bg-transparent border-none outline-none flex-1 text-foreground font-mono"
            placeholder="Type command..."
          />
          <span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;