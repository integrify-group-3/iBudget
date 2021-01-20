import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'

import App from './App'
import makeStore from './redux/store'
import { theme } from './components/Theme'

const store = makeStore()

const WithProvider = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<WithProvider />, document.getElementById('root'))
