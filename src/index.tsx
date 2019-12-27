import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './global-style'
import Uploader from './components/logo-uploader'

console.info(`⚛️ ${React.version}`)

const App = () => (
  <>
    <GlobalStyle />
    <Uploader />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
