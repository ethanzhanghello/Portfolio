'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const skillGroups = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'JavaScript', icon: '⚡' },
      { name: 'Java', icon: '☕' },
      { name: 'C', icon: '⚙️' },
      { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: '⚛️' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Flask', icon: '🌶️' },
      { name: 'FastAPI', icon: '🚀' },
      { name: 'PyTorch', icon: '🔥' },
      { name: 'TensorFlow', icon: '🧠' },
      { name: 'Pandas', icon: '🐼' },
      { name: 'NumPy', icon: '🔢' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: '☁️' },
      { name: 'Google Cloud', icon: '🌩️' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Kubernetes', icon: '⚓' },
      { name: 'GitHub Actions', icon: '🔄' },
      { name: 'CI/CD', icon: '🚀' },
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'MongoDB', icon: '🍃' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Firebase', icon: '🔥' },
      { name: 'Git', icon: '📚' },
      { name: 'System Design', icon: '🏗️' },
    ],
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-blue-900 text-white font-sans">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-black/80 backdrop-blur-md border-b border-blue-800 sticky top-0 z-50">
        <div className="text-2xl font-extrabold tracking-widest text-white">Ethan.Z</div>
        <ul className="flex gap-8">
          {navLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} className="text-lg font-medium hover:text-blue-400 transition-colors px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section - Split Layout */}
      <section className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-8 py-16 gap-12 md:gap-24">
        {/* Left: Large Profile Picture */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-72 h-72 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-blue-700 bg-blue-900 flex items-center justify-center mb-6">
            <Image src="/profile.jpg" alt="Ethan Zhang profile" width={384} height={384} className="object-cover w-full h-full" />
          </div>
        </div>
        {/* Right: Name, Title, Summary */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-left"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-white">
            I&apos;m <span className="text-blue-400">Ethan Zhang</span>.<br />
            <span className="text-4xl md:text-5xl font-bold text-blue-200">Software Engineer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            UC Berkeley Computer Science &amp; Applied Mathematics student with 4+ years of full-stack development experience. Passionate about building scalable systems, RESTful APIs, and distributed architectures. Seeking software engineering opportunities to apply my expertise in multiple programming languages, modern frameworks, cloud technologies, and system design to solve complex technical challenges.
          </p>
          <div className="flex gap-6 mt-4">
            <a href="#projects" className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors">View Projects</a>
            <a href="#contact" className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg text-lg font-semibold hover:bg-blue-900/40 transition-colors">Contact Me</a>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Professional Experience</h2>
          <div className="space-y-8">
            {/* Equivalence Systems Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">ML Research Engineer (Backend)</h3>
                <span className="text-blue-400 font-medium">August 2025 - Present</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">Equivalence Systems, LLC / CAHL Lab, UC Berkeley | Berkeley, CA</p>
              <p className="text-blue-100 leading-relaxed">
                Built and deployed an NLP pipeline using Python, HuggingFace, spaCy, and GCP with CAHL Lab researchers to process 36M+ course equivalency pairs, automating syllabus comparison and reducing review time by 90%. Developed OCR transcript parser with Tesseract, PyPDF2, and Pandas, converted 10K+ PDFs into JSON with &lt;5s latency, integrated into backend APIs with CI/CD and &gt;90% test coverage for reliable evaluations across CUNY, SUNY, UC, CSU. Delivered a full-stack analytics dashboard built in React, Flask, and Firebase, adopted by 100+ universities, and introduced a novel coverage metric that improved trust, transparency, and policy alignment in credit transfer.
              </p>
            </motion.div>

            {/* Oratora Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">Software Engineer Intern</h3>
                <span className="text-blue-400 font-medium">July 2025 - Present</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">Oratora | Berkeley, CA</p>
              <p className="text-blue-100 leading-relaxed">
                I designed and built an innovative keystroke-based cheat detection system that uses behavioral telemetry to identify AI-assisted and copy-paste behavior in real-time. The system processes 30+ behavioral signals from keystroke data, successfully identifying entropy and paste-ratio patterns in 92% of cheating cases. I deployed a high-performance FastAPI inference API with sub-100ms latency and integrated SHAP-based explainability features, achieving 91% precision on validation datasets.
              </p>
            </motion.div>

            {/* Lumo Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">Lead Software Engineer</h3>
                <span className="text-blue-400 font-medium">March 2025 - Present</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">Lumo | Berkeley, CA</p>
              <p className="text-blue-100 leading-relaxed">
                As Lead Software Engineer, I successfully launched an AI-powered grocery application that serves 800+ beta testers and reduced average in-store shopping time by 23% through personalized meal planning. I integrated GPT-4 assistant capabilities to provide real-time suggestions, nutrition tracking, and conversational shopping features. The entire system was architected with a modular approach, implementing GitHub Actions CI/CD and maintaining high test coverage, which enabled parallel development across cart, chatbot, and calendar modules.
              </p>
            </motion.div>

            {/* Law Office Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">Software Engineer Intern</h3>
                <span className="text-blue-400 font-medium">May 2025 - July 2025</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">Law Offices of Vaughan de Kirby A.P.C. | San Francisco, CA</p>
              <p className="text-blue-100 leading-relaxed">
                I developed a comprehensive full-stack bilingual platform featuring a green card screener, RAG-based multilingual chatbot, and predictive case tracker. The solution included a multilingual React screener and RAG chatbot built with LangChain and ChromaDB, enabling over 1,000 self-service screenings. I also constructed a sophisticated visa case tracker with an ETA engine that achieved a Mean Absolute Error of 4.6 days, improving update accuracy and reducing inquiry tickets by 30%. The entire system was built with a Flask backend integrated with Firebase, MongoDB, and JWT authentication, and deployed to Vercel/Render with an accessibility-first user interface.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About & Skills Section - Two Column Layout */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-black/40 rounded-2xl shadow-xl p-8 flex flex-col gap-6"
          >
            <h2 className="text-3xl font-bold mb-2 text-blue-300">About Me</h2>
            <p className="text-lg text-blue-100">
              Hi! I&apos;m Ethan, a passionate software engineer currently studying Computer Science and Applied Math at UC Berkeley. I specialize in full-stack development, building scalable systems, and creating impactful software solutions. With 4+ years of hands-on experience across multiple programming languages, modern frameworks, cloud technologies, and distributed systems, I thrive on solving complex technical challenges and delivering high-quality software products.
            </p>
            <ul className="list-disc list-inside text-blue-200 text-base mt-2">
              <li>Experienced in full-stack development and system architecture</li>
              <li>Proven track record with Google, Oratora, and Lumo</li>
              <li>Strong background in machine learning and AI integration</li>
              <li>Seeking software engineering opportunities at top tech companies</li>
            </ul>
          </motion.div>
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black/40 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-300">Skills</h3>
            <div className="flex flex-col gap-6">
              {skillGroups.map(group => (
                <div key={group.title}>
                  <div className="font-semibold text-blue-400 mb-2">{group.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span key={skill.name} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm font-medium shadow hover:bg-blue-700/90 transition-colors">
                        <span>{skill.icon}</span> {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-br from-blue-950 via-gray-900 to-blue-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Featured Projects</h2>
          <div className="space-y-8">
            {/* Open Project @ Berkeley */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">Open Project @ Berkeley</h3>
                <span className="text-blue-400 font-medium">August 2024 - December 2024</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">Full Stack Engineer (Project Manager) | Berkeley, CA</p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li>Led an 11-person team to build an Autonomous Red-Team Agent, an AI-driven distributed systems platform in Python and FastAPI, automating data ingestion, vulnerability analysis, and reporting for scalable, real-time applications in a sandboxed environment</li>
                <li>Built pipelines handling 200K+ events/week with graph queries, orchestration, and real-time streaming for scalable analysis</li>
                <li>Deployed a Flask/React + TypeScript app on AWS with Kubernetes and CI/CD, delivering millisecond-level latency, automated reporting, and production-grade observability</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Flask</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">FastAPI</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">AWS</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Kubernetes</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">TypeScript</span>
              </div>
            </motion.div>

            {/* Music Recommender */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-black/40 rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h3 className="text-xl font-bold text-blue-300">Cross-Platform Music Recommender</h3>
                <span className="text-blue-400 font-medium">April 2025</span>
              </div>
              <p className="text-blue-200 font-medium mb-3">SMCCD Intercollegiate Hackathon — 1st Place, Machine Learning Track | San Mateo, CA</p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-4">
                <li>Created music recommender aggregating 3M+ Spotify, Apple Music, and YouTube plays to predict cross-platform taste</li>
                <li>Built cross-platform music recommender with drag-and-drop UI and transformer-based audio embeddings (Flask + VectorDB)</li>
                <li>Improved music discovery by 34% (MAP@20: 0.89) across Spotify, Apple Music, and YouTube</li>
                <li>Awarded $1,000 Grand Prize for Best Overall Project among 100+ competing teams</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Flask</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">VectorDB</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">Machine Learning</span>
                <span className="px-3 py-1 bg-blue-800/70 text-blue-100 rounded-full text-sm">APIs</span>
              </div>
            </motion.div>

            {/* GitHub Link */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <a
                href="https://github.com/ethanzhanghello"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors"
              >
                View all projects on GitHub
                <span>→</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Contact</h2>
          <div className="flex flex-col items-center gap-6 text-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <span>📞 <a href="tel:6505183763" className="hover:underline text-blue-200">(650) 518-3763</a></span>
              <span>✉️ <a href="mailto:ezhang06@berkeley.edu" className="hover:underline text-blue-200">ezhang06@berkeley.edu</a></span>
            </div>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/ethan-zhang-693100270/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-200 transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/ethanzhanghello" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-200 transition-colors">
                GitHub
              </a>
            </div>
            <div className="text-center text-blue-200 text-sm max-w-2xl">
              <p>Open to software engineering opportunities at innovative companies. Passionate about building scalable systems, working with cutting-edge technologies, and contributing to impactful projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
