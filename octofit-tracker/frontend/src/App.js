import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.svg';

function Home() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h1 className="h3 mb-3">OctoFit Tracker Dashboard</h1>
        <p className="lead mb-0">
          Browse the backend REST API resources for activities, leaderboard, teams, users, and workouts.
          Use the navigation menu to jump between views.
        </p>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4">Page not found</h2>
        <p className="mb-0">The page you requested does not exist. Use the menu above to select a valid section.</p>
      </div>
    </div>
  );
}

function App() {
  console.log('App initialized with React Router navigation.');

  return (
    <Router>
      <div className="App container py-4">
        <header className="mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <img src={logo} alt="OctoFit logo" className="app-logo-small" />
              <div>
                <h1 className="h2 mb-1 app-heading">OctoFit Tracker</h1>
                <p className="text-muted mb-0">React frontend connected to the Django REST API backend.</p>
              </div>
            </div>
            <NavLink className="btn btn-outline-light" to="/">
              Home
            </NavLink>
          </div>
        </header>

        <nav className="navbar navbar-expand-lg navbar-light bg-white rounded shadow-sm mb-4">
          <div className="container-fluid px-0">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav nav-pills">
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/activities">
                    Activities
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/leaderboard">
                    Leaderboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/teams">
                    Teams
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/users">
                    Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/workouts">
                    Workouts
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
