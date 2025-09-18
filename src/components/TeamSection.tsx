import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Code, Palette, Database, Cpu, Music } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Lead Developer & AI Engineer',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    skills: ['Java', 'Machine Learning', 'Algorithm Design']
  },
  {
    name: 'Sarah Kim',
    role: 'UI/UX Designer & Frontend',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
    skills: ['React', 'Design Systems', 'User Research']
  },
  {
    name: 'Miguel Rodriguez',
    role: 'Backend Engineer',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: ['API Development', 'Database Design', 'System Architecture']
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Cpu,
    color: 'from-purple-500 to-indigo-500',
    skills: ['Data Analysis', 'NLP', 'Model Training']
  },
  {
    name: 'Jordan Taylor',
    role: 'Music Curator & QA',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: Music,
    color: 'from-orange-500 to-red-500',
    skills: ['Music Theory', 'Quality Assurance', 'User Testing']
  }
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Meet the Team
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Five passionate developers united by the vision of making music discovery effortless and emotional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {teamMembers.map((member, index) => {
            const IconComponent = member.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-lg"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Role Icon */}
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center border-2 border-white/20`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-blue-200 text-sm mb-4 leading-tight">
                    {member.role}
                  </p>

                  {/* Skills */}
                  <div className="space-y-1 mb-4">
                    {member.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="inline-block px-2 py-1 bg-white/10 text-white/80 text-xs rounded-md mr-1 mb-1"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-4 h-4 text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-3xl font-bold text-white">5</p>
                <p className="text-blue-200">Team Members</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-blue-200">Hours Coded</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">∞</p>
                <p className="text-blue-200">Coffee Consumed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">1</p>
                <p className="text-blue-200">Shared Dream</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;