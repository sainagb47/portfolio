import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';

function App() {
  // -------------------------------------------------------------
  // States
  // -------------------------------------------------------------
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [typingText, setTypingText] = useState('');
  
  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // -------------------------------------------------------------
  // Typing Effect Options
  // -------------------------------------------------------------
  const roles = [
    "AI/ML Enthusiast",
    "Computer Science Student",
    "Full-Stack Developer",
    "Problem Solver"
  ];

  // Typewriter effect
  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    let timer;

    const handleType = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        setTypingText(currentRole.substring(0, charIndex - 1));
        charIndex--;
        typingSpeed = 50; // Erase faster
      } else {
        setTypingText(currentRole.substring(0, charIndex + 1));
        charIndex++;
        typingSpeed = 100; // Type normal
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pause before next word
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, 1000);

    return () => clearTimeout(timer);
  }, []);

  // -------------------------------------------------------------
  // Window Scroll & Intersection Listeners
  // -------------------------------------------------------------
  useEffect(() => {
    // Header Scroll Shadow
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderScrolled(true);
      } else {
        setIsHeaderScrolled(false);
      }

      // Active Section Highlights
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 200; // header height offset

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Trigger Animations (IntersectionObserver)
  useEffect(() => {
    const scrollTriggers = document.querySelectorAll('.scroll-trigger');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          scrollObserver.unobserve(entry.target); // Animates once
        }
      });
    }, observerOptions);

    scrollTriggers.forEach(el => {
      scrollObserver.observe(el);
    });

    return () => {
      scrollTriggers.forEach(el => {
        scrollObserver.unobserve(el);
      });
    };
  }, []);

  // -------------------------------------------------------------
  // Form Submission
  // -------------------------------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: '', text: '' });

    // Mock API submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus({
        type: 'success',
        text: `Thank you, ${formData.name}! Your message has been sent successfully.`
      });
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormStatus({ type: '', text: '' });
      }, 5000);
    }, 1800);
  };

  return (
    <>
      {/* Particle Canvas Background */}
      <ParticleBackground />

      {/* Header / Navigation */}
      <header id="header" className={isHeaderScrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <a href="#" className="logo">
            <span class="gradient-text">Sainag</span>.dev
          </a>
          <button 
            className={`mobile-nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            aria-label="Toggle Navigation" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a 
                  href="#home" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#certifications" 
                  className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container hero-container">
            <div className="hero-content">
              <span className="badge fade-in-up">Welcome to my Space</span>
              <h1 className="fade-in-up delay-1">Hi, I'm <span className="gradient-text">Barre Sainag</span></h1>
              <h2 className="typing-container fade-in-up delay-2">
                I am a <span className="accent-text">{typingText}</span><span className="cursor">|</span>
              </h2>
              <p className="hero-desc fade-in-up delay-3">
                AI/ML-focused Computer Science student passionate about building intelligent systems, scalable applications, and solving real-world problems using modern technologies.
              </p>
              <div className="hero-actions fade-in-up delay-4">
                <a href="#projects" className="btn btn-primary">View Projects <i className="fa-solid fa-arrow-right"></i></a>
                <a href="SAINAG_RESUME (1).pdf" className="btn btn-secondary" target="_blank"><i className="fa-solid fa-download"></i> Resume</a>
              </div>
              <div className="social-links fade-in-up delay-5">
                <a href="https://github.com/sainagb47" target="_blank" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://linkedin.com/in/barre-sainag" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                <a href="mailto:sainagb47@gmail.com" aria-label="Email"><i className="fa-regular fa-envelope"></i></a>
              </div>
            </div>
            <div className="hero-image-container fade-in-up delay-2">
              <div className="profile-frame">
                <img src="profile.png" alt="Barre Sainag Profile Photo" className="profile-img" />
                <div className="glow-ring"></div>
              </div>
            </div>
          </div>
          <a href="#about" className="scroll-down-indicator" aria-label="Scroll Down">
            <span className="mouse">
              <span className="wheel"></span>
            </span>
          </a>
        </section>

        {/* About Section */}
        <section id="about" className="about-section section">
          <div className="container">
            <div className="section-title-wrapper scroll-trigger">
              <span className="subtitle">01. Biography</span>
              <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
              <div className="section-line"></div>
            </div>
            
            <div className="about-grid">
              <div className="about-text scroll-trigger">
                <h3>My Journey & Career Objective</h3>
                <p>
                  I am a B.Tech Computer Science student specializing in <strong>Artificial Intelligence and Machine Learning</strong>. With strong foundations in Data Structures, Object-Oriented Programming, and Machine Learning algorithms, I strive to build scalable applications that bridge the gap between complex algorithms and user experience.
                </p>
                <p>
                  I am passionate about continuous learning, coding, and participating in hackathons to tackle challenging problems and build innovative solutions.
                </p>
                <div className="about-quote">
                  <i className="fa-solid fa-quote-left quote-icon"></i>
                  <p>Passionate about building intelligent systems and solving real-world problems using modern technologies.</p>
                </div>
              </div>
              
              <div className="about-details scroll-trigger">
                <div className="info-card education-card">
                  <div className="card-icon"><i className="fa-solid fa-graduation-cap"></i></div>
                  <div className="card-content">
                    <h3>Education Profile</h3>
                    <div className="education-item">
                      <span className="edu-duration">2023 – 2027</span>
                      <h4>B.Tech — Computer Science Engineering (AI & ML)</h4>
                      <p className="edu-inst">Prasad V. Potluri Siddhartha Institute of Technology</p>
                      <div className="cgpa-badge">
                        <span className="cgpa-label">CGPA:</span>
                        <span className="cgpa-val">8.86 / 10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section section">
          <div className="container">
            <div className="section-title-wrapper scroll-trigger">
              <span className="subtitle">02. Expertise</span>
              <h2 class="section-title">Technical <span className="gradient-text">Skills</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="skills-grid">
              {/* Programming */}
              <div className="skill-category-card scroll-trigger">
                <div className="category-header">
                  <i className="fa-solid fa-code icon-blue"></i>
                  <h3>Programming</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge"><i className="fa-brands fa-java color-java"></i> Java</div>
                  <div className="skill-badge"><i className="fa-brands fa-python color-python"></i> Python</div>
                  <div className="skill-badge"><i className="fa-solid fa-c"></i> C Lang</div>
                </div>
              </div>

              {/* AI & ML */}
              <div className="skill-category-card scroll-trigger">
                <div className="category-header">
                  <i className="fa-solid fa-brain icon-purple"></i>
                  <h3>AI / ML</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge">Supervised Learning</div>
                  <div className="skill-badge">Unsupervised Learning</div>
                  <div className="skill-badge">CNN (Convolutional Networks)</div>
                  <div className="skill-badge">NLP (Natural Language Processing)</div>
                </div>
              </div>

              {/* Web Technologies */}
              <div className="skill-category-card scroll-trigger">
                <div className="category-header">
                  <i className="fa-solid fa-laptop-code icon-cyan"></i>
                  <h3>Web Technologies</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge"><i className="fa-brands fa-html5 color-html"></i> HTML</div>
                  <div className="skill-badge"><i className="fa-brands fa-css3-alt color-css"></i> CSS</div>
                  <div className="skill-badge"><i className="fa-brands fa-js color-js"></i> JavaScript</div>
                  <div className="skill-badge"><i className="fa-brands fa-react color-react"></i> React</div>
                  <div className="skill-badge">FastAPI</div>
                </div>
              </div>

              {/* Databases */}
              <div className="skill-category-card scroll-trigger">
                <div className="category-header">
                  <i className="fa-solid fa-database icon-orange"></i>
                  <h3>Databases</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge">MySQL</div>
                  <div className="skill-badge">MongoDB</div>
                </div>
              </div>

              {/* Core CS */}
              <div className="skill-category-card scroll-trigger width-2">
                <div className="category-header">
                  <i className="fa-solid fa-gears icon-red"></i>
                  <h3>Core Computer Science</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge">Data Structures & Algorithms (DSA)</div>
                  <div className="skill-badge">Object-Oriented Programming (OOP)</div>
                  <div className="skill-badge">Operating Systems (OS)</div>
                  <div className="skill-badge">Computer Networks</div>
                </div>
              </div>

              {/* Tools */}
              <div className="skill-category-card scroll-trigger">
                <div className="category-header">
                  <i className="fa-solid fa-toolbox icon-green"></i>
                  <h3>Tools & Environment</h3>
                </div>
                <div className="skill-badges">
                  <div className="skill-badge"><i className="fa-brands fa-git-alt color-git"></i> Git</div>
                  <div className="skill-badge"><i className="fa-brands fa-github"></i> GitHub</div>
                  <div className="skill-badge">VS Code</div>
                  <div className="skill-badge">MySQL Workbench</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section section">
          <div className="container">
            <div className="section-title-wrapper scroll-trigger">
              <span className="subtitle">03. Portfolio</span>
              <h2 className="section-title">Featured <span class="gradient-text">Projects</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="projects-grid">
              {/* Project 1: Flash Coach */}
              <div className="project-card scroll-trigger">
                <div className="project-card-inner">
                  <div className="project-header">
                    <div className="project-icon-box">
                      <i className="fa-solid fa-microphone-lines project-icon"></i>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/sainagb47/Just-In-Time_Flash-Coach" target="_blank" aria-label="GitHub Repository"><i className="fa-brands fa-github"></i></a>
                    </div>
                  </div>
                  <div className="project-body">
                    <h3>Flash Coach</h3>
                    <p className="project-tagline">AI Coaching Platform</p>
                    <p className="project-desc">
                      A full-stack AI-driven coaching platform designed to facilitate interactive user communication. Developed a robust backend with FastAPI and stored data in MongoDB. Integrates speech-to-text (Whisper) and text-to-speech (gTTS) voice pipeline for interactive, hands-free communications. Implemented secure OTP authentication and a personalized mentor feedback loop.
                    </p>
                  </div>
                  <div className="project-footer">
                    <span className="tech-tag">FastAPI</span>
                    <span className="tech-tag">MongoDB</span>
                    <span className="tech-tag">Whisper Speech</span>
                    <span className="tech-tag">gTTS</span>
                    <span className="tech-tag">OTP Auth</span>
                  </div>
                </div>
              </div>

              {/* Project 2: Digit Recognizer */}
              <div className="project-card scroll-trigger">
                <div className="project-card-inner">
                  <div className="project-header">
                    <div className="project-icon-box">
                      <i className="fa-solid fa-bezier-curve project-icon"></i>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/sainagb47/digit-recognizer" target="_blank" aria-label="GitHub Repository"><i class="fa-brands fa-github"></i></a>
                    </div>
                  </div>
                  <div className="project-body">
                    <h3>Digit Recognizer</h3>
                    <p className="project-tagline">Deep Learning Image Classifier</p>
                    <p className="project-desc">
                      A computer vision application that processes and recognizes handwritten digits. Built an advanced Convolutional Neural Network (CNN) model trained on the MNIST dataset for high-accuracy handwritten digit classification. Designed and deployed the model using Flask to create a responsive, real-time web prediction interface.
                    </p>
                  </div>
                  <div className="project-footer">
                    <span className="tech-tag">Python</span>
                    <span class="tech-tag">CNN</span>
                    <span class="tech-tag">MNIST</span>
                    <span className="tech-tag">Flask</span>
                    <span className="tech-tag">Deep Learning</span>
                  </div>
                </div>
              </div>

              {/* Project 3: LawGenius */}
              <div className="project-card scroll-trigger">
                <div className="project-card-inner">
                  <div className="project-header">
                    <div className="project-icon-box">
                      <i className="fa-solid fa-scale-balanced project-icon"></i>
                    </div>
                    <div className="project-links">
                      <a href="https://github.com/sainagb47/lawGenius.ai" target="_blank" aria-label="GitHub Repository"><i className="fa-brands fa-github"></i></a>
                    </div>
                  </div>
                  <div className="project-body">
                    <h3>LawGenius</h3>
                    <p className="project-tagline">AI-Powered Legal Assistant</p>
                    <p className="project-desc">
                      An intelligent chatbot designed to assist users with legal queries. Utilized Natural Language Processing (NLP) models combined with domain-specific legal datasets. Implemented intelligent query answering algorithms to deliver automated document generation and advice based on current laws and context.
                    </p>
                  </div>
                  <div className="project-footer">
                    <span className="tech-tag">NLP</span>
                    <span className="tech-tag">Chatbot</span>
                    <span className="tech-tag">Legal Datasets</span>
                    <span className="tech-tag">Document Gen</span>
                    <span className="tech-tag">Python</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications & Achievements Section */}
        <section id="certifications" class="cert-achieve-section section">
          <div className="container">
            <div className="section-title-wrapper scroll-trigger">
              <span className="subtitle">04. Milestones</span>
              <h2 className="section-title">Certifications & <span className="gradient-text">Achievements</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="milestones-grid">
              {/* Certifications */}
              <div className="milestone-block scroll-trigger">
                <div className="block-title">
                  <i className="fa-solid fa-award"></i>
                  <h3>Professional Certifications</h3>
                </div>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>NPTEL Certifications</h4>
                      <p>Completed certifications in Design and Analysis of Algorithms, Machine Learning, and R Programming.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>AWS Generative AI Certification</h4>
                      <p>Validated skills in foundational model deployment, prompt engineering, and building generative applications on AWS.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Google Cloud Foundations</h4>
                      <p>Comprehensive training on cloud concepts, storage, computing power, and Google Cloud platform services.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Java & Python Certification</h4>
                      <p>Awarded by Indian Institute of Technology (IIT), Bombay, validating core programming competencies.</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Cisco Certifications</h4>
                      <p>Acquired certifications covering Computer Networking basics, Python scripting, and Cybersecurity essentials.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="milestone-block scroll-trigger">
                <div className="block-title">
                  <i className="fa-solid fa-trophy"></i>
                  <h3>Key Achievements</h3>
                </div>
                <div className="achievements-container">
                  <div className="achievement-card">
                    <div className="ach-icon"><i className="fa-solid fa-circle-check"></i></div>
                    <div className="ach-text">
                      <h4>2nd Prize in Chatbot Hackathon</h4>
                      <p>Secured 2nd position in the competitive Hackathon organized by Codegnan, focusing on chatbot design, integration, and deployment.</p>
                    </div>
                  </div>
                  <div className="achievement-card">
                    <div className="ach-icon"><i className="fa-solid fa-users"></i></div>
                    <div className="ach-text">
                      <h4>Hackathon Participation</h4>
                      <p>Active participant in multiple institutional and regional technical hackathons, coding sprints, and data science events.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section section">
          <div className="container">
            <div className="section-title-wrapper scroll-trigger">
              <span className="subtitle">05. Connection</span>
              <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
              <div className="section-line"></div>
            </div>

            <div className="contact-grid">
              <div className="contact-info scroll-trigger">
                <h3>Let's Collaborate</h3>
                <p>
                  I am currently looking for internship and project collaboration opportunities in AI/ML, data science, and full-stack development. Feel free to reach out to me!
                </p>
                
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon"><i className="fa-solid fa-envelope"></i></div>
                    <div className="info-text">
                      <span>Email</span>
                      <a href="mailto:sainagb47@gmail.com">sainagb47@gmail.com</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon"><i class="fa-solid fa-phone"></i></div>
                    <div className="info-text">
                      <span>Phone</span>
                      <a href="tel:+918008498269">+91 8008498269</a>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon"><i className="fa-solid fa-location-dot"></i></div>
                    <div className="info-text">
                      <span>Location</span>
                      <span>Vijayawada, Andhra Pradesh, India</span>
                    </div>
                  </div>
                </div>

                <div className="social-box">
                  <h4>Connect with me on</h4>
                  <div className="social-links">
                    <a href="https://github.com/sainagb47" target="_blank" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                    <a href="https://linkedin.com/in/barre-sainag" target="_blank" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
                  </div>
                </div>
              </div>

              <div className="contact-form-container scroll-trigger">
                <form id="contactForm" className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder=" " 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="name">Your Name</label>
                  </div>
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder=" " 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="email">Your Email</label>
                  </div>
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      placeholder=" " 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="subject">Subject</label>
                  </div>
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      placeholder=" " 
                      value={formData.message} 
                      onChange={handleInputChange} 
                    />
                    <label htmlFor="message">Message</label>
                  </div>
                  <button type="submit" className="btn btn-primary btn-submit" disabled={isSubmitting}>
                    <span className="btn-text">{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    <i className="fa-solid fa-paper-plane"></i>
                  </button>
                  {formStatus.text && (
                    <div className={`form-status ${formStatus.type}`}>
                      {formStatus.text}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-container">
          <p>&copy; 2026 Barre Sainag. All rights reserved.</p>
          <p className="design-credit">Designed & Built with <i className="fa-solid fa-heart accent-text"></i></p>
        </div>
      </footer>
    </>
  );
}

export default App;
