import React, { useState, useEffect, useRef } from 'react'
import { decode } from 'jsonwebtoken'

const testTypes = [
  { name: 'Token' },
  { name: 'Title' },
  { name: 'Show', inDetail: false },
  { name: 'Hide', inSummary: false }
]

export default ({ microapp, panel = 'summary' }) => {
  const [tests, setTests] = useState(
    testTypes.map(testType => ({ inSummary: true, inDetail: true, loading: false, result: false, ...testType }))
  )
  const testActions = useRef({})

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => testToken(), [microapp])

  useEffect(() => {
    testActions.current.Token = testToken
    testActions.current.Title = testTitle
    testActions.current.Show = testShow
    testActions.current.Hide = testHide
  })

  const runTest = testName => () => {
    testActions.current[testName]()
  }

  const updateTest = (name, update) => {
    setTests(prevTests => {
      return prevTests.map(test => {
        if (test.name === name) {
          return { ...test, ...update }
        } else {
          return test
        }
      })
    })
  }

  const testToken = () => {
    if (!microapp) return

    updateTest('Token', { loading: true, result: false })
    // Arbitrarily add a "loading time" other wise you are kind of "did it work?"
    setTimeout(async () => {
      const token = await microapp.getToken()
      // This would be done on a server side, notice how I'm not verifying the token
      const decodedToken = decode(token)
      // TODO alter this verification when this app is upgraded to the more secure token
      if (decodedToken.aud === process.env.REACT_APP_AUD) {
        updateTest('Token', { loading: false, result: true })
      } else {
        updateTest('Token', { loading: false, result: false })
        console.warn(`Invalid token: ${decodedToken.aud} !== ${process.env.REACT_APP_AUD}`)
      }
    }, 500)
  }

  const testTitle = () => {
    updateTest('Title', { result: false })
    microapp.updateTitle(`Title Change: ${Math.floor(Math.random() * 500)}`)
    updateTest('Title', { result: true })
  }

  const testShow = () => {
    updateTest('Show', { result: false })
    microapp.showDetail({ url: `${window.location.origin}${window.location.pathname}#/tests` })
    updateTest('Show', { result: true })
  }

  const testHide = () => {
    updateTest('Hide', { result: false })
    microapp.hideDetail()
    updateTest('Hide', { result: true })
  }

  return (
    <>
      <strong>Tests:</strong>
      {tests
        .filter(test => (panel === 'summary' && test.inSummary) || (panel === 'detail' && test.inDetail))
        .map(test => (
          <div className="checklist" key={test.name}>
            {test.loading ? (
              <span aria-label="loading" role="img" className="pass">
                🤔
              </span>
            ) : (
              <>
                {test.result ? (
                  <span aria-label="pass" role="img" className="pass">
                    ✅
                  </span>
                ) : (
                  <span aria-label="fail" role="img" className="pass">
                    ❌
                  </span>
                )}
              </>
            )}
            <div className="item">{test.name}</div>
            <div className="item">
              <button className="action-small" onClick={runTest(test.name)}>
                Run
              </button>
            </div>
          </div>
        ))}
    </>
  )
}
