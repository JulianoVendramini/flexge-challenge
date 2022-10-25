import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import Contracts from './components/Contracts'

import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<Contracts />} path="/contracts" />
          </Route>
          <Route element={<LoginForm />} path="/login" />
        </Routes>
      </Router>
    </div>
  )
}

export default App
