import React, { useState, useEffect } from 'react';

const SimplePortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'experience', 'research', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection('home')}
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              Abhiraj Singh
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'education', label: 'Education' },
                { id: 'experience', label: 'Experience' },
                { id: 'research', label: 'Research' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    activeSection === id 
                      ? 'text-blue-600 bg-blue-50 shadow-sm' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <span className={`block h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 bg-white">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'education', label: 'Education' },
                { id: 'experience', label: 'Experience' },
                { id: 'research', label: 'Research' },
                { id: 'projects', label: 'Projects' },
                { id: 'skills', label: 'Skills' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8 relative">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                AS
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full animate-pulse bg-gradient-to-br from-blue-400 to-purple-500 opacity-75 -z-10"></div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Abhiraj Rananajay Singh
            </h1>
            
            <div className="text-xl md:text-2xl text-gray-600 mb-6 font-light">
              Transportation Engineering • Autonomous Vehicle Safety • Embedded Systems
            </div>
            
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Recent graduate of IIT Kharagpur pioneering autonomous vehicle safety through 
              multi-sensor fusion, real-time perception-based control systems, and cutting-edge 
              Hardware-in-the-Loop validation methodologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 font-semibold"
              >
                Get In Touch
              </button>
              <a
                href="https://drive.google.com/file/d/1Kjl_7HsOsVBS9BjyOkJhA9jKrTczkRpw/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                I am a recent graduate of the Indian Institute of Technology (IIT) Kharagpur, 
                pursuing a dual degree (B.Tech & M.Tech) in Civil Engineering with specialization 
                in Transportation Engineering, along with a minor in Computer Science.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                My research focuses on enhancing autonomous vehicle safety through multi-sensor 
                integration and real-time perception-based control systems. I'm passionate about 
                bridging the gap between algorithmic innovation and demonstrable on-road robustness 
                using Hardware-in-the-Loop validation methodologies.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Awarded the Chanakya Fellowship 2024 by AI4CPS, recognizing excellence in 
                artificial intelligence and cyber-physical systems research.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">
                {['Autonomous Vehicles', 'Multi-Sensor Fusion', 'Real-time Systems', 'GPU Computing', 'Control Systems'].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  AS
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Quick Facts</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Institution:</span>
                  <span className="font-semibold">IIT Kharagpur</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Research Focus:</span>
                  <span className="font-semibold">AV Safety</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-semibold">Transportation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Graduation:</span>
                  <span className="font-semibold">2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CGPA:</span>
                  <span className="font-semibold">8.13/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Education</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                    IIT
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        M.Tech Dual Degree in Civil Engineering (Transportation)
                      </h3>
                      <p className="text-blue-600 font-semibold">Indian Institute of Technology, Kharagpur</p>
                    </div>
                    <div className="text-gray-600 font-medium">2020 – 2025</div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>CGPA:</strong> 8.13/10 • <strong>Minor:</strong> Computer Science & Engineering
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold text-gray-900">Thesis:</span>
                      <span className="text-gray-700"> "Enhancing Autonomous Vehicle Safety through Multi-Sensor Integration and Real-Time Perception-Based Control Systems"</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Research Focus:</span>
                      <span className="text-gray-700"> Multi-sensor fusion algorithms, Hardware-in-the-Loop validation, Real-time embedded systems</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900">Key Achievements:</span>
                      <span className="text-gray-700"> Chanakya Fellowship 2024, KPIT Sparkle Top 24 National Finalist</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Education */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Senior Secondary (2020)</h4>
                <p className="text-blue-600 font-medium mb-2">D.A.V. International School, Kharghar</p>
                <p className="text-gray-700"><strong>Percentage:</strong> 96.6%</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Secondary (2018)</h4>
                <p className="text-blue-600 font-medium mb-2">D.A.V. International School, Kharghar</p>
                <p className="text-gray-700"><strong>Percentage:</strong> 95.6%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Research Intern",
                company: "Stanford University",
                mentor: "Prof. Pascal Geldsetzer",
                period: "May 2023 - August 2023",
                description: "Developed automated machine learning solutions for geotagged data to predict Maternal and Child Health (MCH) indicators in low-income countries.",
                achievements: [
                  "Surpassed previous research results by >50% increment in confidence score (MCRMSE)",
                  "Enhanced feature selection by 98% using Random Forest Regressor and PCA",
                  "Achieved mean column RMSE of 11.81 via MLP algorithm with LSTM implementation"
                ],
                technologies: ["Python", "Machine Learning", "LSTM", "Random Forest", "PCA"]
              },
              {
                title: "Research Intern",
                company: "IIM Ahmedabad",
                mentor: "Prof. Indranil Bose",
                period: "June 2022 - September 2022",
                description: "Conducted sentiment analysis on Google Play Store applications to gain insights into user attitudes and emotions.",
                achievements: [
                  "Developed Python scripts using Beautiful Soup to extract features from 10,000+ apps",
                  "Built LDA model achieving coherence score of 0.61 for topic analysis",
                  "Implemented VADER sentiment analysis for accurate polarity determination"
                ],
                technologies: ["Python", "Beautiful Soup", "LDA", "VADER", "NLP"]
              },
              {
                title: "Business Analyst Intern",
                company: "Indian School of Business",
                mentor: "Prof. Prasanna Tantri",
                period: "June 2022 - August 2022",
                description: "Formulated and tested CAPM and Fama-French models on Tata Motors' daily returns (1996-2019).",
                achievements: [
                  "Analyzed 5,901 data points of daily returns over 23 years",
                  "Computed momentum, size, value factors and market risk premium",
                  "Performed statistical tests: Breusch-Pagan LM, Breusch-Godfrey, and VIF"
                ],
                technologies: ["Stata", "CAPM", "Fama-French", "Statistical Analysis"]
              }
            ].map((exp, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                    {exp.mentor && <p className="text-gray-600">Under: {exp.mentor}</p>}
                  </div>
                  <div className="text-gray-600 font-medium mt-2 md:mt-0">{exp.period}</div>
                </div>
                
                <p className="text-gray-700 mb-4">{exp.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Master's Thesis Research</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enhancing Autonomous Vehicle Safety through Multi-Sensor Integration and Real-Time Perception-Based Control Systems
              </h3>
              <p className="text-gray-600">Under supervision of Prof. Bhargab Maitra and Prof. Soumyajit Dey</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Objectives</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Real-Time Sensor Fusion: Deploy camera–radar fusion on NVIDIA Jetson Orin
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Perception-Based Control: Implement ACC/AEB on TI F28379D ECU
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Collision-Risk Mitigation: Achieve 30% reduction in rear-end collision probability
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    HIL Validation: Demonstrate closed-loop stability with production-grade hardware
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h4>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="font-semibold text-blue-900">MLP Distance Estimation</p>
                    <p className="text-blue-700">MAE: 0.50m, RMSE: 0.65m, R²: 0.94</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="font-semibold text-green-900">Jetson Orin Performance</p>
                    <p className="text-green-700">GPU-accelerated: 30 FPS (25x speedup)</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="font-semibold text-purple-900">AEB Response</p>
                    <p className="text-purple-700">TTC threshold: 1.5s, 0.6g braking force</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Technical Implementation</h4>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Perception Module</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• YOLOv11x object detection</li>
                    <li>• MLP distance estimation</li>
                    <li>• Camera-radar fusion</li>
                    <li>• NVIDIA Jetson Orin GPU</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Control System</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Adaptive Cruise Control</li>
                    <li>• Automatic Emergency Braking</li>
                    <li>• TI F28379D microcontroller</li>
                    <li>• Real-time CAN communication</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800 mb-2">Validation</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• IPG CarMaker simulation</li>
                    <li>• Hardware-in-the-Loop testing</li>
                    <li>• Production-grade hardware</li>
                    <li>• Real-time performance validation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Selected Projects</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "ESCOIN: Efficient Sparse CNN Inference",
                description: "GPU-accelerated sparse CNN implementation achieving 1.6x speedup over CUBLAS on AlexNet inference pipeline.",
                technologies: ["CUDA", "C++", "GPU Computing", "CNN Optimization"],
                status: "Completed",
                highlight: true,
                achievements: ["350% performance improvement", "Optimized AlexNet pipeline", "GPU memory optimization"]
              },
              {
                title: "Connected Vehicles Simulation Tool",
                description: "KPIT Sparkle competition finalist project creating customizable platoon simulation for V2X communication testing.",
                technologies: ["Omnet++", "SUMO", "V2X Communication", "Network Simulation"],
                status: "Completed",
                highlight: true,
                achievements: ["Top 24 National Finalist", "Real-time scenario simulation", "Attack resilience testing"]
              },
              {
                title: "Many Body Problem Simulation",
                description: "Parallelized OpenMP simulation of 1,000 particle collisions with 3D visualization using MayaVI.",
                technologies: ["OpenMP", "C++", "Python", "MayaVI", "Parallel Computing"],
                status: "Completed",
                highlight: false,
                achievements: ["720,000 iterations", "350% performance improvement", "3D trajectory visualization"]
              },
              {
                title: "AI-Based Fashion Generator",
                description: "Inclusive AI fashion system accommodating various body types and styles, focusing on bias reduction in AI systems.",
                technologies: ["TensorFlow", "Keras", "OpenCV", "Streamlit", "Computer Vision"],
                status: "Completed",
                highlight: false,
                achievements: ["Bias-aware dataset curation", "Multi-body type support", "Real-time generation"]
              }
            ].map((project, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg ${
                  project.highlight 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-xs font-medium border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Programming Languages",
                skills: [
                  { name: "C++", level: 95 },
                  { name: "Python", level: 90 },
                  { name: "C", level: 95 },
                  { name: "MATLAB", level: 85 },
                  { name: "JavaScript", level: 75 },
                  { name: "SQL", level: 70 }
                ]
              },
              {
                category: "AI/ML & Computing",
                skills: [
                  { name: "TensorFlow", level: 85 },
                  { name: "PyTorch", level: 80 },
                  { name: "OpenCV", level: 85 },
                  { name: "CUDA", level: 80 },
                  { name: "Scikit-Learn", level: 85 },
                  { name: "YOLO", level: 90 }
                ]
              },
              {
                category: "Embedded & Automotive",
                skills: [
                  { name: "ARM Cortex", level: 90 },
                  { name: "CarMaker", level: 90 },
                  { name: "CAN Protocol", level: 85 },
                  { name: "HIL Testing", level: 90 },
                  { name: "Real-time OS", level: 85 },
                  { name: "Sensor Fusion", level: 90 }
                ]
              },
              {
                category: "Tools & Platforms",
                skills: [
                  { name: "Git", level: 85 },
                  { name: "Linux", level: 85 },
                  { name: "AWS", level: 70 },
                  { name: "Simulink", level: 90 },
                  { name: "AutoCAD", level: 75 },
                  { name: "Apache Spark", level: 70 }
                ]
              }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-xs text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Awards & Achievements */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Awards & Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Chanakya Fellowship 2024",
                  organization: "AI4CPS",
                  description: "Excellence in artificial intelligence and cyber-physical systems research"
                },
                {
                  title: "KPIT Sparkle National Finalist",
                  organization: "KPIT Technologies",
                  description: "Top 24 finalist among 1300+ teams across India"
                },
                {
                  title: "Mathematics Olympiad",
                  organization: "SOF",
                  description: "4th rank in Maharashtra & Goa, 12th International rank"
                },
                {
                  title: "Science Olympiad",
                  organization: "SOF",
                  description: "17th rank in Maharashtra & Goa zone"
                },
                {
                  title: "Vidyarthi Vigyan Manthan",
                  organization: "VVM",
                  description: "Qualified for State Level Camp (Level-III)"
                },
                {
                  title: "Chess Championship",
                  organization: "DSO",
                  description: "3rd place in District Level (U-19) tournament"
                }
              ].map((award, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                      🏆
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{award.title}</h4>
                    <p className="text-blue-600 font-medium mb-2">{award.organization}</p>
                    <p className="text-gray-600 text-sm">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              I'd love to hear from you! Whether you want to discuss autonomous vehicle research, 
              embedded systems challenges, or potential collaboration opportunities.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 font-bold">@</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <a href="mailto:jayeleven14@gmail.com" className="text-blue-600 hover:text-blue-700 transition-colors">
                        jayeleven14@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600 font-bold">📱</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <a href="tel:+918928567293" className="text-blue-600 hover:text-blue-700 transition-colors">
                        +91 8928567293
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold">📍</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Location</p>
                      <p className="text-gray-600">IIT Kharagpur, West Bengal, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-4">
                  <a
                    href="https://drive.google.com/file/d/1Kjl_7HsOsVBS9BjyOkJhA9jKrTczkRpw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-center font-semibold"
                  >
                    Download CV
                  </a>
                  <a
                    href="#"
                    className="block w-full border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 text-center font-semibold"
                  >
                    View Research Papers
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Connect</h3>
                <div className="flex gap-4 justify-center">
                  <a
                    href="mailto:jayeleven14@gmail.com"
                    className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    📧
                  </a>
                  <a
                    href="https://github.com/abhirajrs999?tab=repositories"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                  >
                    GH
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abhiraj-singh-4aa482238/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-700 text-white rounded-lg flex items-center justify-center hover:bg-blue-800 transition-colors"
                  >
                    IN
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Abhiraj Singh</h3>
              <p className="text-gray-400 mb-4">
                M.Tech student specializing in autonomous vehicle safety and real-time 
                embedded systems at IIT Kharagpur. Passionate about advancing transportation 
                technology through innovative control systems and multi-sensor fusion.
              </p>
              <div className="flex gap-4">
                <a href="mailto:jayeleven14@gmail.com" className="text-gray-400 hover:text-white transition-colors">Email</a>
                <a href="https://github.com/abhirajrs999?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/abhiraj-singh-4aa482238/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['About', 'Education', 'Experience', 'Research', 'Projects', 'Skills', 'Contact'].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Research Interests</h3>
              <div className="space-y-2 text-gray-400">
                <p>• Autonomous Vehicle Safety</p>
                <p>• Multi-Sensor Fusion</p>
                <p>• Real-time Embedded Systems</p>
                <p>• Hardware-in-the-Loop Testing</p>
                <p>• GPU-Accelerated Computing</p>
                <p>• Transportation Engineering</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <button
              onClick={() => scrollToSection('home')}
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimplePortfolio;