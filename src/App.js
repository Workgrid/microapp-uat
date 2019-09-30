import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Summary from './pages/Summary'
import IFrameDetail from './pages/IFrameDetail'
import TestDetail from './pages/TestDetail'

const App = () => {
  return (
    <Router basename={window.location.pathname}>
      <Route path="/" exact component={Summary} />
      <Route path="/tests" component={TestDetail} />
      <Route path="/iframe" component={IFrameDetail} />
    </Router>
  )
}

export default App
