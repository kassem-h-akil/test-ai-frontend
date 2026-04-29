import { Routes, Route, NavLink } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Terms from './pages/Terms.jsx'
import Privacy from './pages/Privacy.jsx'

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <NavLink to="/" className="brand">TestAI</NavLink>
        <nav>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/terms">Terms</NavLink>
          <NavLink to="/privacy">Privacy</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <span>&copy; {new Date().getFullYear()} TestAI</span>
        <span>
          <NavLink to="/terms">Terms</NavLink>
          {' · '}
          <NavLink to="/privacy">Privacy</NavLink>
        </span>
      </footer>
    </div>
  )
}
