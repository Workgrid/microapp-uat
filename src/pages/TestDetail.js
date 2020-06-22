import React, { useRef, useEffect } from 'react'
import MicroApp from '@workgrid/micro-app'
import './detail.css'
import Tests from '../components/Tests'

const Detail = () => {
  const microapp = useRef(new MicroApp({}))

  useEffect(() => {
    microapp.current.initialize()
  }, [])

  return (
    <div className="container">
      <h1>Tests Detail</h1>
      <div className="example-block">
        <Tests microapp={microapp.current} panel="detail" />
      </div>

      <div className="example-block">
        <a href="./test-internal.html">Internal Link</a>
        <a href="https://www.bing.com?q=external" target="_blank" rel="noopener noreferrer">
          External Link
        </a>
        <a href="tel:1-562-867-5309">Tel Link</a>
        <a href="mailto:support@workgrid.com">Mailto Link</a>
      </div>
    </div>
  )
}

export default Detail
