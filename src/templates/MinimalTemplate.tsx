import React from "react";
import { TemplateProps } from "./registry";
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";

interface Skill {
   name: string;
   percentage: number;
}

interface Project {
   title: string;
   description: string;
   image: string;
   link: string;
}

const MinimalTemplate: React.FC<TemplateProps> = ({ data, isPreview = false }) => {
   const { name, email, jobRole, bio, phoneNumber, projects, skills } = data;

   return (
      <div className={`min-h-screen ${isPreview ? "scale-50 origin-top-left" : ""}`}>
         <div className="container mx-auto p-4">
            <nav className="flex justify-between items-center py-4">
               <div className="text-xl font-bold">{name}</div>
               <ul className="flex space-x-4">
                  <li>
                     <a href="#about" className="hover:text-purple-400">
                        About
                     </a>
                  </li>
                  <li>
                     <a href="#skills" className="hover:text-purple-400">
                        Skills
                     </a>
                  </li>
                  <li>
                     <a href="#projects" className="hover:text-purple-400">
                        Projects
                     </a>
                  </li>
                  <li>
                     <a href="#contact" className="hover:text-purple-400">
                        Contact
                     </a>
                  </li>
               </ul>
            </nav>

            <header className="text-center py-20">
               <h1 className="text-5xl font-bold text-purple-400">{name}</h1>
               <p className="mt-4">{jobRole}</p>
               {/* <p className="mt-2">{bio}</p> */}
               <div className="mt-6">
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-full mr-4 hover:bg-purple-700">
                     View My Work
                  </button>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                     Get in Touch
                  </button>
               </div>
            </header>

            <section id="about" className="py-16">
               <h2 className="text-3xl font-bold text-purple-400 text-center">About Me</h2>
               <div className="flex flex-col md:flex-row mt-8">
                  <div className="md:w-70 text-center p-4">
                     <p>Get to know me</p>
                     <p className="mt-4">
                        {/* I'm a passionate developer who loves creating digital experiences that make a difference. With a
                        strong background in front-end and back-end development, I enjoy tackling complex challenges and
                        turning ideas into reality. */}
                        {bio}
                     </p>
                     <p className="mt-4">
                        {/* When I'm not coding, you can find me exploring new technologies, contributing to open-source
                        projects, or sharing knowledge with the developer community. */}
                        {/* {bio} */}
                     </p>
                  </div>
                  {/* <div className="md:w-1/2 p-4">
                     <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="text-xl font-bold">Contact Information</h3>
                        <p className="mt-2">📞 {phoneNumber}</p>
                        <p className="mt-2">✉️ {email}</p>
                        <p className="mt-2">🌐 [LinkedIn]</p>
                     </div>
                  </div> */}
               </div>
            </section>

            <section id="skills" className="py-16">
               <h2 className="text-3xl font-bold text-purple-400 text-center">Skills & Expertise</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {skills.map((skill) => (
                     <div key={skill.id} className="p-4">
                        <div className="flex justify-between">
                           <span>{skill.name}</span>
                           <span>{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                           <div
                              className="bg-purple-600 h-2.5 rounded-full"
                              style={{ width: `${skill.percentage}%` }}
                           ></div>
                        </div>
                     </div>
                  ))}
               </div>
            </section>

            <section id="projects" className="py-16">
               <h2 className="text-3xl font-bold text-purple-400 text-center">Featured Projects</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {projects.map((project) => (
                     <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
                        <img
                           src={project.projectImage}
                           alt={project.projectTitle}
                           className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="text-xl font-bold mt-4">{project.projectTitle}</h3>
                        <p className="mt-2 text-gray-400">{project.projectSummary}</p>
                        <span className="inline-block mt-4 bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                           Featured
                        </span>
                     </div>
                  ))}
               </div>
            </section>

            <section id="contact" className="py-16 text-center">
               <h2 className="text-3xl font-bold text-purple-400">Let's Work Together</h2>
               <p className="mt-4">
                  Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your ideas to life.
               </p>
               <div className="mt-6">
                  <button
                     className="bg-purple-600 text-white px-6 py-2 rounded-full mr-4 hover:bg-purple-700"
                     onClick={() => (window.location.href = `mailto:${email}`)}
                  >
                     Email Me
                  </button>
                  <button
                     className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700"
                     onClick={() => (window.location.href = `tel:${phoneNumber}`)}
                  >
                     Call Me
                  </button>
               </div>
            </section>

            <footer className="text-center py-4">
               <p>© 2025 Folio. All rights reserved.</p>
            </footer>
         </div>
      </div>
   );
};

export default MinimalTemplate;
