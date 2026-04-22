import { Mic, Brain, Wind, TrendingUp, Zap, Sprout, BarChart2, Heart } from 'lucide-react'

const ITEMS = [
  { Icon: Mic, label: 'Voice Journaling', color: 'var(--primary)', bg: 'rgba(103,80,165,0.1)' },
  { Icon: Brain, label: 'AI Mood Analysis', color: 'var(--on-tertiary-container)', bg: 'var(--tertiary-container)' },
  { Icon: Wind, label: 'Panic Mode', color: 'var(--on-tertiary-container)', bg: 'rgba(99,215,254,0.3)' },
  { Icon: Heart, label: 'Thought Reframing', color: 'var(--secondary)', bg: 'var(--secondary-container)' },
  { Icon: BarChart2, label: 'Weekly Insights', color: 'var(--primary)', bg: 'var(--primary-container)' },
  { Icon: Sprout, label: 'Grounding Exercises', color: 'var(--on-tertiary-container)', bg: 'var(--tertiary-container)' },
  { Icon: TrendingUp, label: 'Growth Paths', color: 'var(--secondary)', bg: 'var(--secondary-container)' },
  { Icon: Zap, label: 'Micro-Interventions', color: 'var(--primary)', bg: 'rgba(103,80,165,0.1)' },
]
const DOUBLED = [...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div style={{ padding: '1.5rem 0', overflow: 'hidden', borderTop: '1px solid rgba(175,178,182,0.2)', borderBottom: '1px solid rgba(175,178,182,0.2)', background: 'var(--surface-lowest)', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg,var(--surface-lowest),transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg,var(--surface-lowest),transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: '2.75rem', animation: 'marqueeScroll 30s linear infinite', width: 'max-content', alignItems: 'center' }}>
        {DOUBLED.map(({ Icon, label, color, bg }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={14} color={color} strokeWidth={2} />
            </div>
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.77rem', fontWeight: 700, color: 'var(--on-surface-variant)', letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{label}</span>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary-container)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  )
}
