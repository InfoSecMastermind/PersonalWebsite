import { useEffect, useState } from 'react'

import Loader from 'react-loaders'

import WordCloud from './wordcloud'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Skills = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const skillsArray = 'Skills'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container skills-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={skillsArray}
              idx={15}
            />
            <br />
          </h1>
          <p>
          I have hands-on experience with cloud platforms like AWS, Google Cloud, DigitalOcean, Linode, and Vultr ☁️, where I focus on optimizing and automating infrastructure. My skill set includes containerization with Docker and Kubernetes, scripting with Bash and Python, and managing scalable web applications using PHP 🛠️🚀. I specialize in deploying secure, high-performance systems while ensuring seamless CI/CD workflows.
          </p>
          <p>
          Security is at the core of my expertise 🔐—I integrate best practices for cloud security, access management, and threat detection. I’m also well-versed in incident response, infrastructure as code (IaC) with Terraform, and monitoring tools like Prometheus and Grafana 📊. My problem-solving mindset and passion for automation help me create reliable, resilient architectures that scale efficiently.
          </p>
        </div>

        <div className="tagcloud-wrap">
          <WordCloud />
        </div>
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Skills
