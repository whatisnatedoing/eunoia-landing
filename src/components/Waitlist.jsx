import { useState, useRef } from 'react'
import { ArrowRight, Check, Gift, Shield, Users, Zap } from 'lucide-react'

const PERKS = [
  { Icon: Gift, text: '3-month free Premium trial' },
  { Icon: Users, text: 'Shape the product' },
  { Icon: Zap, text: 'Early access pricing' },
  { Icon: Shield, text: 'No spam, ever' },
]

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(formRef.current)).toString(),
      })
    } catch (_) {}
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" style={{ background: 'var(--surface-lowest)', padding: '9rem 2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 500, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(103,80,165,0.06) 0%, transparent 68%)', pointerEvents: 'none' }} />

      {/* Decorative lines */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 1, height: '100%', background: 'linear-gradient(180deg, transparent, rgba(103,80,165,0.1), transparent)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(103,80,165,0.07)', border: '1px solid rgba(103,80,165,0.16)', color: 'var(--primary)', padding: '0.38rem 1rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: '2rem' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tertiary)', boxShadow: '0 0 0 3px rgba(0,104,128,0.2)', animation: 'pulseDot 2s ease-in-out infinite' }} />
          Limited early access spots
        </div>

        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2.4rem,5vw,3.8rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: 'var(--on-surface)', marginBottom: '1.2rem' }}>
          Be first to experience<br /><em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>beautiful thinking.</em>
        </h2>

        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--on-surface-variant)', marginBottom: '3rem' }}>
          Join the waitlist for early access, a 3-month free Premium trial, and a chance to shape what Eunoia becomes. We're building this with our community.
        </p>

        {!submitted ? (
          <>
            {/* Hidden Netlify form for detection */}
            <form name="waitlist" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
              <input type="email" name="email" />
            </form>

            <form ref={formRef} name="waitlist" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', background: 'var(--surface-low)', borderRadius: 9999, padding: '6px 6px 6px 1.5rem', maxWidth: 480, margin: '0 auto 1.5rem', boxShadow: '0 0 0 1.5px rgba(103,80,165,0.14), 0 8px 32px rgba(0,0,0,0.05)', transition: 'box-shadow 0.2s' }}
              onFocus={e => e.currentTarget.style.boxShadow = '0 0 0 2px var(--primary), 0 8px 32px rgba(103,80,165,0.14)'}
              onBlur={e => e.currentTarget.style.boxShadow = '0 0 0 1.5px rgba(103,80,165,0.14), 0 8px 32px rgba(0,0,0,0.05)'}>
              <input type="hidden" name="form-name" value="waitlist" />
              <input type="hidden" name="bot-field" />
              <input type="email" name="email" placeholder="your@email.com" required value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: "'Manrope',sans-serif", fontSize: '0.93rem', color: 'var(--on-surface)', minWidth: 0 }} />
              <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', color: 'var(--on-primary)', border: 'none', cursor: loading ? 'wait' : 'pointer', padding: '0.75rem 1.35rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.84rem', fontWeight: 700, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: loading ? 0.7 : 1, transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(103,80,165,0.3)' }}}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
                {loading ? 'Securing...' : <><span>Secure my spot</span><ArrowRight size={14} /></>}
              </button>
            </form>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', animation: 'fadeUp 0.5s ease' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(0,104,128,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={26} color="var(--tertiary)" />
            </div>
            <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1rem', fontWeight: 700, color: 'var(--tertiary)' }}>You're on the list! We'll be in touch very soon.</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>Check your inbox for a confirmation email.</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          {PERKS.map(({ Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
              <Icon size={14} color="var(--tertiary)" />
              {text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </section>
  )
}
