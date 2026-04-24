import { useEffect, useRef } from 'react'
import { Mic, Brain, Wind, TrendingUp, Zap, Sprout, ArrowUpRight } from 'lucide-react'

function useReveal(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = 0
    el.style.transform = 'translateY(30px)'
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setTimeout(() => {
        el.style.transition = 'opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)'
        el.style.opacity = 1
        el.style.transform = 'translateY(0)'
      }, delay)
      obs.disconnect()
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return ref
}

function WaveformViz() {
  const heights = [14, 26, 40, 30, 44, 34, 44, 22, 36, 18, 28, 12]
  const opacities = [0.25, 0.35, 0.55, 0.75, 1, 1, 0.85, 0.65, 0.5, 0.38, 0.28, 0.2]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 46, marginTop: 'auto', paddingTop: '1.75rem' }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: 4, height: h, borderRadius: 2, background: `rgba(253,247,255,${opacities[i]})`, animation: `waveAnim 1.6s ${i * 0.08}s ease-in-out infinite` }} />
      ))}
    </div>
  )
}

function MoodTracker() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const moods = [3, 4, 2, 5, 4, 3, 5]
  const colors = ['', 'rgba(103,80,165,0.2)', 'rgba(103,80,165,0.35)', 'rgba(103,80,165,0.5)', 'rgba(103,80,165,0.7)', 'var(--primary)']
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 52 }}>
        {moods.map((m, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: m * 9, borderRadius: 4, background: colors[m] }} />
            <span style={{ fontSize: '0.6rem', fontWeight: 600, color: 'var(--on-surface-variant)' }}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BreathingOrb() {
  return (
    <div style={{ position: 'absolute', right: -30, bottom: -30, width: 130, height: 130, borderRadius: '50%', background: 'rgba(0,72,90,0.1)', animation: 'breatheOrb 8s ease-in-out infinite', pointerEvents: 'none' }} />
  )
}

function MicroActions() {
  const items = [
    { icon: Wind, label: 'Anxiety reset', time: '45s', color: 'var(--tertiary)', bg: 'rgba(99,215,254,0.15)' },
    { icon: Zap, label: 'Confidence boost', time: '30s', color: 'var(--secondary)', bg: 'rgba(255,220,195,0.4)' },
    { icon: Brain, label: 'Focus reset', time: '60s', color: 'var(--primary)', bg: 'rgba(202,182,255,0.25)' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: '1.25rem' }}>
      {items.map(({ icon: Icon, label, time, color, bg }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: bg, borderRadius: 12, padding: '8px 12px' }}>
          <Icon size={16} color={color} />
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.8rem', fontWeight: 600, color: 'var(--on-surface)', flex: 1 }}>{label}</span>
          <span style={{ fontSize: '0.68rem', fontWeight: 700, color, fontFamily: "'Manrope',sans-serif" }}>{time}</span>
        </div>
      ))}
    </div>
  )
}

const CARDS = [
  { id: 'voice', span: false, tall: true, variant: 'purple', Icon: Mic, title: 'Voice Journal AI', body: 'Speak freely. Eunoia detects tone, pauses, and emotional intensity — then turns your voice into insight. No typing, just talking.', chip: 'AI-Powered', extra: 'wave' },
  { id: 'reframe', span: false, tall: false, variant: 'default', Icon: Brain, title: 'Thought Reframing', body: 'Share a negative thought. Eunoia challenges cognitive distortions and offers alternative perspectives — like a wise friend, not a therapist.', chip: 'Cognitive Tools' },
  { id: 'panic', span: false, tall: false, variant: 'teal', Icon: Wind, title: 'Panic Mode', body: 'One tap. Guided breathing, grounding 5-4-3-2-1, and calming support for your hardest moments.', chip: 'Instant Relief', extra: 'orb' },
  { id: 'insights', span: true, tall: false, variant: 'default', Icon: TrendingUp, title: 'Mood Pattern Intelligence', body: '"Your mood drops on Sunday evenings." Eunoia tracks emotional trends across time, activities, and behaviors — turning raw data into real self-awareness.', chip: 'Weekly Insights', extra: 'chart' },
  { id: 'micro', span: false, tall: false, variant: 'peach', Icon: Zap, title: 'Micro-Interventions', body: '30–60 second tools built for real life — anxiety resets, confidence boosts, and focus resets when you have no time.', chip: 'Quick Relief', extra: 'actions' },
  { id: 'grow', span: true, tall: false, variant: 'dark', Icon: Sprout, title: 'Growth Paths', body: 'Choose a personal goal — reduce anxiety, build confidence, stop overthinking. Daily prompts, small challenges, and real progress tracking built around your life.', chip: 'Personal Development' },
]

const VARIANTS = {
  purple: { bg: 'linear-gradient(145deg,var(--primary) 0%,var(--primary-dim) 100%)', iconBg: 'rgba(255,255,255,0.2)', iconColor: 'white', title: 'white', body: 'rgba(255,255,255,0.8)', chipBg: 'rgba(255,255,255,0.18)', chipColor: 'white' },
  teal: { bg: 'var(--tertiary-container)', iconBg: 'rgba(255,255,255,0.45)', iconColor: 'var(--on-tertiary-container)', title: 'var(--on-tertiary-container)', body: 'rgba(0,72,90,0.72)', chipBg: 'rgba(0,72,90,0.1)', chipColor: 'var(--on-tertiary-container)' },
  peach: { bg: 'var(--secondary-container)', iconBg: 'rgba(255,255,255,0.5)', iconColor: 'var(--secondary)', title: 'var(--secondary)', body: 'rgba(145,77,0,0.72)', chipBg: 'rgba(145,77,0,0.1)', chipColor: 'var(--secondary)' },
  dark: { bg: 'var(--on-surface)', iconBg: 'rgba(255,255,255,0.08)', iconColor: 'rgba(255,255,255,0.8)', title: 'white', body: 'rgba(255,255,255,0.55)', chipBg: 'rgba(255,255,255,0.1)', chipColor: 'rgba(255,255,255,0.8)' },
  default: { bg: 'var(--surface-low)', iconBg: 'rgba(103,80,165,0.1)', iconColor: 'var(--primary)', title: 'var(--on-surface)', body: 'var(--on-surface-variant)', chipBg: 'rgba(103,80,165,0.08)', chipColor: 'var(--primary)' },
}

function BentoCard({ card, delay }) {
  const ref = useReveal(delay)
  const v = VARIANTS[card.variant]
  const isRow = card.extra === 'chart'
  return (
    <div
      ref={ref}
      className={`bento-card${card.span ? ' bento-span' : ''}${card.tall ? ' bento-tall' : ''}`}
      style={{
        background: v.bg, borderRadius: 24, padding: '2rem',
        position: 'relative', overflow: 'hidden',
        display: 'flex', flexDirection: isRow ? 'row' : 'column',
        gap: isRow ? '2rem' : 0,
        alignItems: isRow ? 'center' : 'flex-start',
        transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)', cursor: 'default',
      }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: isRow ? 'auto' : '100%', marginBottom: isRow ? 0 : '1.25rem', flexShrink: isRow ? 0 : 1 }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: v.iconBg, color: v.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <card.Icon size={20} />
        </div>
        {!isRow && (
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
            <ArrowUpRight size={13} color={v.title === 'white' ? 'white' : 'var(--on-surface)'} />
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '1.08rem', fontWeight: 700, color: v.title, lineHeight: 1.3, marginBottom: '0.6rem' }}>{card.title}</h3>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '0.855rem', lineHeight: 1.7, color: v.body, marginBottom: '1.1rem' }}>{card.body}</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', background: v.chipBg, color: v.chipColor, padding: '0.28rem 0.75rem', borderRadius: 9999, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{card.chip}</div>
        {card.extra === 'chart' && <MoodTracker />}
        {card.extra === 'actions' && <MicroActions />}
      </div>

      {card.extra === 'wave' && <WaveformViz />}
      {card.extra === 'orb' && <BreathingOrb />}
    </div>
  )
}

export default function Features() {
  const headerRef = useReveal(0)
  return (
    <section id="features" style={{ padding: '6rem 1.5rem', maxWidth: 1280, margin: '0 auto' }}>
      <div ref={headerRef} style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--tertiary)', marginBottom: '1.25rem', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          <div style={{ width: 24, height: 1.5, background: 'var(--tertiary)' }} />
          What Eunoia does
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--on-surface)', marginBottom: '1rem' }}>
          Everything you need to<br /><em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>understand yourself.</em>
        </h2>
        <p style={{ fontFamily: "'Manrope',sans-serif", fontSize: '1rem', lineHeight: 1.75, color: 'var(--on-surface-variant)', maxWidth: 540 }}>
          Unlike apps that just log your mood and give generic advice, Eunoia listens to context, responds intelligently, and meets you exactly where you are.
        </p>
      </div>

      <div className="bento-grid">
        {CARDS.map((card, i) => <BentoCard key={card.id} card={card} delay={i * 60} />)}
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .bento-span { grid-column: span 2; }
        .bento-tall { grid-row: span 2; }

        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-span { grid-column: span 2; }
          .bento-tall { grid-row: span 1; }
        }
        @media (max-width: 560px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-span { grid-column: span 1; }
          .bento-card { border-radius: 20px; padding: 1.5rem; }
        }
        @keyframes waveAnim{0%,100%{transform:scaleY(1)}50%{transform:scaleY(0.3)}}
        @keyframes breatheOrb{0%,100%{transform:scale(1);opacity:0.4}50%{transform:scale(1.6);opacity:0.7}}
      `}</style>
    </section>
  )
}
