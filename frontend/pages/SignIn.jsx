import { Link } from 'react-router-dom'

export default function SignIn() {
  return (
    <div className="auth-wrap">
      <div className="diagonal-bg" />
      <div className="auth-card">
        <Link to="/" className="back">← Previous</Link>
        <h2 className="auth-title">Sign In</h2>
        <div className="field">
          <span className="icon">👤</span>
          <input type="text" placeholder="Username" />
        </div>
        <div className="field">
          <span className="icon">🔒</span>
          <input type="password" placeholder="Password" />
          <span className="eye" aria-hidden>👁️</span>
        </div>
        <button className="btn submit">Submit</button>
      </div>
    </div>
  )
}
