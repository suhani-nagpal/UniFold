import { useState, useEffect } from 'react'
import './App.css'

const courses = [
  { id: 'cs101', name: 'Data Structures & Algorithms', detail: 'Notes, PYQs, visualizer & practice problems', image: 'photo-1516321318423-f06f85e504b3', tag: 'COMPUTER SCIENCE' },
  { id: 'math201', name: 'Engineering Mathematics', detail: 'Formula sheets, solved questions & lecture summaries', image: 'photo-1509228468518-180dd4864904', tag: 'MATHEMATICS' },
  { id: 'ee301', name: 'Digital Electronics & VLSI', detail: 'Circuit schematics, lab manual & study resources', image: 'photo-1516321497487-e288fb19713f', tag: 'ELECTRONICS' },
  { id: 'ai401', name: 'Machine Learning Fundamentals', detail: 'Datasets, Jupyter notebooks & Python guides', image: 'photo-1618005182384-a83a8bd57fbe', tag: 'ARTIFICIAL INTELLIGENCE' },
]

const events = [
  { id: 1, day: '18', month: 'OCT', name: 'Design Week Showcase', society: 'Design Society', time: '4:00 PM', location: 'Hall B' },
  { id: 2, day: '21', month: 'OCT', name: 'CodeSprint 2026 Hackathon', society: 'Coding Club', time: '11:00 AM', location: 'Lab 4' },
  { id: 3, day: '24', month: 'OCT', name: 'Acoustic Open Mic Night', society: 'Cultural Society', time: '6:30 PM', location: 'Amphitheater' },
]

// Reusable Modern Logo Component
// You can either:
// 1. Pass customSrc="/your-logo.png" to render your own image file
// 2. Omit customSrc to use the built-in modern SVG vector crest
function Logo({ customSrc = null, collapsed = false, className = '' }) {
  if (customSrc) {
    return (
      <div className={`brand-logo ${className}`}>
        <img src={customSrc} alt="UniFold Logo" className="custom-logo-img" />
      </div>
    )
  }

  return (
    <div className={`brand-logo ${collapsed ? 'collapsed' : ''} ${className}`}>
      <div className="brand-icon-shield">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="brand-svg">
          <defs>
            <linearGradient id="foldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="foldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="foldGrad3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>
          {/* Isometric folded leaf/origami prism geometry */}
          <path d="M18 3L4 10.5V25.5L18 33L32 25.5V10.5L18 3Z" fill="url(#foldGrad3)" opacity="0.25" />
          <path d="M18 3L32 10.5L18 18L4 10.5L18 3Z" fill="url(#foldGrad2)" />
          <path d="M18 18V33L32 25.5V10.5L18 18Z" fill="url(#foldGrad1)" />
          <path d="M18 18V33L4 25.5V10.5L18 18Z" fill="url(#foldGrad2)" opacity="0.65" />
          {/* Central core node */}
          <circle cx="18" cy="18" r="2.8" fill="#ffffff" />
          <circle cx="18" cy="18" r="1.4" fill="#047857" />
        </svg>
      </div>

      {!collapsed && (
        <div className="brand-text-lockup">
          <span className="brand-title">
            Uni<span className="brand-accent">Fold</span>
          </span>
          <span className="brand-pill">CAMPUS OS</span>
        </div>
      )}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" className="google-svg">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

function App() {
  const [page, setPage] = useState('Dashboard')
  // Theme state with localStorage persistence and system preference default
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('unifold_theme')
      if (stored) return stored
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    } catch {
      return 'light'
    }
  })

  const [loggedIn, setLoggedIn] = useState(false)
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState([])
  const [notice, setNotice] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Demo custom logo toggle (optional demonstration for user)
  // Set customLogoSrc to null to use vector logo, or provide an image path
  const [customLogoSrc, setCustomLogoSrc] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem('unifold_theme', theme)
    } catch (e) {
      console.error(e)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const navItems = [
    { title: 'Dashboard', icon: '⌂', group: 'OVERVIEW' },
    { title: 'Study Material', icon: '▤', group: 'LEARN' },
    { title: 'Timetable', icon: '▦', group: 'LEARN' },
    { title: 'Societies', icon: '♧', group: 'CAMPUS LIFE' },
    { title: 'Events', icon: '✳', group: 'CAMPUS LIFE' },
  ]

  const changePage = (nextPage) => {
    setPage(nextPage)
    setNotice('')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const filteredCourses = courses.filter((course) =>
    `${course.name} ${course.tag} ${course.detail}`.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSave = (name) => {
    setSaved((previous) =>
      previous.includes(name)
        ? previous.filter((item) => item !== name)
        : [...previous, name]
    )
  }

  return (
    <div className={`app ${theme}`}>
      {!loggedIn ? (
        <div className="login-page">
          <header className="login-topbar">
            <button className="brand-btn" onClick={() => setNotice('Welcome to UniFold!')}>
              <Logo customSrc={customLogoSrc} />
            </button>

            <div className="login-top-actions">
              <button
                className="icon-button theme-toggle-btn"
                title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                onClick={toggleTheme}
                aria-label="Toggle color theme"
              >
                <span className="theme-icon">{theme === 'light' ? '☾' : '☀'}</span>
                <span className="theme-toggle-label">{theme === 'light' ? 'Dark' : 'Light'}</span>
              </button>

              <span className="login-account-cue">Already have an account?</span>
              <button
                className="login-top-link"
                onClick={() => document.getElementById('login-email')?.focus()}
              >
                Sign in ↗
              </button>
            </div>
          </header>

          <main className="login-main">
            <section className="login-intro">
              <div className="login-eyebrow">
                <span className="pulse-dot" />
                <span>YOUR CAMPUS, CONNECTED</span>
              </div>
              <h1>
                Your campus life,<br />
                all <em>in one place.</em>
              </h1>
              <p>
                Study smarter, find your community, access PYQs & notes, and stay in the loop with everything happening on campus.
              </p>

              <div className="login-visual">
                <div className="login-visual-glow" />
                <div className="login-visual-circle circle-a" />
                <div className="login-visual-circle circle-b" />
                <div className="login-visual-copy">
                  <span>ONE CAMPUS ECOSYSTEM</span>
                  <strong>ENDLESS<br />POSSIBILITIES.</strong>
                </div>
                <span className="visual-star">✦</span>
              </div>

              <div className="login-benefits">
                <span className="benefit-pill">↗ Verified Notes & PYQs</span>
                <span className="benefit-pill">↗ Live Campus Events</span>
                <span className="benefit-pill">↗ Student Societies</span>
              </div>
            </section>

            <section className="login-card">
              <span className="section-kicker">PORTAL ACCESS</span>
              <h2>Good to have you here<span>.</span></h2>
              <p className="login-subtitle">
                Sign in with your university credentials to get started.
              </p>

              <form onSubmit={(e) => {
                e.preventDefault()
                setLoggedIn(true)
                setPage('Dashboard')
                setNotice('Welcome back! You are now logged in.')
              }}>
                <label htmlFor="login-email">College email</label>
                <input
                  id="login-email"
                  type="email"
                  defaultValue="student@campus.edu"
                  placeholder="you@college.edu"
                  required
                />

                <div className="password-heading">
                  <label htmlFor="login-password">Password</label>
                  <button
                    type="button"
                    onClick={() => setNotice('Password reset link will be sent to your college email.')}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  defaultValue="campuspassword"
                  placeholder="Enter your password"
                  required
                />

                <label className="remember-label">
                  <input type="checkbox" defaultChecked />
                  <span>Remember this device</span>
                </label>

                <button className="login-submit" type="submit">
                  <span>Sign into Campus OS</span>
                  <span className="arrow-icon">↗</span>
                </button>
              </form>

              <div className="login-divider">
                <span />
                <em>OR CONTINUE WITH</em>
                <span />
              </div>

              <button
                className="google-login"
                type="button"
                onClick={() => {
                  setLoggedIn(true)
                  setNotice('Signed in with Google Campus SSO.')
                }}
              >
                <GoogleIcon />
                <span>Continue with Google Student ID</span>
              </button>

              {notice && (
                <div className="login-notice-banner">
                  <span>ℹ️ {notice}</span>
                  <button type="button" onClick={() => setNotice('')}>×</button>
                </div>
              )}

              <p className="login-terms">
                By signing in, you agree to UniFold's <span>Terms of Service</span> and{' '}
                <span>Privacy Policy</span>.
              </p>
            </section>
          </main>

          <footer className="login-footer">
            <span>© 2026 UniFold Campus OS. All rights reserved.</span>
            <span className="footer-status">
              <span className="status-indicator" /> SYSTEM OPERATIONAL
            </span>
          </footer>
        </div>
      ) : (
        <>
          {/* Mobile Overlay */}
          {mobileMenuOpen && (
            <div className="mobile-backdrop" onClick={() => setMobileMenuOpen(false)} />
          )}

          <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <button className="brand" onClick={() => changePage('Dashboard')}>
                <Logo customSrc={customLogoSrc} />
              </button>
              <button
                className="close-mobile-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="campus-label">NAVIGATION MENU</div>

            {['OVERVIEW', 'LEARN', 'CAMPUS LIFE'].map((group) => (
              <div className="nav-group" key={group}>
                <p className="nav-heading">{group}</p>
                {navItems
                  .filter((item) => item.group === group)
                  .map((item) => (
                    <button
                      key={item.title}
                      className={`nav-link ${page === item.title ? 'active' : ''}`}
                      onClick={() => changePage(item.title)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-text">{item.title}</span>
                      {item.title === 'Events' && <span className="nav-dot" title="Live updates" />}
                    </button>
                  ))}
              </div>
            ))}

            <div className="sidebar-bottom">
              <div className="help-card">
                <div className="help-header">
                  <span className="help-icon">✦</span>
                  <span className="help-tag">PRO TIP</span>
                </div>
                <p>Curated Campus Resources</p>
                <span>Upload lecture notes or past exam questions to earn society credits.</span>
              </div>

              <div className="profile-row">
                <span className="avatar">JD</span>
                <div className="profile-copy">
                  <strong>John Doe</strong>
                  <small>Computer Science • Year 3</small>
                </div>
                <button
                  className="profile-menu"
                  title="Profile actions"
                  onClick={() => setNotice('Profile & Academic Records settings opened.')}
                >
                  ···
                </button>
              </div>
            </div>
          </aside>

          <main className="main-area">
            <header className="topbar">
              <div className="topbar-left">
                <button
                  className="mobile-hamburger-btn"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open navigation menu"
                >
                  ☰
                </button>
                <div className="breadcrumb">
                  <span className="brand-crumb">UniFold</span>
                  <span className="crumb-sep">/</span>
                  <span className="crumb-active">{page}</span>
                </div>
              </div>

              <div className="top-actions">
                <label className="search-box">
                  <span className="search-icon">⌕</span>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search courses, PYQs, societies..."
                  />
                  {search ? (
                    <button className="clear-search" onClick={() => setSearch('')}>×</button>
                  ) : (
                    <kbd>/</kbd>
                  )}
                </label>

                <button
                  className="icon-button theme-toggle-btn"
                  title={`Toggle ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
                  onClick={toggleTheme}
                  aria-label="Toggle color theme"
                >
                  {theme === 'light' ? '☾' : '☀'}
                </button>

                <button
                  className="icon-button notification-button"
                  title="Notifications"
                  onClick={() => setNotice('You are all caught up! 0 unread alerts.')}
                >
                  <span>🔔</span>
                  <span className="bell-badge" />
                </button>

                <button
                  className="logout-button"
                  onClick={() => {
                    setLoggedIn(false)
                    setNotice('')
                  }}
                >
                  <span>Log out</span>
                  <span className="logout-icon">↪</span>
                </button>
              </div>
            </header>

            {notice && (
              <div className="notice">
                <div className="notice-content">
                  <span className="notice-icon">✨</span>
                  <span>{notice}</span>
                </div>
                <button className="notice-close" onClick={() => setNotice('')}>×</button>
              </div>
            )}

            {page === 'Dashboard' && (
              <div className="page-content">
                <section className="welcome-banner">
                  <div className="banner-copy">
                    <span className="banner-label">
                      <span className="banner-pulse" /> SEMESTER 5 • LIVE
                    </span>
                    <h1>
                      Make your campus<br />life <em>effortlessly organized.</em>
                    </h1>
                    <p>
                      Access peer-verified notes, discover upcoming hackathons, and collaborate with your peers in one integrated hub.
                    </p>
                    <div className="banner-cta-group">
                      <button
                        className="banner-button primary"
                        onClick={() => changePage('Study Material')}
                      >
                        Explore resources <span>↗</span>
                      </button>
                      <button
                        className="banner-button secondary"
                        onClick={() => changePage('Timetable')}
                      >
                        View Schedule
                      </button>
                    </div>
                  </div>

                  <div className="banner-art">
                    <div className="art-orbit orbit-one" />
                    <div className="art-orbit orbit-two" />
                    <div className="art-circle">
                      <span className="circle-letter">U</span>
                    </div>
                    <span className="art-note note-one">STUDY SMART</span>
                    <span className="art-note note-two">CAMPUS READY</span>
                    <span className="art-spark">✦</span>
                  </div>

                  <span className="banner-index">SYS.V2.4 • UNIFOLD ACTIVE</span>
                </section>

                <section className="section-block">
                  <div className="section-heading">
                    <div>
                      <span className="section-kicker">COURSE REPOSITORY</span>
                      <h2>Pick up where you left off<span>.</span></h2>
                    </div>
                    <div className="heading-right">
                      {saved.length > 0 && (
                        <span className="saved-counter">
                          ♥ {saved.length} Bookmarked
                        </span>
                      )}
                      <button className="view-all" onClick={() => changePage('Study Material')}>
                        All resources ↗
                      </button>
                    </div>
                  </div>

                  <div className="course-grid">
                    {filteredCourses.map((course, index) => (
                      <article className="course-card" key={course.id || course.name}>
                        <div
                          className={`course-image image-${index + 1}`}
                          style={{
                            backgroundImage: `url(https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=800&q=85)`,
                          }}
                        >
                          <div className="course-image-overlay" />
                          <span className="course-tag">{course.tag}</span>
                          <button
                            className={`save-button ${saved.includes(course.name) ? 'is-saved' : ''}`}
                            title={saved.includes(course.name) ? 'Remove bookmark' : 'Bookmark resource'}
                            onClick={() => toggleSave(course.name)}
                          >
                            {saved.includes(course.name) ? '♥' : '♡'}
                          </button>
                        </div>
                        <div className="course-info">
                          <h3>{course.name}</h3>
                          <p>{course.detail}</p>
                          <button
                            className="course-action-btn"
                            onClick={() => setNotice(`Opening ${course.name} lecture repository...`)}
                          >
                            <span>Explore materials</span>
                            <span className="arrow">↗</span>
                          </button>
                        </div>
                      </article>
                    ))}
                    {filteredCourses.length === 0 && (
                      <div className="empty-state-box">
                        <span className="empty-icon">🔍</span>
                        <h3>No resources found matching "{search}"</h3>
                        <p>Try searching by subject name, course code, or department tags.</p>
                        <button className="reset-search-btn" onClick={() => setSearch('')}>
                          Clear search filter
                        </button>
                      </div>
                    )}
                  </div>
                </section>

                <section className="bottom-grid">
                  <div className="events-panel">
                    <div className="section-heading compact-heading">
                      <div>
                        <span className="section-kicker">CAMPUS CALENDAR</span>
                        <h2>Upcoming Events<span>.</span></h2>
                      </div>
                      <button className="view-all" onClick={() => changePage('Events')}>
                        All events ↗
                      </button>
                    </div>
                    {events.slice(0, 3).map((event) => (
                      <div className="event-row" key={event.id || event.name}>
                        <div className="event-date">
                          <span className="event-month">{event.month}</span>
                          <strong className="event-day">{event.day}</strong>
                        </div>
                        <div className="event-info">
                          <strong>{event.name}</strong>
                          <span className="event-society-tag">{event.society} • {event.location}</span>
                        </div>
                        <span className="event-time">{event.time}</span>
                      </div>
                    ))}
                  </div>

                  <div className="quick-panel">
                    <span className="section-kicker">WORKFLOW SHORTCUTS</span>
                    <h2>Less searching.<br />More doing<span>.</span></h2>
                    <div className="quick-actions-list">
                      <button onClick={() => changePage('Timetable')}>
                        <span className="action-glyph">▦</span>
                        <div className="action-text">
                          <strong>Check weekly schedule</strong>
                          <small>View lecture halls & lab timings</small>
                        </div>
                        <span className="action-arr">↗</span>
                      </button>
                      <button onClick={() => changePage('Societies')}>
                        <span className="action-glyph">♧</span>
                        <div className="action-text">
                          <strong>Find campus societies</strong>
                          <small>Join clubs, tech groups & cultural wings</small>
                        </div>
                        <span className="action-arr">↗</span>
                      </button>
                      <button onClick={() => changePage('Events')}>
                        <span className="action-glyph">✳</span>
                        <div className="action-text">
                          <strong>Browse hackathons & fests</strong>
                          <small>RSVP to upcoming university activities</small>
                        </div>
                        <span className="action-arr">↗</span>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {page !== 'Dashboard' && (
              <div className="page-content inner-page">
                <span className="section-kicker">EXPLORE YOUR CAMPUS</span>
                <h1 className="inner-title">{page}<span>.</span></h1>
                <p className="inner-description">
                  {page === 'Study Material' && 'Handwritten notes, previous year solved question papers, and curated cheatsheets for your courses.'}
                  {page === 'Timetable' && 'Track your weekly lectures, lab sessions, and classroom assignments in one synchronized view.'}
                  {page === 'Societies' && 'Connect with student clubs, technical chapters, and creative organizations on campus.'}
                  {page === 'Events' && 'Browse upcoming workshops, tech fests, cultural nights, and campus activities.'}
                </p>

                {page === 'Study Material' && (
                  <div className="course-grid inner-courses">
                    {filteredCourses.map((course, index) => (
                      <article className="course-card" key={course.id || course.name}>
                        <div
                          className={`course-image image-${index + 1}`}
                          style={{
                            backgroundImage: `url(https://images.unsplash.com/${course.image}?auto=format&fit=crop&w=800&q=85)`,
                          }}
                        >
                          <div className="course-image-overlay" />
                          <span className="course-tag">{course.tag}</span>
                          <button
                            className={`save-button ${saved.includes(course.name) ? 'is-saved' : ''}`}
                            onClick={() => toggleSave(course.name)}
                          >
                            {saved.includes(course.name) ? '♥' : '♡'}
                          </button>
                        </div>
                        <div className="course-info">
                          <span className="section-kicker">{course.tag}</span>
                          <h3>{course.name}</h3>
                          <p>{course.detail}</p>
                          <button
                            className="course-action-btn"
                            onClick={() => setNotice(`Accessing ${course.name} documents...`)}
                          >
                            <span>Download syllabus & papers</span>
                            <span>↗</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {page === 'Events' && (
                  <div className="events-panel full-panel">
                    {events.map((event) => (
                      <div className="event-row" key={event.id || event.name}>
                        <div className="event-date">
                          <span className="event-month">{event.month}</span>
                          <strong className="event-day">{event.day}</strong>
                        </div>
                        <div className="event-info">
                          <strong>{event.name}</strong>
                          <span className="event-society-tag">{event.society} • {event.location}</span>
                        </div>
                        <span className="event-time">{event.time}</span>
                        <button
                          className="rsvp-button"
                          onClick={() => setNotice(`RSVP confirmed for ${event.name}!`)}
                        >
                          RSVP
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {page === 'Timetable' && (
                  <div className="timetable-container">
                    <div className="timetable-grid">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
                        <div className="timetable-col" key={day}>
                          <div className="day-header">
                            <strong>{day}</strong>
                            <small>Oct {19 + idx}</small>
                          </div>
                          <div className="slot-card">
                            <span className="slot-time">09:00 - 10:30 AM</span>
                            <strong>Data Structures</strong>
                            <small>Hall B • Prof. Sharma</small>
                          </div>
                          <div className="slot-card highlight">
                            <span className="slot-time">11:00 - 12:30 PM</span>
                            <strong>Engg Mathematics</strong>
                            <small>Room 302 • Dr. Rao</small>
                          </div>
                          <div className="slot-card">
                            <span className="slot-time">02:00 - 04:00 PM</span>
                            <strong>Digital Systems Lab</strong>
                            <small>Lab 3 • Hands-on</small>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {page === 'Societies' && (
                  <div className="society-grid">
                    {[
                      { num: '01', name: 'Coding Club', desc: 'Competitive programming, open-source builds, and full-stack hackathons.', members: '480+ Members', active: 'Active today' },
                      { num: '02', name: 'Design Society', desc: 'UI/UX design, visual branding, typography, and product design workshops.', members: '320+ Members', active: 'Meeting Friday' },
                      { num: '03', name: 'Cultural Society', desc: 'Music, theater, dance, open mics, and campus cultural fest organizing.', members: '650+ Members', active: 'Rehearsals live' },
                      { num: '04', name: 'Robotics & AI Guild', desc: 'Autonomous drones, embedded robotics, and machine learning research projects.', members: '290+ Members', active: 'Lab session today' },
                      { num: '05', name: 'Literary & Debate Club', desc: 'Parliamentary debates, creative writing, and inter-university symposiums.', members: '210+ Members', active: 'Weekly debate' },
                      { num: '06', name: 'Entrepreneurship Cell', desc: 'Startup incubation, venture funding sessions, and founder meetups.', members: '390+ Members', active: 'Pitch deck clinic' },
                    ].map((soc) => (
                      <article className="society-card" key={soc.name}>
                        <div className="society-card-top">
                          <span>{soc.num} / CAMPUS CHAPTER</span>
                          <span className="society-status-pill">{soc.active}</span>
                        </div>
                        <h2>{soc.name}</h2>
                        <p>{soc.desc}</p>
                        <div className="society-meta">
                          <span>👥 {soc.members}</span>
                        </div>
                        <button onClick={() => setNotice(`Application submitted for ${soc.name}!`)}>
                          <span>Join Society</span>
                          <span>↗</span>
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            <footer className="footer">
              <div className="footer-left">
                <span className="footer-brand">UniFold.</span>
                <span>The Modern Student Campus Platform.</span>
              </div>
              <div className="footer-right">
                <span className="footer-pill">ACADEMIC YEAR 2026</span>
                <span>MADE FOR CAMPUS LIFE.</span>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  )
}

export default App
