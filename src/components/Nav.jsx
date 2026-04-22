import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem', background: scrolled ? 'rgba(249,249,251,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(175,178,182,0.16)' : '1px solid transparent', transition: 'all 0.35s ease' }}>
      <a href="#" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.45rem', color: 'var(--primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>Eunoia</div>
        <div style={{ fontFamily: "'Manrope',sans-serif", fontWeight: 500, fontSize: '0.58rem', color: 'var(--on-surface-variant)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Beautiful Thinking</div>
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {[['Features','#features'],['How it works','#how']].map(([l,h]) => (
          <a key={h} href={h} style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color='var(--primary)'}
            onMouseLeave={e => e.target.style.color='var(--on-surface-variant)'}>{l}</a>
        ))}
        <a href="#waitlist" style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', color: 'var(--on-primary)', padding: '0.55rem 1.35rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(103,80,165,0.25)', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(103,80,165,0.38)' }}
          onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(103,80,165,0.25)' }}>
          Join waitlist
        </a>
      </nav>
    </header>
  )
}
