import React, { useState, useEffect } from 'react';
import { Sun, Moon, Github, Twitter } from 'lucide-react';

// Pixel Art Plant Component
const PixelPlant = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const plantFrames = [
    // Frame 0 - Small sprout
    `data:image/svg+xml,${encodeURIComponent(`
      <svg width="48" height="64" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .pixel { shape-rendering: crispEdges; }
          </style>
        </defs>
        <rect x="16" y="48" width="16" height="16" fill="#8B4513" class="pixel"/>
        <rect x="14" y="50" width="20" height="12" fill="#A0522D" class="pixel"/>
        <rect x="15" y="51" width="18" height="10" fill="#CD853F" class="pixel"/>
        <rect x="16" y="48" width="16" height="4" fill="#654321" class="pixel"/>
        <rect x="23" y="44" width="2" height="8" fill="#228B22" class="pixel"/>
        <rect x="21" y="42" width="2" height="2" fill="#32CD32" class="pixel"/>
        <rect x="25" y="42" width="2" height="2" fill="#32CD32" class="pixel"/>
      </svg>
    `)}`,
    
    // Frame 1 - Growing
    `data:image/svg+xml,${encodeURIComponent(`
      <svg width="48" height="64" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .pixel { shape-rendering: crispEdges; }
          </style>
        </defs>
        <rect x="16" y="48" width="16" height="16" fill="#8B4513" class="pixel"/>
        <rect x="14" y="50" width="20" height="12" fill="#A0522D" class="pixel"/>
        <rect x="15" y="51" width="18" height="10" fill="#CD853F" class="pixel"/>
        <rect x="16" y="48" width="16" height="4" fill="#654321" class="pixel"/>
        <rect x="23" y="36" width="2" height="16" fill="#228B22" class="pixel"/>
        <rect x="19" y="38" width="4" height="4" fill="#32CD32" class="pixel"/>
        <rect x="25" y="38" width="4" height="4" fill="#32CD32" class="pixel"/>
        <rect x="21" y="34" width="6" height="4" fill="#228B22" class="pixel"/>
      </svg>
    `)}`,
    
    // Frame 2 - Medium growth
    `data:image/svg+xml,${encodeURIComponent(`
      <svg width="48" height="64" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .pixel { shape-rendering: crispEdges; }
          </style>
        </defs>
        <rect x="16" y="48" width="16" height="16" fill="#8B4513" class="pixel"/>
        <rect x="14" y="50" width="20" height="12" fill="#A0522D" class="pixel"/>
        <rect x="15" y="51" width="18" height="10" fill="#CD853F" class="pixel"/>
        <rect x="16" y="48" width="16" height="4" fill="#654321" class="pixel"/>
        <rect x="23" y="28" width="2" height="24" fill="#228B22" class="pixel"/>
        <rect x="17" y="32" width="6" height="6" fill="#32CD32" class="pixel"/>
        <rect x="25" y="32" width="6" height="6" fill="#32CD32" class="pixel"/>
        <rect x="19" y="26" width="8" height="6" fill="#228B22" class="pixel"/>
        <rect x="21" y="38" width="6" height="4" fill="#90EE90" class="pixel"/>
      </svg>
    `)}`,
    
    // Frame 3 - Full grown (bushy like reference)
    `data:image/svg+xml,${encodeURIComponent(`
      <svg width="48" height="64" viewBox="0 0 48 64" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>
            .pixel { shape-rendering: crispEdges; }
          </style>
        </defs>
        <rect x="16" y="48" width="16" height="16" fill="#8B4513" class="pixel"/>
        <rect x="14" y="50" width="20" height="12" fill="#A0522D" class="pixel"/>
        <rect x="15" y="51" width="18" height="10" fill="#CD853F" class="pixel"/>
        <rect x="16" y="48" width="16" height="4" fill="#654321" class="pixel"/>
        <rect x="23" y="20" width="2" height="32" fill="#228B22" class="pixel"/>
        <rect x="15" y="24" width="8" height="8" fill="#32CD32" class="pixel"/>
        <rect x="25" y="24" width="8" height="8" fill="#32CD32" class="pixel"/>
        <rect x="17" y="16" width="12" height="8" fill="#228B22" class="pixel"/>
        <rect x="19" y="32" width="8" height="6" fill="#90EE90" class="pixel"/>
        <rect x="13" y="28" width="6" height="6" fill="#32CD32" class="pixel"/>
        <rect x="29" y="28" width="6" height="6" fill="#32CD32" class="pixel"/>
        <rect x="21" y="12" width="6" height="4" fill="#228B22" class="pixel"/>
      </svg>
    `)}`
  ];

  return (
    // FIX 1: Changed 'top-4' to 'top-16' to move the plant lower
    <div className="fixed top-16 right-4 z-10">
      <img 
        src={plantFrames[frame]} 
        alt="Animated pixel plant" 
        className="w-12 h-16 image-rendering-pixelated"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
};

// Main App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // FIX 2: Removed localStorage usage. Now sets initial theme from system preference only.
  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  // Navigation links for smooth scrolling
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  // Project data
  const projects = [
    {
      title: 'Study Tracker CLI',
      content: 'A command-line tool for logging daily study minutes and visualizing weekly progress, developed as I learned Python fundamentals and command-line interface concepts.',
      link: 'https://github.com/MahadSial/study_tracker',
      status: 'View Project →',
    },
    {
      title: 'Algorithm Implementations',
      content: 'From-scratch implementations of fundamental algorithms, created to deepen my understanding of computational complexity and core mathematical principles.',
      status: 'In Progress',
    },
    {
      title: 'Mathematical Computing',
      content: 'Explorations in numerical methods and linear algebra, aimed at building intuitive understanding and practical skills for machine learning concepts.',
      status: 'Planned',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 font-mono">
      {/* Animated Pixel Plant */}
      <PixelPlant />
      
      <div className="max-w-2xl mx-auto px-8 py-16">
        {/* Header Section */}
        <header className="flex justify-between items-start mb-16">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Mahad Sial</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">Mathematics & Computer Science Student</p>
          </div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            className="w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-700"
          >
            <div
              className={`w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${
                isDarkMode ? 'translate-x-6 bg-gray-100' : 'translate-x-0 bg-gray-800'
              } flex items-center justify-center`}
            >
              {isDarkMode ? <Sun size={12} className="text-gray-800" /> : <Moon size={12} className="text-gray-100" />}
            </div>
          </button>
        </header>

        {/* Navigation */}
        <nav className="flex gap-8 mb-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white relative group transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Main Content */}
        <main>
          {/* About Section */}
          <section id="about" className="mb-20">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">About</h2>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
              <p>I'm an undergraduate student specializing in mathematics and computer science, with a keen interest in artificial intelligence. My studies are focused on building a strong foundation in mathematical principles and programming, crucial for understanding and contributing to AI and machine learning.</p>
              <p>I am systematically building my skills in Python, linear algebra, and calculus, actively preparing for advanced studies in machine learning and deep learning. My core interests lie in exploring how learning algorithms work, understanding the efficacy of neural networks, and developing approaches to building reliable AI systems.</p>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-20">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Projects</h2>
            <div className="space-y-8">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="border-l-2 border-gray-200 dark:border-gray-700 pl-4"
                >
                  <h3 className="text-base font-medium mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{project.content}</p>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.status}
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{project.status}</span>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <h2 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Connect</h2>
            <div className="flex gap-6">
              <a
                href="https://github.com/MahadSial"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={16} className="mr-2" /> GitHub
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://twitter.com/mahadsil"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center group transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={16} className="mr-2" /> Twitter
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;