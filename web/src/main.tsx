import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import GlobalStyle from './styles/global'
import { ThemeProvider } from 'styled-components'
import './styles/global.ts'
import theme from './styles/theme'

import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
