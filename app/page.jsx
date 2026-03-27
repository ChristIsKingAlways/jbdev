import SkipLink from '@/components/SkipLink'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import CursorGlow from '@/components/CursorGlow'
import ParticleField from '@/components/ParticleField'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <ParticleField />
      <CursorGlow />
      <Navigation />
      <ErrorBoundary>
        <main id="main-content">
          <Hero />
          <Projects />
          <About />
          <Contact />
          <Footer />
        </main>
      </ErrorBoundary>
    </>
  )
}
