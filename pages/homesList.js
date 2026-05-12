import React, { useState, useEffect } from 'react'
import CardHouse from '../components/CardHouse'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import jwt from 'jsonwebtoken'

const GOLD   = '#B8892A'
const TEXT   = '#1A1713'
const MUTED  = '#5A5248'
const FAINT  = '#8A8278'
const BG     = '#EDE9E1'
const BG2    = '#E4DFD5'
const BORDER = 'rgba(184,137,42,0.22)'

const TYPES   = ['Tous', 'Villa', 'Appartement', 'Terrain', 'Local']
const SORTS   = ['Plus récents', 'Prix croissant', 'Prix décroissant']

export default function HomesList() {
  const [searchResults, setSearchResults] = useState([])
  const [activeType, setActiveType]       = useState('Tous')
  const [activeSort, setActiveSort]       = useState('Plus récents')
  const [sortOpen, setSortOpen]           = useState(false)
  const [loading, setLoading]             = useState(true)

  const token  = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('/api/api_fetch_all_biens')
        const data     = await response.json()
        setSearchResults(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleInterestedClick = async (bienId, proprietaireId) => {
    try {
      const res = await fetch('/api/api_create_like', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decodedToken: token, bien_id: bienId, proprietaire_id: proprietaireId }),
      })
      if (res.ok) {
        const like = await res.json()
        router.push(`/negotiation?id_likes=${like.id_likes}&bien_id=${bienId}&proprietaire_id=${proprietaireId}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /* filter + sort */
  const filtered = searchResults
    .filter(r => !r.biens_vip)
    .filter(r => activeType === 'Tous' || r.type_bien?.toLowerCase() === activeType.toLowerCase())
    .sort((a, b) => {
      if (activeSort === 'Prix croissant')   return (a.prix_estime || 0) - (b.prix_estime || 0)
      if (activeSort === 'Prix décroissant') return (b.prix_estime || 0) - (a.prix_estime || 0)
      return 0
    })

  return (
    <div style={{ background: BG, minHeight: '100vh' }}>
      <Header />

      {/* ── Page header ── */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: BG }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 0' }}>

          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <button
              onClick={() => router.back()}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: "'Raleway', sans-serif", fontSize: 10,
                letterSpacing: 3, color: MUTED, display: 'flex', alignItems: 'center', gap: 6,
                padding: 0, transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = MUTED}
            >
              ← RETOUR
            </button>
            <span style={{ color: BORDER, fontSize: 12 }}>|</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3, color: FAINT }}>
              ANNONCES
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 5, color: GOLD, marginBottom: 8 }}>
                CATALOGUE COMPLET
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 300, color: TEXT, margin: 0, lineHeight: 1.1 }}>
                Tous les biens disponibles
              </h1>
              <div style={{ width: 40, height: 1, background: GOLD, marginTop: 14 }} />
            </div>

            {/* Sort dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setSortOpen(o => !o)}
                style={{
                  background: 'transparent', border: `1px solid ${BORDER}`,
                  fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 2,
                  color: MUTED, padding: '10px 20px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10, transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
                onMouseLeave={e => { if (!sortOpen) e.currentTarget.style.borderColor = BORDER }}
              >
                {activeSort.toUpperCase()}
                <span style={{ fontSize: 8, color: GOLD }}>▼</span>
              </button>
              {sortOpen && (
                <div className="lux-menu-items" style={{ position: 'absolute', right: 0, top: 'calc(100% + 4px)', minWidth: 200, zIndex: 20, padding: '6px 0' }}>
                  {SORTS.map(s => (
                    <button
                      key={s}
                      className="lux-menu-item"
                      onClick={() => { setActiveSort(s); setSortOpen(false) }}
                      style={{
                        display: 'block', width: '100%', background: 'none', border: 'none',
                        textAlign: 'left', fontFamily: "'Raleway', sans-serif", fontSize: 10,
                        letterSpacing: 2, color: s === activeSort ? GOLD : MUTED,
                        padding: '10px 20px', cursor: 'pointer',
                      }}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Type filter tabs */}
          <div style={{ display: 'flex', gap: 0 }}>
            {TYPES.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                style={{
                  background: 'none', border: 'none', borderBottom: `2px solid ${activeType === t ? GOLD : 'transparent'}`,
                  fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3,
                  color: activeType === t ? GOLD : MUTED, padding: '12px 20px',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 40px 80px' }}>

        {/* count */}
        <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, color: FAINT, marginBottom: 32 }}>
          {loading ? 'CHARGEMENT…' : `${filtered.length} BIEN${filtered.length !== 1 ? 'S' : ''} TROUVÉ${filtered.length !== 1 ? 'S' : ''}`}
        </div>

        {loading ? (
          /* skeleton */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 3 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ height: 340, background: BG2, animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 3 }}>
            {filtered.map(result => (
              <CardHouse
                key={result.id_biens}
                {...result}
                token={token}
                onInterestedClick={handleInterestedClick}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: TEXT, marginBottom: 12 }}>
              Aucun bien trouvé
            </div>
            <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: 2, color: FAINT }}>
              Essayez un autre filtre ou revenez plus tard
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
    </div>
  )
}