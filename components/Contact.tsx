'use client'

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 border-t border-white/5">
      <div className="container-custom">
        <div className="max-w-2xl">
          {/* Header */}
          <p className="text-sm text-white/40 uppercase tracking-wider mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Let&apos;s work together
          </h2>
          <p className="text-lg text-white/50 mb-12">
            Have a project in mind? I&apos;d love to hear about it.
          </p>

          {/* Email */}
          <a 
            href="mailto:Jordan@duodynamicsit.com" 
            className="inline-block text-2xl md:text-3xl text-white hover:text-white/70 transition-colors"
          >
            Jordan@duodynamicsit.com
          </a>
        </div>
      </div>
    </section>
  )
}
