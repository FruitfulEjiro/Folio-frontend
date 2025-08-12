import React from 'react';

interface Skill {
  name: string;
  percentage: number;
}

interface Project {
  title: string;
  description: string;
  image: string;
}

const TemplateB: React.FC = () => {
  const skills: Skill[] = [
    { name: 'React', percentage: 95 },
    { name: 'TypeScript', percentage: 90 },
    { name: 'Node.js', percentage: 85 },
    { name: 'Python', percentage: 80 },
    { name: 'UI/UX Design', percentage: 88 },
    { name: 'MongoDB', percentage: 75 },
    { name: 'PostgreSQL', percentage: 82 },
    { name: 'AWS', percentage: 70 },
  ];

  const projects: Project[] = [
    { title: 'E-Commerce Platform', description: 'A modern e-commerce platform built with React and Node.js', image: '/placeholder.svg' },
    { title: 'Task Management App', description: 'Collaborative task management tool with real-time updates', image: '/placeholder.svg' },
    { title: 'AI Chat Bot', description: 'Intelligent chatbot using natural language processing', image: '/placeholder.svg' },
    { title: 'Data Visualization Dashboard', description: 'Interactive dashboard for business analytics', image: '/placeholder.svg' },
    { title: 'Portfolio Website', description: 'Responsive portfolio website with modern animations', image: '/placeholder.svg' },
    { title: 'Weather App', description: 'Real-time weather application with beautiful UI', image: '/placeholder.svg' },
  ];

  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center py-4">
        <div className="text-xl font-bold">Alexandra Rodriguez</div>
        <ul className="flex space-x-4">
          <li><a href="#about" className="hover:text-green-400">About</a></li>
          <li><a href="#skills" className="hover:text-green-400">Skills</a></li>
          <li><a href="#projects" className="hover:text-green-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
        </ul>
      </nav>

      <header className="text-center py-20">
        <h1 className="text-5xl font-bold text-green-400">Alexandra Rodriguez</h1>
        <p className="mt-4">Full Stack Developer & UI/UX Designer</p>
        <p className="mt-2">Passionate full-stack developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern design principles.</p>
        <div className="mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full mr-4 hover:bg-green-700">View My Work</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Get in Touch</button>
        </div>
      </header>

      <section id="about" className="py-16">
        <h2 className="text-3xl font-bold text-green-400 text-center">About Me</h2>
        <div className="flex flex-col md:flex-row mt-8">
          <div className="md:w-1/2 p-4">
            <p>Get to know me</p>
            <p className="mt-4">I'm a passionate developer who loves creating digital experiences that make a difference. With a strong background in front-end and back-end development, I enjoy tackling complex challenges and turning ideas into reality.</p>
            <p className="mt-4">When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold">Contact Information</h3>
              <p className="mt-2">📞 +1 (555) 123-4567</p>
              <p className="mt-2">✉️ alexandra.rodriguez@email.com</p>
              <p className="mt-2">🌐 [LinkedIn]</p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16">
        <h2 className="text-3xl font-bold text-green-400 text-center">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {skills.map((skill, index) => (
            <div key={index} className="p-4">
              <div className="flex justify-between">
                <span>{skill.name}</span>
                <span>{skill.percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="py-16">
        <h2 className="text-3xl font-bold text-green-400 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-xl font-bold mt-4">{project.title}</h3>
              <p className="mt-2 text-gray-400">{project.description}</p>
              <span className="inline-block mt-4 bg-green-600 text-white px-2 py-1 rounded-full text-sm">Featured</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 text-center">
        <h2 className="text-3xl font-bold text-green-400">Let's Work Together</h2>
        <p className="mt-4">Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.</p>
        <div className="mt-6">
          <button className="bg-green-600 text-white px-6 py-2 rounded-full mr-4 hover:bg-green-700">Email Me</button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">Call Me</button>
        </div>
      </section>

      <footer className="text-center py-4">
        <p>© 2024 Alexandra Rodriguez. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TemplateB;