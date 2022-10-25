import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

import GlobalStyle from './styles/global'
import { ThemeProvider } from 'styled-components'
import './styles/global.ts'
import theme from './styles/theme'
import { AuthProvider } from './context/useAuth'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)
