import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import jwt from 'jsonwebtoken'

const GOLD   = '#B8892A'
const TEXT   = '#1A1713'
const MUTED  = '#5A5248'
const FAINT  = '#8A8278'
const BG     = '#EDE9E1'
const BORDER = 'rgba(184,137,42,0.22)'

const TYPE_IMAGES = {
  villa:        'https://www.livehome3d.com/assets/img/articles/design-house/how-to-design-a-house@2x.jpg',
  appartement:  'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/petit-appartement-amenage.jpg?itok=GapSYMo3',
  default:      'https://www.designferia.com/sites/default/files/styles/article_images__s640_/public/field/image/petit-appartement-amenage.jpg?itok=GapSYMo3',
}

function CardHouse({
  id_biens, description, type_bien, adresse, ville,
  code_postal, prix_estime, etat, nbrChambre,
  Proprietaire, token, onInterestedClick,
}) {
  const [decodedToken, setDecodedToken] = useState(null)
  const [saved, setSaved]               = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (token) setDecodedToken(jwt.decode(token))
  }, [token])

  const getStoredImage = () => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(`image_${id_biens}`)
    return stored ? JSON.parse(stored).data : null
  }

  const getImageSrc = () => {
    const key = type_bien?.toLowerCase()
    return getStoredImage() || TYPE_IMAGES[key] || TYPE_IMAGES.default
  }

  const isOwner = decodedToken && decodedToken.id === Proprietaire?.id_proprietaire

  return (
    <article
      style={{
        background: '#F5F1EA',
        border: `1px solid ${BORDER}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'box-shadow 0.3s, transform 0.3s',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
        <Image
          src={getImageSrc()}
          alt={description || 'Bien immobilier'}
          fill
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* overlay gradient */}
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(20,15,10,0.5) 0%, transparent 50%)',
            pointerEvents: 'none',
          }}
        />

        {/* type badge */}
        {type_bien && (
          <div
            style={{
              position: 'absolute', top: 12, left: 12,
              fontFamily: "'Raleway', sans-serif", fontSize: 8,
              letterSpacing: 3, color: '#F5F0E8',
              background: 'rgba(20,15,10,0.6)',
              padding: '4px 10px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {type_bien.toUpperCase()}
          </div>
        )}

        {/* save button */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(s => !s) }}
          style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(237,233,225,0.9)',
            border: 'none', width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'background 0.2s',
          }}
          aria-label="Sauvegarder"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? GOLD : 'none'} stroke={GOLD} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* price on image bottom */}
        <div
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '10px 14px',
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 400, color: '#F5F0E8', lineHeight: 1,
            }}
          >
            {prix_estime
              ? `${Number(prix_estime).toLocaleString('fr-DZ')} DZD`
              : 'Prix sur demande'}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '18px 18px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* title */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17, fontWeight: 400, color: TEXT,
            marginBottom: 6, lineHeight: 1.3,
          }}
        >
          {description || '—'}
        </div>

        {/* location */}
        <div
          style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: 10, letterSpacing: 1,
            color: FAINT, display: 'flex', alignItems: 'center', gap: 4,
            marginBottom: 16,
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {[adresse, ville, code_postal].filter(Boolean).join(', ')}
        </div>

        {/* meta chips */}
        <div
          style={{
            display: 'flex', gap: 8, flexWrap: 'wrap',
            paddingTop: 14, borderTop: `1px solid ${BORDER}`,
            marginTop: 'auto',
          }}
        >
          {nbrChambre && (
            <Chip icon="🛏" label={`${nbrChambre} ch.`} />
          )}
          {etat && (
            <Chip icon="✦" label={etat} />
          )}
          {Proprietaire?.nom && (
            <Chip icon="👤" label={Proprietaire.nom} />
          )}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 14 }}>
          {isOwner ? (
            <div
              style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 9,
                letterSpacing: 3, color: GOLD,
                border: `1px solid ${BORDER}`, padding: '8px 0',
                textAlign: 'center',
              }}
            >
              VOTRE BIEN
            </div>
          ) : token ? (
            <button
              onClick={() => onInterestedClick(id_biens, Proprietaire?.id_proprietaire)}
              className="lux-search-btn"
              style={{
                width: '100%',
                background: 'transparent',
                border: `1px solid ${GOLD}`,
                color: GOLD,
                fontFamily: "'Raleway', sans-serif",
                fontSize: 9, letterSpacing: 3,
                padding: '10px 0', cursor: 'pointer',
                transition: 'background 0.25s, color 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = GOLD
                e.currentTarget.style.color = BG
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = GOLD
              }}
            >
              JE SUIS INTÉRESSÉ
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              style={{
                width: '100%',
                background: 'transparent',
                border: `1px solid ${BORDER}`,
                color: MUTED,
                fontFamily: "'Raleway', sans-serif",
                fontSize: 9, letterSpacing: 3,
                padding: '10px 0', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = GOLD}
              onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
            >
              CONNEXION REQUISE
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

function Chip({ icon, label }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 4,
        fontFamily: "'Raleway', sans-serif", fontSize: 9,
        letterSpacing: 1, color: MUTED,
        border: `1px solid ${BORDER}`,
        padding: '3px 8px',
      }}
    >
      <span style={{ fontSize: 10 }}>{icon}</span>
      {label}
    </div>
  )
}

export default CardHouse