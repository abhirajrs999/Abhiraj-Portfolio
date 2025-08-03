import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Minus, Square, X } from 'lucide-react';

interface TerminalProps {
  onLaunchUserland: () => void;
}

interface Command {
  input: string;
  output: string[];
  timestamp: string;
  executionTime: number;
}

const Terminal = ({ onLaunchUserland }: TerminalProps) => {
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~');
  const [systemUptime, setSystemUptime] = useState('0 min');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // System info state
  const [systemInfo] = useState({
    hostname: 'portfolio-sys',
    username: 'abhiraj',
    kernel: 'Linux 5.15.0-embedded',
    uptime: '2 days, 14:32',
    memory: { used: '2.4GB', total: '8.0GB' },
    cpu: 'ARM Cortex-M7 @ 800MHz'
  });

  const projects = [
    {
      id: '01',
      name: 'Multi-Sensor Fusion HIL Framework',
      description: 'Real-time sensor fusion for autonomous vehicles using HIL simulation',
      tech: 'C++, CAN, HIL, Real-time Systems',
      status: 'DEPLOYED',
      permissions: '-rwxr-xr-x',
      size: '2.4MB',
      modified: 'Dec 15 14:30'
    },
    {
      id: '02', 
      name: 'ESCOIN GPU Sparse CNN Acceleration',
      description: 'GPU optimization for sparse convolutional neural networks',
      tech: 'CUDA, Python, Deep Learning',
      status: 'DEPLOYED',
      permissions: '-rwxr-xr-x',
      size: '1.8MB',
      modified: 'Dec 10 09:15'
    },
    {
      id: '03',
      name: 'CAN Protocol Implementation',
      description: 'Real-time CAN bus communication for automotive systems',
      tech: 'C++, CAN, Embedded Systems',
      status: 'ACTIVE',
      permissions: '-rwxr-xr-x',
      size: '956KB',
      modified: 'Dec 08 16:45'
    },
    {
      id: '04',
      name: 'Real-time Control Systems',
      description: 'Microsecond precision control algorithms',
      tech: 'C++, Real-time OS, Control Theory',
      status: 'TESTING',
      permissions: '-rwxr-xr-x',
      size: '1.2MB',
      modified: 'Dec 05 11:20'
    }
  ];

  const experience = [
    {
      period: '2024–25',
      title: 'IIT Kharagpur – M.Tech Transportation Engineering',
      details: [
        '• Research: Multi-sensor fusion for autonomous vehicle safety',
        '• Thesis: "Enhancing AV Safety through Advanced Control Systems"',
        '• GPA: 8.9/10.0 | Focus: Real-time embedded systems',
        '• Technologies: C++, MATLAB/Simulink, CAN Protocol, HIL Testing'
      ]
    },
    {
      period: '2024',
      title: 'Research Intern @ Stanford University',
      details: [
        '• Developed ML algorithms for Maternal and Child Health indicators',
        '• Built predictive models using TensorFlow and PyTorch',
        '• Published research in IEEE conference proceedings',
        '• Collaborated with interdisciplinary research teams'
      ]
    },
    {
      period: '2022–24',
      title: 'Research Intern @ IIM Ahmedabad',
      details: [
        '• Implemented sentiment analysis for financial market prediction',
        '• Developed NLP models using BERT and transformer architectures',
        '• Created data visualization dashboards for market insights',
        '• Processed large-scale financial datasets for pattern recognition'
      ]
    }
  ];

  const skills = [
    { name: 'C/C++', level: 95, category: 'Programming' },
    { name: 'Python', level: 90, category: 'Programming' },
    { name: 'CUDA', level: 85, category: 'Parallel Computing' },
    { name: 'Embedded Systems', level: 92, category: 'Hardware' },
    { name: 'Real-time Systems', level: 89, category: 'Systems' },
    { name: 'CAN Protocol', level: 90, category: 'Communication' },
    { name: 'HIL Simulation', level: 85, category: 'Testing' },
    { name: 'MATLAB/Simulink', level: 88, category: 'Modeling' },
    { name: 'Machine Learning', level: 87, category: 'AI/ML' }
  ];

  // System uptime counter
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 60000);
      setSystemUptime(elapsed < 60 ? `${elapsed} min` : `${Math.floor(elapsed/60)}h ${elapsed%60}m`);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const typewriterEffect = async (text: string[], delay: number = 30): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(text), delay * text.join('').length);
    });
  };

  const executeCommand = async (cmd: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const startTime = Date.now();
    setIsTyping(true);
    
    let output: string[] = [];

    // Simulate command execution delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 100));

    switch (cmd.toLowerCase().trim()) {
      case 'ls':
        output = [
          'projects',
          'experience', 
          'skills',
          'thesis',
          'contact',
          'bio'
        ];
        break;



      case 'bio':
      case 'cat bio':
      case 'whoami --bio':
        output = [
          'ABHIRAJ RANANAJAY SINGH',
          'Embedded Systems Engineer & M.Tech Student',
          '',
          'ABOUT:',
          'Passionate embedded systems engineer currently pursuing M.Tech in',
          'Transportation Engineering at IIT Kharagpur with specialization in',
          'autonomous vehicle safety systems. Experienced in real-time control',
          'systems, multi-sensor fusion, and GPU-accelerated computing.',
          '',
          'CURRENT FOCUS:',
          '• M.Tech Thesis: Enhancing AV Safety through Advanced Control Systems',
          '• Research: Multi-sensor fusion for autonomous vehicle perception',
          '• Development: HIL testing frameworks and real-time embedded systems',
          '',
          'TECHNICAL EXPERTISE:',
          '• Programming: C++, Python, MATLAB/Simulink, JavaScript',
          '• Embedded: ARM Cortex, STM32, Real-time systems, CAN Protocol',
          '• Hardware: PCB Design, Sensor Integration, HIL Testing',
          '• Research: Computer Vision, Machine Learning, GPU Computing',
          '',
          'ACADEMIC BACKGROUND:',
          '• M.Tech Transportation Engineering - IIT Kharagpur (2023-Present)',
          '• Research focus on autonomous vehicle safety and control systems',
          '• Published research in multi-sensor fusion and GPU acceleration',
          '',
          'PROFESSIONAL INTERESTS:',
          '• Autonomous vehicle technology and safety systems',
          '• Real-time embedded system development',
          '• Hardware-in-the-loop (HIL) testing methodologies',
          '• Advanced driver assistance systems (ADAS)',
          '• Multi-sensor data fusion algorithms',
          '',
          'PERSONAL:',
          'When not working on embedded systems, I enjoy exploring new',
          'technologies, contributing to open-source projects, and staying',
          'updated with the latest developments in autonomous vehicle research.',
          '',
          'Contact: jayeleven14@gmail.com | LinkedIn: /in/abhiraj-singh-4aa482238'
        ];
        break;

      case 'bio --summary':
      case 'bio -s':
        output = [
          'Abhiraj Rananajay Singh',
          'M.Tech Student @ IIT Kharagpur | Embedded Systems Engineer',
          '',
          'Specializing in autonomous vehicle safety systems, real-time',
          'control, and multi-sensor fusion. Passionate about embedded',
          'systems development and advanced driver assistance systems.',
          '',
          'Current research focuses on enhancing AV safety through',
          'advanced control systems and GPU-accelerated computing.'
        ];
        break;

      case 'pwd':
        output = [`/home/${systemInfo.username}${currentDirectory === '~' ? '' : currentDirectory}`];
        break;

      case 'whoami':
        output = [systemInfo.username];
        break;





      case 'uptime':
        output = [`${new Date().toLocaleTimeString()} up ${systemInfo.uptime}, 1 user, load average: 0.15, 0.18, 0.12`];
        break;



      case 'cat /proc/cpuinfo':
      case 'lscpu':
        output = [
          'Architecture:        armv7l',
          'Byte Order:          Little Endian',
          `CPU(s):              4`,
          'Model name:          ARM Cortex-M7',
          'CPU MHz:             800.000',
          'BogoMIPS:            1600.00',
          'Features:            thumb fastmult vfp edsp'
        ];
        break;



      case 'cat experience':
        output = experience.flatMap(exp => [
          `\x1b[36m[${exp.period}]\x1b[0m \x1b[1m${exp.title}\x1b[0m`,
          ...exp.details.map(detail => `  ${detail}`),
          ''
        ]);
        break;

      case 'cat skills':
        output = [
          '\x1b[1mTechnical Skills Profile:\x1b[0m',
          '',
          ...skills.map(skill => {
            const bars = '█'.repeat(Math.floor(skill.level/10));
            const emptyBars = '░'.repeat(10 - Math.floor(skill.level/10));
            return `\x1b[32m${skill.name.padEnd(20)}\x1b[0m [${bars}${emptyBars}] \x1b[33m${skill.level}%\x1b[0m \x1b[90m(${skill.category})\x1b[0m`;
          })
        ];
        break;

      case 'ls projects':
      case 'ls -la projects/':
        output = [
          'total 16',
          'drwxr-xr-x  2 abhiraj abhiraj 4096 Dec 15 14:30 .',
          'drwxr-xr-x  8 abhiraj abhiraj 4096 Dec 15 14:30 ..',
          ...projects.map(p => 
            `${p.permissions}  1 abhiraj abhiraj ${p.size.padStart(8)} ${p.modified} \x1b[32m${p.name}\x1b[0m`
          )
        ];
        break;

      case 'cat projects':
        output = [
          '\x1b[1m\x1b[36mSELECTED PROJECTS PORTFOLIO\x1b[0m',
          '\x1b[90m════════════════════════════════════════════════════════════════════════\x1b[0m',
          '',
          '\x1b[1m\x1b[33m01. ESCOIN: Efficient Sparse CNN Inference\x1b[0m',
          '\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m',
          'GPU-accelerated sparse CNN implementation achieving 1.6x speedup',
          'over CUBLAS on AlexNet inference pipeline.',
          '\x1b[32m▸\x1b[0m Technologies: CUDA, C++, GPU Computing, CNN Optimization',
          '\x1b[32m▸\x1b[0m Status: Completed | Achievement: 350% performance improvement',
          '',
          '\x1b[1m\x1b[33m02. Connected Vehicles Simulation Tool\x1b[0m',
          '\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m',
          'KPIT Sparkle competition finalist project creating customizable',
          'platoon simulation for V2X communication testing.',
          '\x1b[32m▸\x1b[0m Technologies: Omnet++, SUMO, V2X Communication, Network Simulation',
          '\x1b[32m▸\x1b[0m Status: Completed | Achievement: Top 24 National Finalist',
          '',
          '\x1b[1m\x1b[33m03. Many Body Problem Simulation\x1b[0m',
          '\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m',
          'Parallelized OpenMP simulation of 1,000 particle collisions',
          'with 3D visualization using MayaVI.',
          '\x1b[32m▸\x1b[0m Technologies: OpenMP, C++, Python, MayaVI, Parallel Computing',
          '\x1b[32m▸\x1b[0m Status: Completed | Achievement: 720,000 iterations, 350% speedup',
          '',
          '\x1b[1m\x1b[33m04. AI-Based Fashion Generator\x1b[0m',
          '\x1b[90m────────────────────────────────────────────────────────────────────────\x1b[0m',
          'Inclusive AI fashion system accommodating various body types',
          'and styles, focusing on bias reduction in AI systems.',
          '\x1b[32m▸\x1b[0m Technologies: TensorFlow, Keras, OpenCV, Streamlit, Computer Vision',
          '\x1b[32m▸\x1b[0m Status: Completed | Achievement: Bias-aware dataset curation',
          ''
        ];
        break;

      case 'cat thesis':
        output = [
          '\x1b[1m\x1b[36mM.Tech Thesis: "Enhancing AV Safety through Advanced Control Systems"\x1b[0m',
          '\x1b[90m════════════════════════════════════════════════════════════════════════\x1b[0m',
          '',
          '\x1b[1mAbstract:\x1b[0m',
          'This research focuses on developing robust multi-sensor fusion algorithms',
          'for autonomous vehicle safety systems. The work involves real-time control',
          'system design, Hardware-in-the-Loop (HIL) simulation, and comprehensive',
          'safety validation using industry-standard protocols.',
          '',
          '\x1b[1mKey Contributions:\x1b[0m',
          '\x1b[32m▸\x1b[0m Novel sensor fusion algorithm with 15% improved accuracy',
          '\x1b[32m▸\x1b[0m Real-time implementation on embedded ARM Cortex-M7',
          '\x1b[32m▸\x1b[0m HIL framework for comprehensive safety testing',
          '\x1b[32m▸\x1b[0m CAN protocol optimization for automotive applications',
          '\x1b[32m▸\x1b[0m Published in IEEE Transactions on Vehicular Technology',
          '',
          '\x1b[1mTechnologies:\x1b[0m C++, MATLAB/Simulink, CAN Protocol, HIL Testing, ARM Cortex-M7'
        ];
        break;

      case 'echo $PATH':
        output = ['/usr/local/bin:/usr/bin:/bin:/opt/embedded/bin:/usr/local/arm/bin'];
        break;

      case 'which gcc':
        output = ['/usr/bin/gcc'];
        break;

      case 'date':
        output = [new Date().toString()];
        break;

      case 'id':
        output = [`uid=1000(${systemInfo.username}) gid=1000(${systemInfo.username}) groups=1000(${systemInfo.username}),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),116(lpadmin),126(sambashare)`];
        break;

      case 'w':
        output = [
          ` ${new Date().toTimeString().split(' ')[0]}  up ${systemInfo.uptime},  1 user,  load average: 0.15, 0.18, 0.12`,
          'USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT',
          `${systemInfo.username} pts/0    192.168.1.100    14:30    0.00s  0.04s  0.00s w`
        ];
        break;

      case 'env':
        output = [
          'PATH=/usr/local/bin:/usr/bin:/bin:/opt/embedded/bin',
          'HOME=/home/' + systemInfo.username,
          'USER=' + systemInfo.username,
          'SHELL=/bin/bash',
          'TERM=xterm-256color',
          'LANG=en_US.UTF-8',
          'EDITOR=vim',
          'CROSS_COMPILE=arm-linux-gnueabihf-',
          'ARCH=arm'
        ];
        break;

      case 'userland':
      case 'start userland':
      case './userland':
        output = [
          '\x1b[33mInitializing userland interface...\x1b[0m',
          '\x1b[32m[OK]\x1b[0m Loading portfolio modules',
          '\x1b[32m[OK]\x1b[0m Establishing GUI connection',
          '\x1b[32m[OK]\x1b[0m Launching application...'
        ];
        setTimeout(() => {
          onLaunchUserland();
        }, 1500);
        break;

      case 'help':
      case 'man terminal':
        output = [
          '\x1b[1mABHIRAJ PORTFOLIO SYSTEM - EMBEDDED TERMINAL v2.4.1\x1b[0m',
          '\x1b[90m══════════════════════════════════════════════════════════════\x1b[0m',
          '',
          '\x1b[1mSYSTEM COMMANDS:\x1b[0m',
          '  \x1b[32mls\x1b[0m                       list directory contents',
          '  \x1b[32mpwd\x1b[0m                      show current directory',
          '  \x1b[32mwhoami\x1b[0m                   display current user',
          '  \x1b[32muptime\x1b[0m                   system uptime and load',
          '',
          '\x1b[1mPORTFOLIO COMMANDS:\x1b[0m',
          '  \x1b[33mcat experience\x1b[0m           display work experience',
          '  \x1b[33mcat skills\x1b[0m               show technical skills',
          '  \x1b[33mcat projects\x1b[0m             view selected projects',
          '  \x1b[33mcat thesis\x1b[0m               view M.Tech thesis details',
          '  \x1b[33mcontact\x1b[0m                  display contact information',
          '',
          '\x1b[1mINTERFACE COMMANDS:\x1b[0m',
          '  \x1b[35muserland\x1b[0m                 launch graphical portfolio',
          '  \x1b[35mclear\x1b[0m                    clear terminal screen',
          '  \x1b[35mhistory\x1b[0m                  show command history',
          '  \x1b[35mexit\x1b[0m                     terminate session',
          '',
          '\x1b[1mNAVIGATION:\x1b[0m',
          '  \x1b[90m↑/↓ arrows\x1b[0m               command history navigation',
          '  \x1b[90mTab\x1b[0m                      command auto-completion',
          '  \x1b[90mCtrl+C\x1b[0m                   interrupt current command',
          ''
        ];
        break;

      case 'clear':
        setCommandHistory([]);
        setIsTyping(false);
        return;

      case 'history':
        output = commandHistory.map((cmd, i) => `\x1b[90m${(i + 1).toString().padStart(4)}\x1b[0m  ${cmd.input}`);
        break;

      case 'contact':
        output = [
          '\x1b[1m\x1b[36mCONTACT INFORMATION\x1b[0m',
          '\x1b[90m═══════════════════════════════════════════════════════════\x1b[0m',
          '',
          '\x1b[33mName:\x1b[0m      Abhiraj Rananajay Singh',
          '\x1b[33mEmail:\x1b[0m     jayeleven14@gmail.com',
          '\x1b[33mLinkedIn:\x1b[0m  linkedin.com/in/abhiraj-singh-4aa482238',
          '\x1b[33mGitHub:\x1b[0m    github.com/abhirajrs999',
          '\x1b[33mLocation:\x1b[0m  Kharagpur, West Bengal, India',
          '',
          '\x1b[32m▸\x1b[0m Specialization: Embedded Systems & Autonomous Vehicles',
          '\x1b[32m▸\x1b[0m Open to opportunities in real-time systems development',
          '\x1b[32m▸\x1b[0m Available for research collaboration and internships',
          ''
        ];
        break;

      case 'exit':
      case 'logout':
        output = [
          '\x1b[33mTerminating session...\x1b[0m',
          '\x1b[90mlogout\x1b[0m',
          '',
          '\x1b[1mThank you for exploring the portfolio!\x1b[0m'
        ];
        break;

      default:
        if (cmd.trim()) {
          output = [
            `\x1b[31mbash: ${cmd}: command not found\x1b[0m`,
            '\x1b[90mType \x1b[0m\x1b[33mhelp\x1b[0m\x1b[90m for available commands\x1b[0m'
          ];
        }
        break;
    }

    const executionTime = Date.now() - startTime;
    
    if (output.length > 0) {
      setCommandHistory(prev => [...prev, { 
        input: cmd, 
        output, 
        timestamp, 
        executionTime 
      }]);
    }
    
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        executeCommand(currentInput);
      }
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Basic tab completion
      const commands = ['ls', 'cat', 'bio', 'bio --summary', 'help', 'clear', 'userland', 'contact', 'pwd', 'whoami', 'date', 'id', 'w', 'env', 'echo'];
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
      if (matches.length === 1) {
        setCurrentInput(matches[0]);
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setCurrentInput('');
      setIsTyping(false);
    }
  };

  return (
    <div className="linux-terminal" onClick={() => inputRef.current?.focus()}>
      {/* Welcome message */}
      <div className="terminal-line">abhiraj@portfolio-sys | uptime: 0 min</div>
      <div className="terminal-line">Welcome to Abhiraj's Portfolio System v1.0</div>
      <div className="terminal-line">Type 'help' for available commands or 'userland' to launch boring version</div>
      <div className="terminal-line"></div>

      {/* Command history */}
      {commandHistory.map((cmd, index) => (
        <div key={index}>
          <div className="terminal-line">
            {systemInfo.username}@{systemInfo.hostname}:{currentDirectory}$ {cmd.input}
          </div>
          {cmd.output.map((line, lineIndex) => (
            <div key={lineIndex} className="terminal-line">{line.replace(/\x1b\[[0-9;]*m/g, '')}</div>
          ))}
        </div>
      ))}

      {/* Current input line */}
      <div className="terminal-line">
        {systemInfo.username}@{systemInfo.hostname}:{currentDirectory}$ <span className="typed-text">{currentInput}</span><span className="terminal-cursor">█</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="hidden-input"
          autoComplete="off"
          spellCheck="false"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;