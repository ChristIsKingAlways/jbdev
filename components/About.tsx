'use client'

export default function About() {
  return (
    <section id="about" className="py-32 md:py-40 border-t border-white/5">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <p className="text-sm text-white/40 uppercase tracking-wider mb-4">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">
              Builder. Problem solver. Always learning.
            </h2>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <p className="text-lg text-white/60 leading-relaxed">
              I&apos;m a builder at heart with a background in IT support and a growing focus on full-stack development. After 17 years of solving real-world technical problems, I&apos;ve shifted toward creating digital tools, websites, and systems that actually move things forward.
            </p>
            
            <p className="text-lg text-white/60 leading-relaxed">
              I don&apos;t come from a traditional developer path—I come from hands-on experience. I&apos;ve spent years troubleshooting, learning how systems break, and more importantly, how to fix them. That perspective carries into everything I build today: practical, user-focused, and built to work in the real world.
            </p>

            <p className="text-lg text-white/60 leading-relaxed">
              Right now, I&apos;m actively developing projects that combine modern web technologies with automation and AI. From building platforms like IronDisciple to working with tools like Supabase, Vercel, and API integrations, I&apos;m focused on creating solutions that are not just functional—but meaningful.
            </p>

            <p className="text-lg text-white/60 leading-relaxed">
              I&apos;m especially interested in building things that help people—whether that&apos;s through better user experiences, smarter systems, or tools that solve real problems.
            </p>

            <p className="text-lg text-white/80 leading-relaxed font-medium">
              I&apos;m not just learning to code. I&apos;m building, testing, and improving every day.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
