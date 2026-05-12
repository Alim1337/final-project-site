import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Image from 'next/image'

const L = { gold: '#B8892A', bg: '#EDE9E1', bg2: '#E4DFD5', text: '#1A1713', muted: '#5A5248', faint: '#8A8278', border: 'rgba(184,137,42,0.22)' }

export default function SignupClient() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', mdps: '', date_naissance: '', sex: '' })
  const router = useRouter()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const response = await fetch('/api/api_insert_client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    const data = await response.json()
    setLoading(false)
    if (response.ok) {
      toast.success('Compte créé avec succès !', { position: toast.POSITION.TOP_CENTER })
      setTimeout(() => router.push('/login_client'), 1500)
    } else {
      toast.error(data?.error || 'Erreur lors de la création du compte', { position: toast.POSITION.TOP_CENTER })
    }
  }

  const labelStyle = { display: 'block', fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: 4, color: L.gold, marginBottom: 10 }

  return (
    <div style={{ minHeight: '100vh', background: L.bg, display: 'flex', flexDirection: 'column' }}>

      {/* Minimal header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 48px', borderBottom: `1px solid ${L.border}`, background: L.bg, position: 'sticky', top: 0, zIndex: 10 }}>
        <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, letterSpacing: 5, color: L.gold }}>
            E-KRILI
          </div>
          <div style={{ fontSize: 8, letterSpacing: 4, color: L.faint, fontFamily: "'Raleway', sans-serif", marginTop: 2 }}>
            IMMOBILIER DE PRESTIGE
          </div>
        </div>
        <button
          onClick={() => router.push('/login_client')}
          style={{ background: 'transparent', border: `1px solid ${L.border}`, color: L.muted, fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3, padding: '9px 20px', cursor: 'pointer' }}
        >
          SE CONNECTER
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* LEFT decorative panel */}
        <div style={{ width: '32%', position: 'relative', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '56px 40px' }}>
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=60"
            fill
            style={{ objectFit: 'cover', filter: 'brightness(0.5) saturate(0.65)' }}
            alt="Luxury interior"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(237,233,225,0.12) 0%, rgba(237,233,225,0.65) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right, #B8892A, transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: '#1A1713', fontStyle: 'italic', lineHeight: 1.2, marginBottom: 16 }}>
              &ldquo;L&apos;excellence<br />commence ici.&rdquo;
            </div>
            <div style={{ width: 28, height: 1, background: L.gold, marginBottom: 14 }} />
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3, color: L.muted }}>
              REJOIGNEZ LA COMMUNAUTÉ E-KRILI
            </div>
          </div>
        </div>

        {/* RIGHT form */}
        <div style={{ flex: 1, padding: '56px 70px', background: L.bg2, borderLeft: `1px solid ${L.border}`, overflowY: 'auto' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 36, fontWeight: 300, color: L.text }}>
            Créer un compte
          </div>
          <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 4, color: L.faint, marginTop: 6, marginBottom: 48 }}>
            VOTRE ESPACE PERSONNEL
          </div>

          <form onSubmit={handleSubmit} style={{ maxWidth: 620 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 48px' }}>
              <div>
                <label style={labelStyle}>NOM</label>
                <input type="text" required placeholder="Votre nom" value={form.nom} onChange={update('nom')} className="signup-input" />
              </div>
              <div>
                <label style={labelStyle}>PRÉNOM</label>
                <input type="text" required placeholder="Votre prénom" value={form.prenom} onChange={update('prenom')} className="signup-input" />
              </div>
              <div>
                <label style={labelStyle}>EMAIL</label>
                <input type="email" required placeholder="exemple@email.com" value={form.email} onChange={update('email')} className="signup-input" />
              </div>
              <div>
                <label style={labelStyle}>TÉLÉPHONE</label>
                <input type="tel" required placeholder="+213 ..." value={form.telephone} onChange={update('telephone')} className="signup-input" />
              </div>
              <div>
                <label style={labelStyle}>MOT DE PASSE</label>
                <input type="password" required placeholder="••••••••" value={form.mdps} onChange={update('mdps')} className="signup-input" />
              </div>
              <div>
                <label style={labelStyle}>DATE DE NAISSANCE</label>
                <input type="date" required value={form.date_naissance} onChange={update('date_naissance')} className="signup-input" style={{ colorScheme: 'light' }} />
              </div>
              <div>
                <label style={labelStyle}>SEXE</label>
                <select required value={form.sex} onChange={update('sex')} className="signup-input">
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
              </div>
            </div>

            <div style={{ height: 1, marginBottom: 36, background: `linear-gradient(to right, rgba(184,137,42,0.3), transparent)` }} />

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? 'CRÉATION...' : 'CRÉER MON COMPTE'}
            </button>

            <div style={{ marginTop: 24, fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 1, color: L.faint }}>
              Déjà membre ?{' '}
              <span onClick={() => router.push('/login_client')} style={{ color: L.gold, cursor: 'pointer' }}>
                Se connecter
              </span>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer toastStyle={{ background: L.bg2, color: L.text, border: `1px solid ${L.border}` }} />
    </div>
  )
}