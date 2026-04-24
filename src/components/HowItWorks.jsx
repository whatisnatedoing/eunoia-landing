import { useEffect, useRef } from 'react'
import { Sunrise, Mic, Sparkles, TrendingUp, ChevronRight } from 'lucide-react'

function useReveal(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = 0; el.style.transform = 'translateY(26px)'
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setTimeout(() => {
        el.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity = 1; el.style.transform = 'translateY(0)'
      }, delay)
      obs.disconnect()
    }, { threshold: 0.08 })
    obs.observe(el); return () => obs.disconnect()
  }, [delay])
  return ref
}

const STEPS = [
  { num: '01', Icon: Sunrise, variant: 'primary', title: 'Check in with your mood', desc: 'Each morning Eunoia asks how you\'re feeling. Select your emotional state — no pressure, no wrong answers. Under 10 seconds.' },
  { num: '02', Icon: Mic, variant: 'teal', title: 'Speak or write freely', desc: 'Voice-journal your thoughts aloud or write in the Reflect space. Completely private. Eunoia never judges.' },
  { num: '03', Icon: Sparkles, variant: 'peach', title: 'Receive intelligent insight', desc: 'AI analyzes emotional context and returns a gentle summary, key concerns, and actionable perspectives tailored to you.' },
  { num: '04', Icon: TrendingUp, variant: 'purple', title: 'Grow over time', desc: 'Weekly insights reveal patterns you couldn\'t see. Watch your emotional landscape shift toward clarity and calm.' },
]
const ICON_STYLES = {
  primary: { bg: 'rgba(103,80,165,0.1)', color: 'var(--primary)' },
  teal: { bg: 'var(--tertiary-container)', color: 'var(--on-tertiary-container)' },
  peach: { bg: 'var(--secondary-container)', color: 'var(--secondary)' },
  purple: { bg: 'var(--primary-container)', color: 'var(--primary-dim)' },
}

function StepCard({ step, i, total }) {
  const ref = useReveal(i * 80)
  const is = ICON_STYLES[step.variant]
  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 1, background: 'var(--surface-low)', borderRadius: 22, padding: '1.75rem 1.5rem', transition: 'transform 0.3s', cursor: 'default' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}>
      <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: '2.5rem', color: 'rgba(103,80,165,0.12)', lineHeight: 1, marginBottom: '0.85rem', letterSpacing: '-0.04em' }}>{step.num}</div>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: is.bg, color: is.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
        <step.Icon size={21} />
      </div>
      <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.96rem', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '0.55rem', lineHeight: 1.3 }}>{step.title}</h3>
      <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.84rem', lineHeight: 1.72, color: 'var(--on-surface-variant)' }}>{step.desc}</p>
      {i < total - 1 && (
        <div className="step-chevron" style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 24, height: 24, borderRadius: '50%', background: 'var(--surface-lowest)', border: '1px solid rgba(175,178,182,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ChevronRight size={12} color="var(--outline-variant)" />
        </div>
      )}
    </div>
  )
}

export default function HowItWorks() {
  const headRef = useReveal(0)
  return (
    <section id="how" style={{ background: 'var(--surface-lowest)', padding: '6rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(10rem,20vw,28rem)', fontWeight: 400, color: 'rgba(103,80,165,0.03)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none' }}>4</div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headRef} className="how-header" style={{ marginBottom: '4rem' }}>
          <div className="how-header-left">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '1.25rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <div style={{ width: 24, height: 1.5, background: 'var(--secondary)' }} />
              Simple by design
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--on-surface)' }}>
              From <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>overwhelmed</em><br />to understood<br />in 60 seconds.
            </h2>
          </div>
          <p className="how-header-desc" style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1rem', lineHeight: 1.78, color: 'var(--on-surface-variant)', maxWidth: 420 }}>
            Every interaction is designed to take under 60 seconds. Eunoia fits into your life — not the other way around. Built for low-energy days, high-stress moments, and everything in between.
          </p>
        </div>

        {/* Steps */}
        <div className="steps-grid" style={{ position: 'relative' }}>
          <div className="steps-connector" style={{ position: 'absolute', top: 26, left: '6.25%', right: '6.25%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(175,178,182,0.35) 10%,rgba(175,178,182,0.35) 90%,transparent)', zIndex: 0 }} />
          {STEPS.map((step, i) => <StepCard key={i} step={step} i={i} total={STEPS.length} />)}
        </div>

        {/* Bottom CTA */}
        <div className="how-cta" style={{ marginTop: '3.5rem', background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', borderRadius: 24, padding: '2.5rem 2rem' }}>
          <div className="how-cta-inner">
            <div>
              <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(1.4rem,2.5vw,2rem)', color: 'white', lineHeight: 1.2, marginBottom: '0.5rem' }}>Ready to meet your <em>calmer self?</em></h3>
              <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)', maxWidth: 420 }}>Join hundreds of people who are already building healthier emotional habits — one breath at a time.</p>
            </div>
            <a href="#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--primary)', padding: '0.9rem 1.75rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 20px rgba(0,0,0,0.12)', whiteSpace: 'nowrap', flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)' }}>
              Join the waitlist <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .how-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: end;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .how-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.5rem;
        }
        @media (max-width: 900px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .steps-connector { display: none; }
          .step-chevron { display: none; }
        }
        @media (max-width: 640px) {
          .how-header {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .steps-grid {
            grid-template-columns: 1fr;
          }
          .how-cta {
            border-radius: 20px;
            padding: 2rem 1.5rem;
          }
          .how-cta-inner {
            flex-direction: column;
            align-items: flex-start;
          }
          .how-cta-inner a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
