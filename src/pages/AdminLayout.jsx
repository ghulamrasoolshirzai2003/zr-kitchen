import { useEffect, useState } from 'react'
import { Outlet, Link, NavLink } from 'react-router-dom'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'

export default function AdminLayout() {
  const [session, setSession] = useState(undefined) // undefined = checking, null = signed out

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setSession(null)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="admin-login">
        <p className="admin-login__loading">Checking session…</p>
      </div>
    )
  }

  if (!session) {
    return <AdminLogin />
  }

  return (
    <div className="admin-shell">
      <header className="admin-shell__header">
        <Link to="/" className="admin-shell__brand">
          ZR Kitchen <span>Admin</span>
        </Link>
        <button type="button" className="btn btn-outline admin-shell__logout" onClick={() => supabase.auth.signOut()}>
          Log Out
        </button>
      </header>
      <nav className="admin-shell__nav">
        <NavLink to="/admin" end>
          Orders
        </NavLink>
        <NavLink to="/admin/sales">Sales</NavLink>
        <NavLink to="/admin/menu">Menu</NavLink>
        <NavLink to="/admin/tables">Tables</NavLink>
        <NavLink to="/admin/qr">QR Code</NavLink>
      </nav>
      <main className="admin-shell__main">
        <Outlet />
      </main>
    </div>
  )
}
