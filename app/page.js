'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, ChevronRight, ArrowRight, MapPin, Users,
  Building2, Briefcase, GraduationCap, Heart, Car, Scale, Sprout,
  FileText, Globe, Lightbulb, Shield, Zap, Award,
  Phone, Mail, Facebook, Twitter, Instagram, Youtube,
  ExternalLink,
} from 'lucide-react'
import { useTranslation } from '@/components/providers'
import { ThemeToggle, LanguageSwitcher } from '@/components/site-controls'
import AnimatedCounter from '@/components/animated-counter'
import ParticlesBg from '@/components/particles-bg'
import { useTheme } from 'next-themes'

export default function App() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const heroY = useTransform(scrollY, [0, 400], [0, 80])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = ['services', 'government', 'mozambique', 'news']
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.15, rootMargin: '-10% 0px -65% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o && o.disconnect())
  }, [])

  const navLinkClass = (id) => {
    const isActive = activeSection === id
    return `text-sm font-medium transition-all duration-200 relative group pb-0.5 ${
      isActive
        ? scrolled ? 'text-emerald-600 dark:text-emerald-400' : 'text-emerald-300'
        : scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-white/80 hover:text-white'
    }`
  }

  const navUnderlineClass = (id) => {
    const isActive = activeSection === id
    return `absolute -bottom-0.5 left-0 right-0 h-px bg-emerald-400 origin-left transition-transform duration-200 ${
      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
    }`
  }

  const quickServices = [
    { icon: FileText, key: 'quick.bi' },
    { icon: Globe, key: 'quick.passport' },
    { icon: FileText, key: 'quick.nuit' },
    { icon: Building2, key: 'quick.public' },
    { icon: Briefcase, key: 'quick.invest' },
    { icon: Users, key: 'quick.employee' },
  ]

  const serviceCategories = [
    { icon: FileText, key: 'identification', color: 'bg-emerald-500' },
    { icon: GraduationCap, key: 'education', color: 'bg-blue-500' },
    { icon: Heart, key: 'health', color: 'bg-red-500' },
    { icon: Car, key: 'transport', color: 'bg-orange-500' },
    { icon: Briefcase, key: 'investment', color: 'bg-purple-500' },
    { icon: FileText, key: 'taxes', color: 'bg-yellow-500' },
    { icon: Scale, key: 'justice', color: 'bg-indigo-500' },
    { icon: Users, key: 'jobs', color: 'bg-teal-500' },
    { icon: Sprout, key: 'agriculture', color: 'bg-green-500' },
  ]

  const ministries = [
  { key: 'finance', url: 'https://www.mf.gov.mz' },
  { key: 'health', url: 'https://www.misau.gov.mz' },
  { key: 'education', url: 'https://www.mined.gov.mz' },
  { key: 'interior', url: 'https://www.mint.gov.mz' },
  { key: 'transport', url: 'https://www.mtransportes.gov.mz' },
  { key: 'agriculture', url: 'https://www.masa.gov.mz' },
]

  const provinces = [
    { name: 'Cabo Delgado', population: '2.3M', capital: 'Pemba' },
    { name: 'Niassa', population: '1.8M', capital: 'Lichinga' },
    { name: 'Nampula', population: '5.8M', capital: 'Nampula' },
    { name: 'Zambezia', population: '5.1M', capital: 'Quelimane' },
    { name: 'Tete', population: '2.6M', capital: 'Tete' },
    { name: 'Manica', population: '1.9M', capital: 'Chimoio' },
    { name: 'Sofala', population: '2.2M', capital: 'Beira' },
    { name: 'Inhambane', population: '1.5M', capital: 'Inhambane' },
    { name: 'Gaza', population: '1.4M', capital: 'Xai-Xai' },
    { name: 'Maputo Provincia', population: '1.9M', capital: 'Matola' },
    { name: 'Maputo Cidade', population: '1.1M', capital: 'Maputo' },
  ]

  const stats = [
    { labelKey: 'stats.population', value: 32, suffix: '.1M', icon: Users },
    { labelKey: 'stats.provinces', value: 11, suffix: '', icon: MapPin },
    { labelKey: 'stats.digital', value: 150, suffix: '+', icon: Globe },
    { labelKey: 'stats.satisfaction', value: 87, suffix: '%', icon: Award },
  ]

  const newsItems = [
    {
      titleKey: 'news.item1.title',
      catKey: 'news.item1.cat',
      date: '15 Jun 2025',
      image: 'https://images.pexels.com/photos/6859544/pexels-photo-6859544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    },
    {
      titleKey: 'news.item2.title',
      catKey: 'news.item2.cat',
      date: '12 Jun 2025',
      image: 'https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&w=800&q=80',
    },
    {
      titleKey: 'news.item3.title',
      catKey: 'news.item3.cat',
      date: '10 Jun 2025',
      image: 'https://images.unsplash.com/photo-1510410493114-38f0a17d66ef?auto=format&fit=crop&w=800&q=80',
    },
  ]

  const digitalItems = [
    { icon: Zap, titleKey: 'digital.online.title', descKey: 'digital.online.desc' },
    { icon: Shield, titleKey: 'digital.security.title', descKey: 'digital.security.desc' },
    { icon: Lightbulb, titleKey: 'digital.innovation.title', descKey: 'digital.innovation.desc' },
    { icon: Globe, titleKey: 'digital.access.title', descKey: 'digital.access.desc' },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">

      {/* NAV */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-5">

            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-emerald-700 flex-shrink-0">
                <img
                  src="/emblema.png"
                  alt="Emblema"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentNode.innerHTML = '<span style="color:white;font-weight:bold;font-size:11px;display:flex;align-items:center;justify-content:center;width:100%;height:100%">MZ</span>'
                  }}
                />
              </div>
              <div>
                <p className={`text-sm font-bold leading-tight ${scrolled ? 'text-foreground' : 'text-white'}`}>
                  República de Moçambique
                </p>
                <p className={`text-xs ${scrolled ? 'text-muted-foreground' : 'text-white/60'}`}>
                  Portal do Governo
                </p>
              </div>
            </motion.div>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#services" className={navLinkClass('services')}>
                {t('nav.services')}
                <span className={navUnderlineClass('services')} />
              </a>
              <a href="#government" className={navLinkClass('government')}>
                {t('nav.government')}
                <span className={navUnderlineClass('government')} />
              </a>
              <a href="#mozambique" className={navLinkClass('mozambique')}>
                {t('nav.mozambique')}
                <span className={navUnderlineClass('mozambique')} />
              </a>
              <a href="#news" className={navLinkClass('news')}>
                {t('nav.news')}
                <span className={navUnderlineClass('news')} />
              </a>
            </div>

            <div className="hidden lg:flex items-center gap-2 border-l border-white/20 pl-6">
              <LanguageSwitcher />
              <ThemeToggle />
              <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
                scrolled
                  ? 'text-emerald-600 dark:text-emerald-400 border-emerald-500/40 hover:bg-emerald-50 dark:hover:bg-emerald-500/10'
                  : 'text-white border-white/30 hover:bg-white/10'
              }`}>
                <Search className="w-3.5 h-3.5" />
                {t('nav.search')}
              </button>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <button
                className={`p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-muted text-foreground' : 'text-white hover:bg-white/10'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="container mx-auto px-6 py-4 space-y-1">
                <a href="#services" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{t('nav.services')}</a>
                <a href="#government" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{t('nav.government')}</a>
                <a href="#mozambique" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{t('nav.mozambique')}</a>
                <a href="#news" onClick={() => setIsMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{t('nav.news')}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/75 z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.pexels.com/photos/30188147/pexels-photo-30188147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          >
            <source src="https://videos.pexels.com/video-files/29619791/12680633_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          <ParticlesBg />
        </div>

        <div className="container mx-auto px-6 lg:px-10 relative z-20 pt-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-14 bg-gradient-to-r from-transparent to-emerald-400/70" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" style={{ animationDuration: '2s' }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-300" />
                </span>
                <span className="text-emerald-300/90 text-xs font-semibold tracking-[0.22em] uppercase drop-shadow-md">
                  Portal Oficial do Governo
                </span>
              </div>
              <div className="h-px w-14 bg-gradient-to-l from-transparent to-emerald-400/70" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {t('hero.title.line1')}
              <br />
              <span style={{
                backgroundImage: 'linear-gradient(90deg, #34d399, #fcd34d, #34d399)',
                backgroundSize: '200% auto',
                animation: 'shimmer 4s linear infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(52,211,153,0.4))',
              }}>
                {t('hero.title.line2')}
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-500/30"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 border-2 border-white/40 hover:border-white/70 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
              >
                {t('hero.cta.secondary')}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div
              className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
            >
              {quickServices.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/15 backdrop-blur-md border border-white/25 hover:border-emerald-400/60 rounded-xl p-3 text-center cursor-pointer transition-all group"
                >
                  <s.icon className="w-5 h-5 text-emerald-300 mx-auto mb-1.5 group-hover:text-emerald-200 transition-colors drop-shadow-sm" />
                  <p className="text-white/90 text-xs leading-tight font-medium">{t(s.key)}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div
            className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5 hover:border-white/50 transition-colors cursor-pointer"
            onClick={() => document.getElementById('services') && document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
          >
            <motion.div
              className="w-0.5 h-1.5 rounded-full bg-white/70"
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-emerald-700 dark:bg-emerald-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }} />
        <div className="absolute -top-20 left-1/4 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center px-6 py-4 relative"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
              >
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-14 w-px bg-white/15 hidden md:block" />
                )}
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-4xl md:text-5xl font-bold text-white mb-1.5 tracking-tight">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-emerald-100/65 text-sm font-medium">{t(stat.labelKey)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {t('services.badge')}
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-lg">
                {t('services.title')}
              </h2>
              <p className="text-muted-foreground max-w-sm leading-relaxed">{t('services.subtitle')}</p>
            </div>
          </motion.div>

          <div className="max-w-md mb-10">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('services.search')}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories
              .filter(cat =>
                searchQuery === '' ||
                t(`services.cat.${cat.key}`).toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="group relative p-6 rounded-2xl border border-border hover:border-emerald-500/30 bg-card hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 cursor-pointer h-full overflow-hidden">
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-emerald-500 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all duration-200">
                      <cat.icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {t(`services.cat.${cat.key}`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {t(`services.cat.${cat.key}.desc`)}
                    </p>
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium flex items-center gap-1">
                      {t('services.cta')} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* GOVERNMENT */}
      <section id="government" className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm font-semibold uppercase tracking-widest mb-3">
              {t('gov.badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              {t('gov.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-8 h-full">
                <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center mb-5">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('gov.presidency')}</h3>
                <p className="text-emerald-100/80 text-sm mb-6 leading-relaxed">{t('gov.presidency.desc')}</p>
                <a href="https://https://presidencia.gov.mz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition-colors">
  {t('gov.visit.portal')} <ExternalLink className="w-3.5 h-3.5" />
</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-8 h-full">
                <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center mb-5">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{t('gov.council')}</h3>
                <p className="text-amber-100/80 text-sm mb-6 leading-relaxed">{t('gov.council.desc')}</p>
                <a href="https://www.portaldogoverno.gov.mz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 bg-white text-amber-700 rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors">
  {t('gov.view.composition')} <ChevronRight className="w-3.5 h-3.5" />
</a>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ministries.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3 }}
              >
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="group p-5 rounded-xl border border-border hover:border-emerald-500/40 bg-card transition-all cursor-pointer block">
                  <h4 className="font-semibold text-foreground text-sm mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {t(`gov.min.${m.key}`)}
                  </h4>
                  <p className="text-muted-foreground text-xs mb-3">{t(`gov.min.${m.key}.desc`)}</p>
                  <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1">
                    {t('gov.visit')} <ChevronRight className="w-3 h-3" />
                  </span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MOZAMBIQUE */}
      <section id="mozambique" className="py-24 bg-[#040e09] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-transparent to-emerald-900/20 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
              {t('discover.badge')}
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight max-w-lg">
                {t('discover.title')}
              </h2>
              <p className="text-white/40 max-w-sm leading-relaxed">{t('discover.subtitle')}</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Área Total', value: '801,590 km²' },
              { label: 'População Total', value: '32.1M' },
              { label: 'Língua Oficial', value: 'Português' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm"
              >
                <p className="text-lg font-bold text-white">{item.value}</p>
                <p className="text-white/40 text-xs mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {provinces.map((prov, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="group p-4 rounded-xl border border-white/10 hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-500/10 transition-all cursor-pointer backdrop-blur-sm">
                  <MapPin className="w-4 h-4 text-emerald-400 mb-2" />
                  <h4 className="font-semibold text-white text-sm mb-0.5 group-hover:text-emerald-400 transition-colors">
                    {prov.name}
                  </h4>
                  <p className="text-white/40 text-xs">{prov.population}</p>
                  <p className="text-white/40 text-xs">{prov.capital}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS */}
      <section id="news" className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 lg:px-10">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">
                {t('news.badge')}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t('news.title')}
              </h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="self-start md:self-auto px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              {t('news.all')} <ChevronRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="group rounded-2xl border border-border overflow-hidden bg-card hover:border-emerald-500/30 transition-all cursor-pointer h-full">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={news.image}
                      alt={t(news.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-600 text-white text-xs font-semibold rounded-lg">
                      {t(news.catKey)}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-muted-foreground text-xs mb-2">{news.date}</p>
                    <h3 className="font-semibold text-foreground mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug text-sm">
                      {t(news.titleKey)}
                    </h3>
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium flex items-center gap-1">
                      {t('news.read')} <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIGITAL GOV */}
      <section className="py-24 bg-foreground dark:bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-10 relative z-10">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">
              {t('digital.badge')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-background dark:text-white mb-4">
              {t('digital.title')}
            </h2>
            <p className="text-background/60 dark:text-gray-400 max-w-2xl mx-auto">
              {t('digital.subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {digitalItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/25 hover:bg-white/[0.07] transition-all duration-300 h-full overflow-hidden group">
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-emerald-400/20 transition-all duration-300" />
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-background dark:text-white mb-2 text-sm">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-background/55 dark:text-gray-400 text-xs leading-relaxed">
                    {t(item.descKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-20 bg-emerald-500/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg overflow-hidden bg-emerald-700 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/emblema.png"
                    alt="Emblema"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">República de Moçambique</p>
                  <p className="text-xs text-muted-foreground">Portal do Governo</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{t('footer.tagline')}</p>
              <div className="flex gap-2">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-8 h-8 bg-muted hover:bg-emerald-600 border border-border rounded-lg flex items-center justify-center transition-colors group"
                  >
                    <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">{t('footer.services')}</h4>
              <ul className="space-y-2.5">
                {['s1','s2','s3','s4','s5'].map((k) => (
                  <li key={k}>
                    <a href="#" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm">
                      {t(`footer.${k}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">{t('footer.government')}</h4>
              <ul className="space-y-2.5">
                {['g1','g2','g3','g4','g5'].map((k) => (
                  <li key={k}>
                    <a href="#" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm">
                      {t(`footer.${k}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">{t('footer.contact')}</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">+258 21 490 000</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">info@governo.mz</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-sm">Maputo, Moçambique</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-xs">{t('footer.rights')}</p>
            <div className="flex gap-6">
              {['footer.privacy','footer.terms','footer.accessibility'].map((k) => (
                <a key={k} href="#" className="text-muted-foreground hover:text-foreground transition-colors text-xs">
                  {t(k)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}