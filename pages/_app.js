import { useEffect, useState } from 'react'
import ThemeToggle from '@components/ThemeToggle'
import '@styles/globals.css'

const THEME_STORAGE_KEY = 'theme-preference'

function Application({ Component, pageProps }) {
  const [themeMode, setThemeMode] = useState('system')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (mode) => {
      const resolvedDark = mode === 'dark' || (mode === 'system' && mediaQuery.matches)
      document.documentElement.classList.toggle('dark', resolvedDark)
    }

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    const initialMode =
      storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
        ? storedTheme
        : 'system'

    setThemeMode(initialMode)
    applyTheme(initialMode)

    const syncTheme = () => {
      setThemeMode((currentMode) => {
        applyTheme(currentMode)
        return currentMode
      })
    }

    mediaQuery.addEventListener('change', syncTheme)

    return () => {
      mediaQuery.removeEventListener('change', syncTheme)
    }
  }, [])

  const handleThemeChange = (nextMode) => {
    setThemeMode(nextMode)

    window.localStorage.setItem(THEME_STORAGE_KEY, nextMode)

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    document.documentElement.classList.toggle(
      'dark',
      nextMode === 'dark' || (nextMode === 'system' && prefersDark)
    )
  }

  return (
    <>
      <ThemeToggle mode={themeMode} onChange={handleThemeChange} />

      <Component {...pageProps} />
    </>
  )
}

export default Application
