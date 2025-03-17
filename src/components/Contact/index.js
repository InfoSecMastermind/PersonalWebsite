import { useEffect, useRef, useState } from 'react'

import emailjs from '@emailjs/browser'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Loader from 'react-loaders'
import { ClipLoader } from 'react-spinners'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'


const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const form = useRef()
  const [loading, setLoading] = useState(false)
  const contactArray = 'Contact Me'.split('')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)

    const email = form.current.email.value
    const res = await verifyEmail(email)
    if (!res) {
      setLoading(false)
      toast.error('Please enter a valid email address', {
        position: 'bottom-center',
        autoClose: 3500,
        theme: 'dark',
      })
      return
    }

    let fullName = form.current.name.value
    let subject = form.current.subject.value
    let message = form.current.message.value

    let firstName = fullName.split(' ')[0]
    firstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()

    const templateParams = {
      firstname: firstName,
      name: fullName,
      subject: subject,
      message: message,
      email: email,
    }

    emailjs
      .send(
        process.env.REACT_APP_EMIAL_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success('Message successfully sent!', {
            position: 'bottom-center',
            autoClose: 3500,
            theme: 'dark',
          })
          setTimeout(() => {
            form.current.reset()
            setLoading(false)
          }, 3800)
        },
        () => {
          setLoading(false)
          toast.error('Failed to send the message, please try again', {
            position: 'bottom-center',
            autoClose: 3500,
            theme: 'dark',
          })
        }
      )
  }

  const verifyEmail = async (email) => {
    let res = await fetch(
      `https://mailok-email-validation.p.rapidapi.com/verify?email=${email}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        },
      }
    )

    let data = await res.json()
    return res.status === 200 && data.status === 'valid'
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={contactArray}
              idx={15}
            />
          </h1>
          <p>
            I’m open to new opportunities and collaborations! Feel free to reach
            out via email.
          </p>

          <div className="contact-emails">
            <p>Email me at:</p>
            <ul>
              <li>
                <a href="mailto:muhammadalinafeespro@gmail.com">
                  muhammadalinafeespro@gmail.com
                </a>
              </li>
              <li>
                <a href="mailto:ali@alinafees.com">ali@alinafees.com</a>
              </li>
            </ul>
          </div>

          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <button
                    type="submit"
                    className="flat-button"
                    disabled={loading}
                  >
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'SEND'}
                  </button>
                </li>
              </ul>
              <ToastContainer />
            </form>
          </div>
        </div>

        <div className="map-wrap">
          <div className="info-map">
            Ali Nafees
            <br />
            Lahore, Punjab, Pakistan
            <br />
            <br />
          </div>

          <MapContainer center={[31.5204, 74.3587]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[31.5204, 74.3587]}>
              <Popup>
                Ali Nafees lives here, come over for a cup of coffee ☕
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
