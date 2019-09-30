import React, { useRef, useEffect } from 'react'
import MicroApp from '@workgrid/micro-app'
import './detail.css'
import Tests from '../components/Tests'
import Debugger from '../components/Debugger'

const Detail = () => {
  const microapp = useRef(
    new MicroApp({
      id: 'edge-microapp',
      audience: process.env.REACT_APP_AUD
    })
  )

  useEffect(() => {
    console.log('Initializing Detail')
    microapp.current.initialize()
  }, [])

  return (
    <div className="container">
      <h1>Tests Detail</h1>
      <div className="example-block">
        <Tests microapp={microapp.current} panel="detail" />
      </div>
      <div className="action-block">
        <Debugger />
      </div>
    </div>
  )
}

export default Detail
