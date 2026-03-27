'use client'

/**
 * Class error boundary around main content; fallback UI in ErrorBoundary.module.css.
 */

import { Component } from 'react'
import styles from './ErrorBoundary.module.css'

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
        <section className={styles.root} role="alert">
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            Please refresh the page. If the problem persists, try again later.
          </p>
          <button
            type="button"
            className={styles.reload}
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </section>
      )
    }

    return this.props.children
  }
}
