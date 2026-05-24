'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Globe, Check } from 'lucide-react'
import { useTranslation } from '@/components/providers'

export function ThemeToggle({ className = '' }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button className={`p-2 rounded-lg ${className}`} aria-label="Toggle theme">
        <Sun className="w-4.5 h-4.5" />
      </button>
    )
  }

  const isDark = (resolvedTheme || theme) === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('nav.theme.light') : t('nav.theme.dark')}
      className={`p-2 rounded-lg hover:bg-muted transition-colors relative overflow-hidden ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4.5 h-4.5" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4.5 h-4.5 text-amber-500" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

export function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, languages, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const current = languages.find((l) => l.code === language) || languages[0]

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={t('nav.language')}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors font-semibold text-sm"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs tracking-wide">{current.flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 mt-2 w-44 rounded-xl border border-border bg-background shadow-xl shadow-black/10 overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false) }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm hover:bg-muted transition-colors ${
                  language === lang.code ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-foreground'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-xs font-bold bg-muted px-1.5 py-0.5 rounded-md">
                    {lang.flag}
                  </span>
                  {lang.label}
                </span>
                {language === lang.code && <Check className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
