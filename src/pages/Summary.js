import React, { useRef, useEffect } from 'react'
import Tests from '../components/Tests'
import MicroApp from '@workgrid/micro-app'
import './summary.css'
import { version } from '../../package.json'

const Summary = () => {
  const microapp = useRef(new MicroApp({}))

  useEffect(() => {
    microapp.current.initialize()
  }, [])

  const showDetail = detailPage => {
    // We have to use the hash router to show detail due to Github pages limitations
    microapp.current.showDetail({
      url: `${window.location.origin}${window.location.pathname}#/${detailPage}`,
      title: 'UAT Microapp Detail'
    })
  }

  return (
    <div>
      <h1>UAT Microapp</h1>
      <p>This is the "UAT" microapp. v{version}</p>
      <section className="section">
        <Tests microapp={microapp.current} panel="summary" />
        <label htmlFor="test-input">Test Input</label>
        <input type="text" placeholder="Input Test" name="test-input" />
      </section>
      <div className="action-block vertical">
        <button className="primary" onClick={() => showDetail('iframe')}>
          iFrame Tests
        </button>
      </div>
    </div>
  )
}

export default Summary
