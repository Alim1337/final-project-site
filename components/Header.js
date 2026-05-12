import React, { useState, useEffect } from 'react';
import { GlobeAltIcon, Bars3Icon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FaCrown } from 'react-icons/fa';
import { HiOutlineHome } from 'react-icons/hi';

const L = {
  gold:   '#B8892A',
  bg:     '#EDE9E1',
  text:   '#1A1713',
  muted:  '#5A5248',
  faint:  '#8A8278',
  border: 'rgba(184,137,42,0.22)',
};

function Header() {
  const [proprietaireName, setProprietaireName] = useState('');
  const [showDisconnectButton, setShowDisconnectButton] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchadresse, setSearchAdresse] = useState('');
  const [searchPropertyType, setSearchPropertyType] = useState('');
  const [searchNumBedrooms, setSearchNumBedrooms] = useState('');
  const [statusVIP, setStatusVIP] = useState(false);

  const locationOptions = ['Toutes les willaya', 'Alger'];
  const adresseOptions = [
    'Toutes les villes', 'Aïn Benian', 'Aïn Taya', 'Alger-Centre', 'Baba Hassen',
    'Bab El Oued', 'Bab Ezzouar', 'Bachdjerrah', 'Baraki', 'Belouizdad',
    'Ben Aknoun', 'Beni Messous', 'Birkhadem', 'Bir Mourad Raïs', 'Birtouta',
    'Bologhine', 'Bordj El Bahri', 'Bordj El Kiffan', 'Bourouba', 'Bouzareah',
    'Casbah', 'Chéraga', 'Dar El Beïda', 'Dely Ibrahim', 'Djasr Kasentina',
    'Douera', 'Draria', 'El Achour', 'El Biar', 'El Hammamet', 'El Harrach',
    'El Madania', 'El Marsa', 'El Mouradia', 'El Magharia', 'Hraoua',
    'Hussein-Dey', 'Hydra', 'Khraïssia', 'Kouba', 'Les Eucalyptus', 'Mahelma',
    'Mohammadia', 'Oued Koriche', 'Oued Smar', 'Ouled Chebel', 'Ouled Fayet',
    'Rahmania', 'Raïs Hamidou', 'Réghaïa', 'Rouïba', 'Saoula', 'Sidi MHamed',
    'Sidi Moussa', 'Souidania', 'Staoueli', 'Tessala El Merdja', 'Zéralda',
  ];
  const propertyTypeOptions = ['Type de bien', 'Appartement', 'Villa'];
  const numBedroomsOptions = ['Taille', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded) {
        setStatusVIP(decoded.statusVIP);
        if (decoded.nom) { setProprietaireName(decoded.nom); setShowDisconnectButton(true); }
      }
    }
  }, []);

  const router = useRouter();

  const handleConnexionClick = () => router.push('/login_client');
  const handleSignupClick    = () => router.push('/signup_client');
  const handleDisconnectClick = () => {
    localStorage.removeItem('token');
    setProprietaireName(''); setShowDisconnectButton(false); router.push('/');
  };
  const handleDashboardClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt.decode(token);
      if (decoded?.userType) router.push(decoded.statusVIP ? '/Vip' : '/panel');
    }
  };
  const handleSearchClick = () => {
    const params = new URLSearchParams({
      location: searchLocation || '',
      address: searchadresse || '',
      propertyType: searchPropertyType || '',
      numBedrooms: searchNumBedrooms || '',
    });
    window.location.href = `/homesList_filtred?${params.toString()}`;
  };

  const selectStyle = {
    background: 'transparent',
    border: 'none',
    borderRight: `1px solid ${L.border}`,
    color: L.muted,
    fontFamily: "'Raleway', sans-serif",
    fontSize: '11px',
    letterSpacing: '1px',
    padding: '11px 14px',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <header
      className="lux-header"
      style={{
        position: 'sticky', top: 0, zIndex: 40,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 32px',
      }}
    >
      {/* LOGO */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
        onClick={() => router.push('/')}
      >
        <HiOutlineHome style={{ color: L.gold, fontSize: 22 }} />
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, letterSpacing: 5, color: L.gold }}>
            E-KRILI
          </div>
          <div style={{ fontSize: 8, letterSpacing: 4, color: L.faint, fontFamily: "'Raleway', sans-serif", marginTop: -2 }}>
            IMMOBILIER DE PRESTIGE
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${L.border}`, background: 'rgba(237,233,225,0.6)' }}>
        <select value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="lux-select" style={selectStyle}>
          {locationOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={searchadresse} onChange={(e) => setSearchAdresse(e.target.value)} className="lux-select" style={selectStyle}>
          {adresseOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={searchPropertyType} onChange={(e) => setSearchPropertyType(e.target.value)} className="lux-select" style={selectStyle}>
          {propertyTypeOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        <select value={searchNumBedrooms} onChange={(e) => setSearchNumBedrooms(e.target.value)} className="lux-select" style={{ ...selectStyle, borderRight: 'none' }}>
          {numBedroomsOptions.map((o) => <option key={o}>{o}</option>)}
        </select>
        <button
          onClick={handleSearchClick}
          className="lux-search-btn"
          style={{
            background: L.gold, border: 'none', color: '#EDE9E1',
            fontFamily: "'Raleway', sans-serif", fontSize: 10,
            fontWeight: 500, letterSpacing: 3, padding: '12px 22px',
            cursor: 'pointer', whiteSpace: 'nowrap',
          }}
        >
          RECHERCHE
        </button>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <GlobeAltIcon style={{ height: 18, color: L.faint }} />
        {showDisconnectButton ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${L.border}`, padding: '8px 14px' }}>
            {statusVIP && <FaCrown style={{ color: L.gold, fontSize: 12 }} />}
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: 2, color: L.text }}>
              {proprietaireName}
            </span>
            <UserCircleIcon style={{ height: 18, color: L.faint, cursor: 'pointer' }} />
            <Menu as="div" style={{ position: 'relative', display: 'inline-block' }}>
              <Menu.Button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <Bars3Icon style={{ height: 18, color: L.faint }} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="lux-menu-items" style={{ position: 'absolute', right: 0, zIndex: 10, marginTop: 8, width: 200, outline: 'none' }}>
                  {[
                    { label: 'Paramètres du compte', action: null },
                    { label: 'Tableau de bord', action: handleDashboardClick },
                    { label: 'Support', action: null },
                    { label: 'Déconnexion', action: handleDisconnectClick },
                  ].map(({ label, action }) => (
                    <Menu.Item key={label}>
                      {({ active }) => (
                        <button
                          onClick={action}
                          className="lux-menu-item"
                          style={{
                            width: '100%', textAlign: 'left',
                            background: 'transparent', border: 'none',
                            padding: '10px 16px', cursor: 'pointer',
                            fontFamily: "'Raleway', sans-serif",
                            fontSize: 11, letterSpacing: 2,
                            color: active ? L.gold : L.muted,
                          }}
                        >
                          {label.toUpperCase()}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleConnexionClick} className="lux-outline-btn"
              style={{ background: 'transparent', border: `1px solid ${L.border}`, color: L.muted, fontFamily: "'Raleway', sans-serif", fontSize: 10, letterSpacing: 3, padding: '9px 20px', cursor: 'pointer' }}>
              CONNECTER
            </button>
            <button onClick={handleSignupClick} className="lux-gold-btn"
              style={{ background: L.gold, border: `1px solid ${L.gold}`, color: '#EDE9E1', fontFamily: "'Raleway', sans-serif", fontSize: 10, fontWeight: 500, letterSpacing: 3, padding: '9px 20px', cursor: 'pointer' }}>
              CRÉER UN COMPTE
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;