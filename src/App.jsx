import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Features from './components/Features'
import ManifestoStrip from './components/ManifestoStrip'
import EmotionShowcase from './components/EmotionShowcase'
import HowItWorks from './components/HowItWorks'
import Waitlist from './components/Waitlist'
import Footer from './components/Footer'

export default function App() {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <ManifestoStrip />
        <EmotionShowcase />
        <HowItWorks />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
