'use client'

import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            padding: '4rem 1.5rem',
            maxWidth: '36rem',
            margin: '0 auto',
            textAlign: 'center',
          }}
          role="alert"
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Something went wrong</h1>
          <p style={{ color: 'rgba(248, 250, 252, 0.6)', marginBottom: '1.5rem' }}>
            Please refresh the page. If the problem persists, try again later.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              background: '#d4af37',
              color: '#0a0f1a',
              fontWeight: 600,
            }}
          >
            Reload
          </button>
        </section>
      )
    }

    return this.props.children
  }
}
