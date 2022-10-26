import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import ContractForm from './components/ContractForm'
import Contracts from './components/Contracts'

import PrivateRoutes from './utils/PrivateRoutes'

import { AuthProvider } from './context/useAuth'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route element={<Contracts />} path="/contracts" />
              <Route element={<ContractForm />} path="/contract" />
              <Route
                element={<ContractForm />}
                path="/contract/:socialReason"
              />
            </Route>
            <Route element={<LoginForm />} path="/login" />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
