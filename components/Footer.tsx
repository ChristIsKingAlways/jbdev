'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            © {currentYear}
          </p>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/ChristIsKingAlways" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/jordan-l-benson/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-white/30 hover:text-white/60 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
