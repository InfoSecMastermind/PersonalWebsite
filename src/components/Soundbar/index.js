import React, { useRef, useState } from 'react'

// ✅ External Library Imports
import styled, { keyframes } from 'styled-components'

// ✅ Internal Imports
import music from '../../assets/sounds/fake_verthandi.mp3'

// 🔥 Fix: Keep sound bars side by side
const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Keeps bars and text spaced properly */
  cursor: pointer;
  position: fixed;
  right: 8rem;
  top: 3rem;
  z-index: 3;

  &:before {
    content: '<music>';
    font-family: 'La Belle Aurore', cursive;
    color: rgb(255, 0, 0);
    font-size: 18px;
    position: absolute;
    top: -20px;
    left: -60px;
    opacity: 0.9;
  }

  &:after {
    content: '<music/>';
    font-family: 'La Belle Aurore', cursive;
    color: rgb(255, 0, 0);
    font-size: 18px;
    position: absolute;
    bottom: -20px;
    left: -60px;
    opacity: 0.9;
  }
`

const play = keyframes`
  0% { transform: scaleY(1); }
  50% { transform: scaleY(2); }
  100% { transform: scaleY(1); }
`

const LineContainer = styled.div`
  display: flex; /* 🔥 Keeps the sound bars in a row */
  gap: 2px;
`

const Line = styled.span`
  background: rgb(76, 225, 65);
  border: 1px solid;
  animation: ${play} 1s ease infinite;
  animation-play-state: ${(props) => (props.playing ? 'running' : 'paused')};
  height: 1rem;
  width: 3px;
`

const WarningText = styled.div`
  color: red;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  animation: shake 0.8s infinite alternate ease-in-out;

  @keyframes shake {
    0% { transform: rotate(-3deg); }
    100% { transform: rotate(3deg); }
  }
`

const SoundBar = () => {
  const ref = useRef(null)
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)

    if (!click) {
      ref.current.play()
    } else {
      ref.current.pause()
    }
  }

  return (
    <Box onClick={handleClick}>
      {/* 🔥 Sound Bars in a Row */}
      <LineContainer>
        <Line playing={click} />
        <Line playing={click} />
        <Line playing={click} />
        <Line playing={click} />
        <Line playing={click} />
      </LineContainer>
      <audio src={music} ref={ref} loop />
      <WarningText>DO NOT PLAY THIS!</WarningText>
    </Box>
  )
}

export default SoundBar
