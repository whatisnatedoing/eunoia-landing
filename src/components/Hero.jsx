import { useEffect, useRef, useState } from 'react'
import { Mic, PenLine, ArrowRight, Sparkles } from 'lucide-react'

const MOODS = [
  { emoji: '😔', label: 'Quiet' },
  { emoji: '😌', label: 'Peace' },
  { emoji: '✨', label: 'Glow', active: true },
  { emoji: '🌿', label: 'Steady' },
  { emoji: '🔥', label: 'Active' },
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      let start = 0
      const step = target / 60
      const timer = setInterval(() => {
        start += step
        if (start >= target) { setCount(target); clearInterval(timer) }
        else setCount(Math.floor(start))
      }, 16)
      obs.disconnect()
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

function PhoneMockup() {
  return (
    <div style={{
      width: 232, background: '#fff', borderRadius: 40, padding: 9,
      boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 60px 100px rgba(103,80,165,0.18), 0 20px 40px rgba(0,0,0,0.1)',
      animation: 'phoneFloat 7s ease-in-out infinite', position: 'relative', zIndex: 2,
      flexShrink: 0,
    }}>
      <div style={{ width: 80, height: 22, background: '#0c0e10', borderRadius: '0 0 14px 14px', margin: '0 auto 6px' }} />
      <div style={{ background: 'var(--surface)', borderRadius: 32, overflow: 'hidden', padding: '12px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '0.88rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>Eunoia</span>
          <span style={{ background: 'var(--error)', color: 'white', fontSize: '0.42rem', fontWeight: 800, padding: '2px 6px', borderRadius: 9999 }}>SOS</span>
        </div>
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.76rem', fontWeight: 700, color: 'var(--on-surface)', lineHeight: 1.3, marginBottom: 9 }}>How are you feeling right now?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          {MOODS.map(m => (
            <div key={m.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: m.active ? 'var(--primary-container)' : 'var(--surface-low)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', transform: m.active ? 'scale(1.18)' : 'scale(1)' }}>{m.emoji}</div>
              <span style={{ fontSize: '0.34rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: m.active ? 'var(--primary)' : 'var(--on-surface-variant)' }}>{m.label}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,var(--primary),var(--primary-dim))', borderRadius: 14, padding: '10px 10px', marginBottom: 8, position: 'relative', overflow: 'hidden' }}>
          <div style={{ fontSize: '0.4rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 3 }}>✦ Daily Sanctuary</div>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.6rem', fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 6 }}>You've taken 3 deep breaths today.</p>
          <div style={{ display: 'inline-block', background: 'white', color: 'var(--primary)', fontSize: '0.46rem', fontWeight: 700, padding: '2px 8px', borderRadius: 9999 }}>Start Exercise</div>
          <div style={{ position: 'absolute', right: -10, bottom: -10, width: 50, height: 50, borderRadius: '50%', background: 'rgba(99,215,254,0.22)', filter: 'blur(10px)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 8 }}>
          {[
            { Icon: Mic, bg: 'var(--surface-low)', iconBg: 'var(--primary-container)', iconColor: 'var(--primary)', title: 'Talk it Out', sub: 'Voice journaling' },
            { Icon: PenLine, bg: 'var(--tertiary-container)', iconBg: 'rgba(255,255,255,0.4)', iconColor: 'var(--on-tertiary-container)', title: 'Reflect', sub: 'Written space', tc: 'var(--on-tertiary-container)', sc: 'rgba(0,72,90,0.65)' },
          ].map(c => (
            <div key={c.title} style={{ background: c.bg, borderRadius: 10, padding: '7px 7px' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 4, color: c.iconColor }}><c.Icon size={10} /></div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.52rem', fontWeight: 700, color: c.tc || 'var(--on-surface)' }}>{c.title}</div>
              <div style={{ fontSize: '0.44rem', color: c.sc || 'var(--on-surface-variant)', marginTop: 1 }}>{c.sub}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: 7, borderTop: '1px solid rgba(175,178,182,0.15)' }}>
          {['Home', 'Talk', 'Insights', 'Grow'].map((item, i) => (
            <div key={item} style={{ background: i === 0 ? 'linear-gradient(135deg,var(--primary),var(--secondary))' : 'transparent', padding: i === 0 ? '3px 6px' : '2px 3px', borderRadius: 9999, marginTop: i === 0 ? -3 : 0 }}>
              <span style={{ fontSize: '0.34rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: i === 0 ? 'white' : 'var(--on-surface-variant)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const items = ref.current?.querySelectorAll('[data-reveal]') || []
    items.forEach((el, i) => {
      el.style.opacity = 0
      el.style.transform = 'translateY(22px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      }, 100 + i * 110)
    })
  }, [])

  return (
    <section ref={ref} style={{ minHeight: '100vh', background: 'var(--surface)', paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
      {/* Ghost watermark */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-54%)', fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(80px,14vw,200px)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(103,80,165,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: '-0.03em', lineHeight: 1, userSelect: 'none' }}>Eunoia</div>

      {/* Ambient blobs */}
      <div style={{ position: 'absolute', top: -120, right: -180, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(103,80,165,0.08) 0%, transparent 68%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -100, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,215,254,0.1) 0%, transparent 68%)', pointerEvents: 'none' }} />

      <div className="hero-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '4rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}>
        {/* LEFT */}
        <div className="hero-left">
          <div data-reveal style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(103,80,165,0.07)', border: '1px solid rgba(103,80,165,0.16)', color: 'var(--primary)', padding: '0.38rem 1rem', borderRadius: 9999, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--tertiary)', boxShadow: '0 0 0 3px rgba(0,104,128,0.2)', animation: 'pulseDot 2s ease-in-out infinite' }} />
              Now accepting early access
            </div>
          </div>

          <div data-reveal>
            <h1 style={{ marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontFamily: "'Manrope',sans-serif", fontWeight: 300, fontSize: 'clamp(1.2rem,2.4vw,2.2rem)', color: 'var(--on-surface-variant)', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Your mind deserves a</span>
              <span style={{ display: 'block', fontFamily: "'DM Serif Display',serif", fontStyle: 'italic', fontSize: 'clamp(3rem,5.8vw,5.5rem)', color: 'var(--primary)', lineHeight: 1, letterSpacing: '-0.025em' }}>sanctuary.</span>
            </h1>
          </div>

          <p data-reveal style={{ fontFamily: "'Manrope',sans-serif", fontSize: 'clamp(0.9rem,1.8vw,1.06rem)', lineHeight: 1.8, color: 'var(--on-surface-variant)', maxWidth: 460, marginBottom: '2.5rem', fontWeight: 400 }}>
            An AI-powered space to understand how you feel, process your thoughts, and find calm in real time.
          </p>

          <div data-reveal style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a href="#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, var(--primary), var(--primary-dim))', color: 'var(--on-primary)', padding: '0.9rem 1.75rem', borderRadius: 9999, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.92rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 30px rgba(103,80,165,0.3)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(103,80,165,0.42)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 30px rgba(103,80,165,0.3)' }}>
              Join the waitlist <ArrowRight size={16} />
            </a>
            <a href="#features" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--on-surface-variant)', fontFamily: "'Manrope',sans-serif", fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)' }}>
              See how it works <ArrowRight size={15} />
            </a>
          </div>

          {/* Stats */}
          <div data-reveal className="hero-stats" style={{ display: 'flex', gap: '2rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(175,178,182,0.22)', flexWrap: 'wrap' }}>
            {[
              { target: 400, suffix: '+', label: 'on the waitlist' },
              { target: 60, suffix: 's', label: 'avg. session time' },
              { target: 5, suffix: '', label: 'core features' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 'clamp(1.3rem,2.5vw,1.7rem)', color: 'var(--primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  <AnimatedCounter target={s.target} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '0.73rem', color: 'var(--on-surface-variant)', marginTop: '0.2rem', fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — phone mockup */}
        <div className="hero-right" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(202,182,255,0.18), rgba(99,215,254,0.1))', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
          <div style={{ position: 'absolute', width: 280, height: 280, borderRadius: '50%', border: '1px dashed rgba(103,80,165,0.14)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', animation: 'rotateSlow 30s linear infinite' }} />

          {/* Floating cards — hidden on small screens via class */}
          <div className="float-card float-card-tr" style={{ position: 'absolute', right: -20, top: 40, background: 'white', borderRadius: 18, padding: '12px 16px', boxShadow: '0 12px 40px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)', animation: 'floatCard1 5s ease-in-out infinite', minWidth: 140 }}>
            <div style={{ fontSize: '0.52rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--on-surface-variant)', marginBottom: 3 }}>This week</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '0.95rem', color: 'var(--tertiary)', marginBottom: 6 }}>↑ 23% calmer</div>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1, 1, 1, 0, 0].map((f, i) => <div key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: f ? (i === 2 ? 'var(--tertiary)' : 'var(--primary)') : 'var(--surface-high)' }} />)}
            </div>
          </div>

          <PhoneMockup />

          <div className="float-card float-card-bl" style={{ position: 'absolute', left: -15, bottom: 90, background: 'white', borderRadius: 18, padding: '12px 14px', boxShadow: '0 12px 40px rgba(0,0,0,0.09), 0 0 0 1px rgba(0,0,0,0.05)', animation: 'floatCard2 6s ease-in-out infinite', maxWidth: 180 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 7 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary-container)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Sparkles size={11} color="var(--primary)" /></div>
              <span style={{ fontSize: '0.54rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>AI Insight</span>
            </div>
            <p style={{ fontSize: '0.67rem', lineHeight: 1.55, color: 'var(--on-surface)', fontFamily: "'DM Serif Display',serif", fontStyle: 'italic' }}>"You sound overwhelmed — pressure is building from multiple directions."</p>
          </div>

          <div className="float-card float-card-tl" style={{ position: 'absolute', left: -10, top: 70, background: 'linear-gradient(135deg,var(--secondary-container),#fff0e5)', borderRadius: 16, padding: '10px 14px', boxShadow: '0 6px 24px rgba(145,77,0,0.12), 0 0 0 1px rgba(145,77,0,0.07)', animation: 'floatCard3 7s ease-in-out infinite' }}>
            <div style={{ fontSize: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: 2 }}>Streak</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: '1rem', color: 'var(--secondary)' }}>7 days 🔥</div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .hero-right {
          min-height: 560px;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .hero-left {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-stats {
            justify-content: center;
          }
          .hero-right {
            min-height: 420px;
          }
          .float-card-tr { right: -5px !important; top: 20px !important; }
          .float-card-bl { left: -5px !important; bottom: 60px !important; }
          .float-card-tl { left: -5px !important; top: 50px !important; }
        }
        @media (max-width: 480px) {
          .float-card { display: none !important; }
          .hero-right { min-height: 340px; }
        }
        @keyframes phoneFloat{0%,100%{transform:translateY(0) rotate(-1deg)}50%{transform:translateY(-18px) rotate(0.5deg)}}
        @keyframes floatCard1{0%,100%{transform:translateY(0) rotate(2deg)}50%{transform:translateY(-10px) rotate(1deg)}}
        @keyframes floatCard2{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(-1deg)}}
        @keyframes floatCard3{0%,100%{transform:translateY(0) rotate(1.5deg)}50%{transform:translateY(-12px) rotate(0.5deg)}}
        @keyframes pulseDot{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:0.6}}
        @keyframes rotateSlow{from{transform:translate(-50%,-50%) rotate(0deg)}to{transform:translate(-50%,-50%) rotate(360deg)}}
      `}</style>
    </section>
  )
}
