import { useEffect, useState } from 'react'

import Loader from 'react-loaders'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import LogoTitle from '../../assets/images/logo-s.png'

import './index.scss'

const slowGrow = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(100);
  }
`

const GrowingButton = styled.a`
  display: inline-block;
  padding: 15px 25px;
  font-size: 1.2rem;
  color: white;
  background-color: red;
  border: none;
  text-decoration: none;
  transition: transform 250s linear;

  &:hover {
    animation: ${slowGrow} 250s forwards;
  }
`

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = 'li Nafees'.split('')
  const jobArray = 'Cloud Architect & Security Engineer'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i There,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <img src={LogoTitle} alt="Muhammad Ali Nafees" />
            <AnimatedLetters letterClass={letterClass} strArray={nameArray} idx={15} />
            <br />
            <AnimatedLetters letterClass={letterClass} strArray={jobArray} idx={22} />
          </h1>
          <h2>Streamlining DevOps Workflows | Designing and Deploying Scalable & Secure Systems</h2>

          {/* Buttons Container */}
          <div className="buttons-container">
            <Link to="/contact" className="flat-button">
              CONTACT ME
            </Link>
            <GrowingButton href="/Muhammad Ali's Resume.pdf" download>
              DOWNLOAD RESUME
            </GrowingButton>
          </div>
        </div>
        <Logo />
      </div>

      <Loader type="pacman" />
    </>
  )
}

export default Home
