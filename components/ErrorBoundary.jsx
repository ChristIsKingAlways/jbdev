'use client'

/**
 * Class error boundary around main content; renders BEM-styled fallback on error.
 * See ErrorBoundary.module.css.
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
        <section className={styles['error-boundary']} role="alert">
          <h1 className={styles['error-boundary__title']}>Something went wrong</h1>
          <p className={styles['error-boundary__message']}>
            Please refresh the page. If the problem persists, try again later.
          </p>
          <button
            type="button"
            className={styles['error-boundary__reload']}
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
