import React, { useState, useEffect, useRef } from 'react'
import './ValentinePage.css'

const ValentinePage: React.FC = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null)
  const [showImage, setShowImage] = useState(false)
  const [yesClicked, setYesClicked] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Move No button away when mouse approaches
  const moveNoButton = () => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const maxX = container.width - 100
    const maxY = container.height - 50
    
    // Generate random position away from center
    const angle = Math.random() * 2 * Math.PI
    const distance = 200 + Math.random() * 100
    
    let newX = Math.cos(angle) * distance
    let newY = Math.sin(angle) * distance
    
    // Keep within bounds
    newX = Math.max(-maxX/2, Math.min(maxX/2, newX))
    newY = Math.max(-maxY/2, Math.min(maxY/2, newY))
    
    setNoButtonPosition({ x: newX, y: newY })
  }

  // Handle mouse enter on No button
  const handleNoMouseEnter = () => {
    setIsHovering(true)
    setHoverStartTime(Date.now())
    moveNoButton()
  }

  // Handle mouse leave on No button
  const handleNoMouseLeave = () => {
    setIsHovering(false)
    setHoverStartTime(null)
  }

  // Check if user has been hovering for 5 seconds
  useEffect(() => {
    if (isHovering && hoverStartTime) {
      const timer = setTimeout(() => {
        setShowImage(true)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [isHovering, hoverStartTime])

  const handleYesClick = () => {
    setYesClicked(true)
  }

  if (showImage) {
    return (
      <div className="valentine-container">
        <div className="success-message">
          <h1>🎉 You caught it! 🎉</h1>
          <img 
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3FqejZqZmR1c3RqNnBma2R5b2VnbzR0b3FqZ3p3dGQxM3ZqZ2FqZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oKIPnAiaMCws8nOsE/giphy.gif"
            alt="Success celebration"
            className="celebration-gif"
          />
          <p>You caught the No button for 5 seconds! You're amazing! 💕</p>
        </div>
      </div>
    )
  }

  if (yesClicked) {
    return (
      <div className="valentine-container">
        <div className="success-message">
          <h1>🌹 YESSS! 🌹</h1>
          <div className="no-image-placeholder">
            <h2>🌹 YESSS! 🌹</h2>
            <p>I'm so happy you said yes! Happy Valentine's Day! 💕</p>
            <div className="heart-animation">💝</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="valentine-container" ref={containerRef}>
      <div className="question-card">
        <h1>Will you be my Valentine? 💕</h1>
        <div className="buttons-container">
          <button 
            className="yes-btn"
            onClick={handleYesClick}
          >
            Yes 💝
          </button>
          <button 
            ref={noButtonRef}
            className="no-btn"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
              transition: 'transform 0.3s ease-out'
            }}
            onMouseEnter={handleNoMouseEnter}
            onMouseLeave={handleNoMouseLeave}
          >
            No 💔
          </button>
        </div>
      </div>
    </div>
  )
}

export default ValentinePage
