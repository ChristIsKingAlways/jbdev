/**
 * Home page composition: global chrome (skip, progress, inspector, canvas, nav)
 * then main landmark with section components inside ErrorBoundary.
 */

import SkipLink from '@/components/SkipLink'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import HoverCodeTooltip from '@/components/HoverCodeTooltip'
import ParticleField from '@/components/ParticleField'
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Home() {
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <HoverCodeTooltip />
      <ParticleField />
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
