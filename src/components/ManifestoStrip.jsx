import { useEffect, useRef } from 'react'

export default function ManifestoStrip() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity = 0
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      el.style.transition = 'opacity 1.2s ease'
      el.style.opacity = 1
      obs.disconnect()
    }, { threshold: 0.2 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  const words = [
    { text: 'Not', style: 'normal' },
    { text: 'therapy.', style: 'italic-primary' },
    { text: 'Not', style: 'normal' },
    { text: 'a', style: 'normal' },
    { text: 'diary.', style: 'italic-primary' },
    { text: 'A', style: 'normal' },
    { text: 'companion', style: 'italic-bold' },
    { text: 'that', style: 'normal' },
    { text: 'actually', style: 'normal' },
    { text: 'understands', style: 'italic-bold' },
    { text: 'you.', style: 'italic-primary' },
  ]

  return (
    <div ref={ref} style={{
      background: 'var(--on-surface)',
      padding: '6rem 2rem',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Decorative dots grid */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,4.5vw,4rem)', lineHeight: 1.3, letterSpacing: '-0.02em', color: 'white', textAlign: 'center' }}>
          {words.map((w, i) => {
            let style = { fontStyle: 'normal', color: 'white', fontWeight: 400 }
            if (w.style === 'italic-primary') { style = { fontStyle: 'italic', color: 'var(--primary-container)', fontWeight: 400 } }
            if (w.style === 'italic-bold') { style = { fontStyle: 'italic', color: 'var(--tertiary-container)', fontWeight: 400 } }
            return <span key={i} style={{ ...style, marginRight: '0.3em', display: 'inline' }}>{w.text}</span>
          })}
        </p>

        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,0.45)', textAlign: 'center', maxWidth: 580, margin: '2rem auto 0', fontWeight: 400 }}>
          Most mental health apps feel foreign — built for someone else, somewhere else. Eunoia is built for your reality. For the pressure of Nigerian life, for the moments nobody sees, for the mind that never stops.
        </p>
      </div>
    </div>
  )
}
