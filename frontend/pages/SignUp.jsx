import { Link } from 'react-router-dom'

export default function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Signed up (mock only – connect to backend later).')
  }

  return (
    <div className="auth-wrap">
      <div className="diagonal-bg" />
      <div className="auth-card">
        <Link to="/" className="back">← Previous</Link>
        <h2 className="auth-title">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="icon">📝</span>
            <input type="text" placeholder="First name" />
          </div>

          <div className="field">
            <span className="icon">📝</span>
            <input type="text" placeholder="Last name" />
          </div>

          <div className="field">
            <span className="icon">👤</span>
            <input type="text" placeholder="Username" />
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Password" />
            <span className="eye" aria-hidden>👁️</span>
          </div>

          <div className="field">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Confirm Password" />
            <span className="eye" aria-hidden>👁️</span>
          </div>

          <div className="field">
            <span className="icon">📏</span>
            <input type="number" placeholder="Height (cm)" />
          </div>

          <div className="field">
            <span className="icon">⚖️</span>
            <input type="number" placeholder="Weight (kg)" />
          </div>

          <div className="field">
            <span className="icon">⚧️</span>
            <input type="text" placeholder="Sex" />
          </div>

          <div className="field">
            <span className="icon">💊</span>
            <input type="text" placeholder="Diseases / Conditions" />
          </div>

          <div className="field">
            <span className="icon">📊</span>
            <input type="number" step="0.1" placeholder="BMI" />
          </div>

          <button type="submit" className="btn submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
