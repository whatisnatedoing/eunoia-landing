import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1.25rem',
        background: scrolled || menuOpen ? 'rgba(249,249,251,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? '1px solid rgba(175,178,182,0.16)' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}>
        <a href="#" style={{ textDecoration: 'none' }} onClick={closeMenu}>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.35rem', color: 'var(--primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>Eunoia</div>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.52rem', color: 'var(--on-surface-variant)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Beautiful Thinking</div>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
          {[['Features', '#features'], ['How it works', '#how']].map(([l, h]) => (
            <a key={h} href={h} style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}>{l}</a>
          ))}
          <a href="#waitlist" style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', color: 'var(--on-primary)', padding: '0.55rem 1.35rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(103,80,165,0.25)', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(103,80,165,0.38)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(103,80,165,0.25)' }}>
            Join waitlist
          </a>
        </nav>

        {/* Hamburger button */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'none', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--on-surface)', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--on-surface)', borderRadius: 2, transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--on-surface)', borderRadius: 2, transition: 'transform 0.3s, opacity 0.3s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </header>

      {/* Mobile drawer */}
      <div className="mobile-menu" style={{
        position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
        background: 'rgba(249,249,251,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 99,
        display: 'flex', flexDirection: 'column',
        padding: '2.5rem 1.5rem',
        gap: '0.5rem',
        transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: menuOpen ? 'all' : 'none',
      }}>
        {[['Features', '#features'], ['How it works', '#how']].map(([l, h]) => (
          <a key={h} href={h} onClick={closeMenu} style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1.4rem', fontWeight: 600, color: 'var(--on-surface)', textDecoration: 'none', padding: '0.85rem 0', borderBottom: '1px solid rgba(175,178,182,0.18)' }}>{l}</a>
        ))}
        <a href="#waitlist" onClick={closeMenu} style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', color: 'var(--on-primary)', padding: '1rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 30px rgba(103,80,165,0.3)' }}>
          Join waitlist
        </a>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
