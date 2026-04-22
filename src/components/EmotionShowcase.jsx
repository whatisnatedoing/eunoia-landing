import { useState, useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'

const STATES = [
  {
    mood: 'Overwhelmed',
    color: '#ac3149',
    bg: 'rgba(172,49,73,0.07)',
    insight: '"It sounds like you\'re carrying a lot right now. Multiple pressures seem to be colliding at once."',
    action: 'Try a 4-7-8 breathing cycle',
    actionColor: '#ac3149',
    dot: '#f76a80',
  },
  {
    mood: 'Anxious',
    color: '#914d00',
    bg: 'rgba(145,77,0,0.07)',
    insight: '"Your thoughts are moving fast. Let\'s slow down and ground you in what\'s real right now."',
    action: 'Start the 5-4-3-2-1 exercise',
    actionColor: '#914d00',
    dot: '#ffcaa1',
  },
  {
    mood: 'Calm',
    color: '#006880',
    bg: 'rgba(0,104,128,0.07)',
    insight: '"You\'re in a good space. This is a great time to journal and lock in this clarity."',
    action: 'Open voice journal',
    actionColor: '#006880',
    dot: '#63d7fe',
  },
  {
    mood: 'Hopeful',
    color: '#6750a5',
    bg: 'rgba(103,80,165,0.07)',
    insight: '"Something has shifted for you. Your emotional tone is lighter and more open today."',
    action: 'Log this moment',
    actionColor: '#6750a5',
    dot: '#cab6ff',
  },
  {
    mood: 'Drained',
    color: '#5c5f63',
    bg: 'rgba(92,95,99,0.07)',
    insight: '"Low energy doesn\'t mean failure. Your nervous system may just need rest and gentleness."',
    action: 'Try a micro-rest exercise',
    actionColor: '#5c5f63',
    dot: '#afb2b6',
  },
]

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = 0; el.style.transform = 'translateY(26px)'
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      el.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)'
      el.style.opacity = 1; el.style.transform = 'translateY(0)'
      obs.disconnect()
    }, { threshold: 0.1 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

export default function EmotionShowcase() {
  const [active, setActive] = useState(2)
  const ref = useReveal()
  const state = STATES[active]

  return (
    <section style={{ padding: '8rem 2rem', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient tinted bg that changes */}
      <div style={{ position: 'absolute', inset: 0, background: state.bg, transition: 'background 0.6s ease', pointerEvents: 'none' }} />

      <div ref={ref} style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: state.color, marginBottom: '1.25rem', fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'color 0.4s' }}>
          <div style={{ width: 24, height: 1.5, background: state.color, transition: 'background 0.4s' }} />
          Eunoia meets you here
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Left — mood selector */}
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--on-surface)', marginBottom: '0.75rem' }}>
              Whatever you're feeling,<br /><em style={{ color: state.color, fontStyle: 'italic', transition: 'color 0.4s' }}>we're here.</em>
            </h2>
            <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--on-surface-variant)', marginBottom: '2.5rem', maxWidth: 420 }}>
              Eunoia doesn't force positivity. It meets you exactly where you are — and gently helps you understand why.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {STATES.map((s, i) => (
                <button key={s.mood} onClick={() => setActive(i)} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem 1.1rem', borderRadius: 14, border: 'none', background: active === i ? `${s.bg}` : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s, transform 0.2s', transform: active === i ? 'translateX(8px)' : 'translateX(0)', borderLeft: active === i ? `3px solid ${s.color}` : '3px solid transparent' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: s.dot, flexShrink: 0, transition: 'transform 0.2s', transform: active === i ? 'scale(1.3)' : 'scale(1)' }} />
                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.92rem', fontWeight: active === i ? 700 : 500, color: active === i ? s.color : 'var(--on-surface-variant)', transition: 'color 0.2s, font-weight 0.2s' }}>{s.mood}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right — AI response card */}
          <div style={{ position: 'relative' }}>
            {/* Glow behind card */}
            <div style={{ position: 'absolute', inset: -30, borderRadius: '50%', background: `radial-gradient(circle, ${state.dot}44 0%, transparent 70%)`, filter: 'blur(30px)', transition: 'background 0.6s', pointerEvents: 'none' }} />

            <div style={{ background: 'white', borderRadius: 28, padding: '2.25rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)', position: 'relative', transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: state.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.4s' }}>
                  <Sparkles size={18} color={state.color} />
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: '0.85rem', color: 'var(--on-surface)' }}>Eunoia AI</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)' }}>Responding to: <span style={{ color: state.color, fontWeight: 600, transition: 'color 0.4s' }}>{state.mood}</span></div>
                </div>
              </div>

              <p style={{ fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: '1.08rem', lineHeight: 1.65, color: 'var(--on-surface)', marginBottom: '1.5rem', borderLeft: `3px solid ${state.dot}`, paddingLeft: '1rem', transition: 'border-color 0.4s' }}>
                {state.insight}
              </p>

              {/* Suggested action */}
              <div style={{ background: state.bg, borderRadius: 14, padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.4s' }}>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: state.color, marginBottom: 3, fontFamily: "'Plus Jakarta Sans',sans-serif", transition: 'color 0.4s' }}>Suggested for you</div>
                  <div style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.85rem', fontWeight: 600, color: 'var(--on-surface)' }}>{state.action}</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: state.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.4s' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Typing indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '1rem', opacity: 0.5 }}>
                {[0, 0.2, 0.4].map((d, i) => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: state.color, animation: `typingBounce 1.2s ${d}s ease-in-out infinite`, transition: 'background 0.4s' }} />
                ))}
                <span style={{ fontSize: '0.7rem', color: 'var(--on-surface-variant)', marginLeft: 4 }}>Eunoia is listening...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typingBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}
      `}</style>
    </section>
  )
}
