import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    Hello World
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
