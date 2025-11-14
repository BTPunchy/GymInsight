import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const isActive = (path) => (pathname === path ? 'link active' : 'link')

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="brand">FitQuery</div>

        <nav className="nav-links">
          <Link className={isActive('/')} to="/">
            Home
          </Link>

          <a className="link" href="#service">
            Service
          </a>

          <Link className={isActive('/booking')} to="/booking">
            Booking
          </Link>

          <Link className={pathname.startsWith('/trainers') ? 'link active' : 'link'} to="/trainers">
            Trainer
          </Link>

          {/* ถ้าอยากให้ Users เหมือนเมนู admin ก็แปะไว้ตรงนี้ก่อน */}
          <Link className={isActive('/users')} to="/users">
            Users
          </Link>

          <Link
            className={pathname === '/signin' ? 'btn outline active' : 'btn outline'}
            to="/signin"
          >
            Sign In
          </Link>

          <Link
            className="btn solid"
            to="/signup"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  )
}
