import { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (signInError) setError(signInError.message)
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <p className="eyebrow">ZR Kitchen</p>
        <h1>Admin Login</h1>

        {!isSupabaseConfigured ? (
          <p className="admin-login__error">
            The admin portal isn&rsquo;t connected yet — Supabase needs to be set up first (see README).
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="admin-email">
              Email
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="admin-password">
              Password
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {error && <p className="admin-login__error">{error}</p>}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
