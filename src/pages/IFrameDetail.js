import React, { useRef, useEffect, useState } from 'react'
import MicroApp from '@workgrid/micro-app'
import './detail.css'

const Detail = () => {
  const microapp = useRef(
    new MicroApp({
      id: 'uat-microapp',
      audience: 'uat-microapp'
    })
  )

  const [currentCount, setCurrentCount] = useState(3)
  const [iframeUrl, setIframeUrl] = useState('')
  const countdownTimer = useRef()

  useEffect(() => {
    microapp.current.initialize()
    countdownTimer.current = setInterval(() => {
      setCurrentCount(prev => {
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => {
    if (currentCount <= 0) {
      setIframeUrl('https://www.catapultsgame.com/app/')
      clearInterval(countdownTimer.current)
    }
  }, [currentCount])

  return (
    <div className="container">
      <h1>IFrame Detail</h1>
      <p>Tests an inner iFrame. This is a typical use case for "wrapping" an existing app in a MicroApp.</p>
      <div className="example-block">
        <p>Showing iFrame in {currentCount}s</p>
        <iframe style={{ width: '100%', borderWidth: 1 }} title="Example Iframe" src={iframeUrl} />
      </div>
    </div>
  )
}

export default Detail
