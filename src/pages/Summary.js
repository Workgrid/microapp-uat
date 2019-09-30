import React, { useRef, useEffect } from 'react'
import Tests from '../components/Tests'
import MicroApp from '@workgrid/micro-app'
import './summary.css'

const Summary = () => {
  const microapp = useRef(
    new MicroApp({
      id: 'uat-microapp',
      audience: 'uat-microapp'
    })
  )

  useEffect(() => {
    console.log('Initialize')
    microapp.current.initialize()
    console.log('Post initialize')
  }, [])

  const showDetail = detailPage => {
    // We have to use the hash router to show detail due to Github pages limitations
    console.log('Showing detail')
    microapp.current.showDetail({
      url: `${window.location.origin}${window.location.pathname}#/${detailPage}`,
      title: 'UAT Microapp Detail'
    })
  }

  return (
    <div>
      <h1>UAT Microapp</h1>
      <p>This is the "UAT" microapp.</p>
      <section className="section">
        <Tests microapp={microapp.current} panel="summary" />
        <label for="test-input">Test Input</label>
        <input type="text" placeholder="Input Test" name="test-input" />
      </section>
      <div className="action-block vertical">
        <button className="primary" onClick={() => showDetail('tests')}>
          Detail Tests
        </button>
      </div>
    </div>
  )
}

export default Summary
