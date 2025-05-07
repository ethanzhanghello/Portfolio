'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { name: 'Experience', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const skillGroups = [
  {
    title: 'Programming',
    skills: [
      { name: 'Python', icon: '🐍' },
      { name: 'R', icon: '📊' },
      { name: 'SQL', icon: '🗄️' },
      { name: 'Java', icon: '☕' },
    ],
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Pandas', icon: '🧮' },
      { name: 'NumPy', icon: '📐' },
      { name: 'scikit-learn', icon: '🤖' },
      { name: 'Tableau', icon: '📈' },
      { name: 'Power BI', icon: '📊' },
      { name: 'Excel', icon: '📗' },
      { name: 'Data Cleaning', icon: '🧹' },
      { name: 'ETL', icon: '🔄' },
    ],
  },
  {
    title: 'Visualization & Web',
    skills: [
      { name: 'Matplotlib', icon: '📊' },
      { name: 'Seaborn', icon: '🌊' },
      { name: 'ggplot2', icon: '🎨' },
      { name: 'APIs', icon: '🔗' },
      { name: 'Web Scraping', icon: '🕸️' },
    ],
  },
  {
    title: 'Other',
    skills: [
      { name: 'Git & GitHub', icon: '🔧' },
      { name: 'Teamwork', icon: '🤝' },
      { name: 'Communication', icon: '💬' },
      { name: 'Problem Solving', icon: '🧠' },
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
            <span className="text-4xl md:text-5xl font-bold text-blue-200">Data Analyst &amp; Developer</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 font-light">
            UC Berkeley student majoring in Computer Science &amp; Applied Math. Passionate about leveraging data to drive impactful decisions, with hands-on experience in data analysis, machine learning, and software development. Seeking data analyst opportunities to apply my technical expertise and curiosity to solve real-world problems.
          </p>
          <div className="flex gap-6 mt-4">
            <a href="#projects" className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition-colors">View Projects</a>
            <a href="#contact" className="px-8 py-3 border-2 border-blue-400 text-blue-400 rounded-lg text-lg font-semibold hover:bg-blue-900/40 transition-colors">Contact Me</a>
          </div>
        </motion.div>
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
              Hi! I&apos;m Ethan, a passionate data analyst and developer currently studying Computer Science and Applied Math at UC Berkeley. I thrive on solving complex problems and transforming data into actionable insights. My interests include data science, machine learning, and building tools that make a difference. I love collaborating with others and am always eager to learn something new.
            </p>
            <ul className="list-disc list-inside text-blue-200 text-base mt-2">
              <li>Driven by curiosity and a love for data</li>
              <li>Experienced in both research and real-world projects</li>
              <li>Strong communicator and team player</li>
              <li>Open to data analyst and tech opportunities</li>
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
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Projects</h2>
          <div className="flex flex-col items-center gap-6">
            <a
              href="https://github.com/ethanzhanghello"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline text-lg font-medium hover:text-blue-200"
            >
              View all my projects on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-300">Contact</h2>
          <div className="flex flex-col items-center gap-4 text-lg">
            <span>📞 <a href="tel:6505183763" className="hover:underline">(650) 518-3763</a></span>
            <span>✉️ <a href="mailto:ezhang0606@gmail.com" className="hover:underline">ezhang0606@gmail.com</a></span>
          </div>
        </div>
      </section>
    </div>
  )
}
