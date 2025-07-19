import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sun, Moon, Github, Twitter } from 'lucide-react';
import * as THREE from 'three';

// 3D Neural Network Graphic Component
const ThreeDGraphic = () => {
  const mountRef = useRef(null);

  const createScene = useCallback(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(100, 100); 
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create nodes (neurons)
    const nodes = [];
    const numNodes = 15;
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.3, metalness: 0.7 });

    for (let i = 0; i < numNodes; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
      nodes.push(node);
      scene.add(node);
    }

    // Create connections (lines)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x999999, transparent: true, opacity: 0.2 });
    const connections = [];

    for (let i = 0; i < numNodes; i++) {
      for (let j = i + 1; j < numNodes; j++) {
        if (nodes[i].position.distanceTo(nodes[j].position) < 1.0) { // Connect if close enough
          const points = [];
          points.push(nodes[i].position);
          points.push(nodes[j].position);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
    }

    camera.position.z = 2;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the entire scene slightly
      scene.rotation.x += 0.001;
      scene.rotation.y += 0.001;

      // Subtle node movement
      nodes.forEach((node, index) => {
        node.position.y += Math.sin(Date.now() * 0.0005 + index) * 0.001;
        node.position.x += Math.cos(Date.now() * 0.0005 + index) * 0.001;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });

    if (mountRef.current) {
      resizeObserver.observe(mountRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      nodeGeometry.dispose(); // Dispose node geometry
      nodeMaterial.dispose(); // Dispose node material
      lineMaterial.dispose(); // Dispose line material
      connections.forEach(line => line.geometry.dispose()); // Dispose line geometries
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    createScene();
  }, [createScene]);

  return <div ref={mountRef} className="w-24 h-24 md:w-32 md:h-32"></div>; // Container for the 3D graphic
};


// Main App Component
const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect to set initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (!savedTheme && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
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
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
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
    // Main container with Tailwind CSS classes for styling and responsiveness
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500 font-inter antialiased">
      <div className="max-w-xl mx-auto px-6 py-12 md:py-16 flex flex-col"> {/* Adjusted max-w-xl here */}
        {/* Header Section */}
        <header className="relative flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-gray-200 dark:border-gray-700 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-1 text-gray-900 dark:text-white">Mahad Sial</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">Mathematics & Computer Science Student</p>
          </div>
          {/* 3D Graphic and Theme Switch Button */}
          <div className="absolute top-0 right-0 flex items-center space-x-4">
            <div className="hidden md:block"> {/* Hide 3D graphic on small screens for performance/layout */}
              <ThreeDGraphic />
            </div>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="mt-6 md:mt-0 w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 bg-gray-200 dark:bg-gray-700 shadow-inner"
            >
              <div
                className={`w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-6 bg-gray-100' : 'translate-x-0 bg-gray-700'
                } flex items-center justify-center`}
              >
                {isDarkMode ? <Sun size={18} className="text-gray-800" /> : <Moon size={18} className="text-gray-100" />}
              </div>
            </button>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-x-8 gap-y-4 mb-20">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium relative group transition-colors duration-200 text-lg"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href).scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* About Section */}
          <section id="about" className="mb-24">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">About Mahad Sial</h2>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              <p className="mb-5">I'm Mahad Sial, an undergraduate student specializing in mathematics and computer science, with a keen interest in artificial intelligence. My studies are focused on building a strong foundation in mathematical principles and programming, crucial for understanding and contributing to AI and machine learning.</p>
              <p>I am systematically building my skills in Python, linear algebra, and calculus, actively preparing for advanced studies in machine learning and deep learning. My core interests lie in exploring how learning algorithms work, understanding the efficacy of neural networks, and developing approaches to building reliable AI systems.</p>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mb-24">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">Projects by Mahad Sial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:translate-y-[-5px] transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">{project.content}</p>
                  {project.link ? (
                    <a
                      href={project.link}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-base flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.status}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </a>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 font-medium text-base">{project.status}</span>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mb-24">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white tracking-tight">Connect with Mahad Sial</h2>
            <div className="flex flex-wrap gap-8 mt-8">
              <a
                href="https://github.com/MahadSial"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-lg flex items-center group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" /> GitHub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://twitter.com/mahadsil"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium text-lg flex items-center group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} className="mr-2 group-hover:scale-110 transition-transform duration-200" /> Twitter
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
