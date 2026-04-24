import { Heart } from 'lucide-react'

export default function Footer() {
  const cols = {
    Product: [['Features', '#features'], ['How it works', '#how'], ['Join waitlist', '#waitlist']],
    Company: [['About', '#'], ['Blog', '#'], ['Contact', '#']],
    Legal: [['Privacy Policy', '#'], ['Terms of Service', '#']],
  }
  return (
    <footer style={{ background: 'var(--on-surface)', padding: '4.5rem 1.5rem 2.5rem' }}>
      <div className="footer-grid" style={{ maxWidth: 1280, margin: '0 auto', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1.45rem', color: 'white', letterSpacing: '-0.03em', lineHeight: 1 }}>Eunoia</div>
          <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.56rem', fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '1.25rem', marginTop: '0.2rem' }}>Beautiful Thinking</div>
          <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.875rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', maxWidth: 280 }}>Your daily emotional companion. Building healthier, clearer minds — one breath at a time.</p>
          <div style={{ display: 'flex', gap: '0.65rem', marginTop: '1.75rem' }}>
            {['X', 'IG', 'LI'].map(s => (
              <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.62rem', fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>{s}</a>
            ))}
          </div>
        </div>
        {Object.entries(cols).map(([section, links]) => (
          <div key={section}>
            <div style={{ fontSize: '0.66rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', marginBottom: '1.25rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{section}</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map(([l, h]) => (
                <li key={l}><a href={h} style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <span style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>© {new Date().getFullYear()} Eunoia. Made with intention.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: "'Manrope',sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.28)' }}>
          Built by{' '}
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em' }}>Danbury</span>
        </span>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3.5rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
          .footer-grid > div:first-child {
            grid-column: span 2;
          }
        }
        @media (max-width: 420px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-grid > div:first-child {
            grid-column: span 1;
          }
        }
      `}</style>
    </footer>
  )
}
