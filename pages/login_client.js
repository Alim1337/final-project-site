import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Image from 'next/image'

const L = { gold: '#B8892A', bg: '#EDE9E1', bg2: '#E4DFD5', text: '#1A1713', muted: '#5A5248', faint: '#8A8278', border: 'rgba(184,137,42,0.22)' }

export default function LoginClient() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/api_login_client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    setLoading(false)
    if (response.ok) {
      const { token } = await response.json()
      localStorage.setItem('token', token)
      router.push('/clientHouses')
    } else {
      const error = await response.text()
      toast.error(error, { position: toast.POSITION.TOP_CENTER })
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: L.bg }}>

      {/* LEFT — image panel */}
      <div style={{ width: '42%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=60"
          fill
          style={{ objectFit: 'cover', filter: 'brightness(0.55) saturate(0.7)' }}
          alt="Luxury property"
          priority
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(237,233,225,0.15) 0%, rgba(237,233,225,0.7) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #B8892A, transparent)' }} />

        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '56px 48px' }}>
          <div
            onClick={() => router.push('/')}
            style={{ cursor: 'pointer', marginBottom: 32 }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 300, letterSpacing: 6, color: '#EDE9E1' }}>
              E-KRILI
            </div>
            <div style={{ fontSize: 9, letterSpacing: 5, color: 'rgba(237,233,225,0.6)', fontFamily: "'Raleway', sans-serif", marginTop: 4 }}>
              IMMOBILIER DE PRESTIGE
            </div>
          </div>
          <div style={{ width: 32, height: 1, background: L.gold, marginBottom: 28 }} />
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 300, color: 'rgba(237,233,225,0.7)', letterSpacing: 1, lineHeight: 2 }}>
            L&apos;immobilier de prestige<br />
            à portée de main.<br /><br />
            Des propriétés d&apos;exception<br />
            pour une clientèle d&apos;exception.
          </p>
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 70px', background: L.bg2, borderLeft: `1px solid ${L.border}` }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: L.text }}>
          Bon retour
        </div>
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 4, color: L.faint, marginTop: 6, marginBottom: 44 }}>
          CONNECTEZ-VOUS À VOTRE ESPACE
        </div>

        <form onSubmit={handleLogin} style={{ maxWidth: 400 }}>
          <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 4, color: L.gold, marginBottom: 10 }}>
            ADRESSE EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="exemple@email.com"
            className="login-input"
          />

          <label style={{ display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 4, color: L.gold, marginBottom: 10 }}>
            MOT DE PASSE
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="login-input"
          />

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, maxWidth: 400 }}>
          <a className="login-link">Mot de passe oublié ?</a>
          <a className="login-link" onClick={() => router.push('/signup_client')} style={{ cursor: 'pointer' }}>
            Pas encore membre ? <span>Créer un compte</span>
          </a>
        </div>
      </div>

      <ToastContainer toastStyle={{ background: L.bg2, color: L.text, border: `1px solid ${L.border}` }} />
    </div>
  )
}