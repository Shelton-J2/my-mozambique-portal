'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin } from 'lucide-react'

const provinces = [
  { id: 'cabo-delgado', name: 'Cabo Delgado', population: '2.3M', area: '82,625 km²', capital: 'Pemba' },
  { id: 'niassa', name: 'Niassa', population: '1.8M', area: '129,056 km²', capital: 'Lichinga' },
  { id: 'nampula', name: 'Nampula', population: '5.8M', area: '81,606 km²', capital: 'Nampula' },
  { id: 'zambezia', name: 'Zambézia', population: '5.1M', area: '103,478 km²', capital: 'Quelimane' },
  { id: 'tete', name: 'Tete', population: '2.6M', area: '100,724 km²', capital: 'Tete' },
  { id: 'manica', name: 'Manica', population: '1.9M', area: '62,272 km²', capital: 'Chimoio' },
  { id: 'sofala', name: 'Sofala', population: '2.2M', area: '68,018 km²', capital: 'Beira' },
  { id: 'inhambane', name: 'Inhambane', population: '1.5M', area: '68,615 km²', capital: 'Inhambane' },
  { id: 'gaza', name: 'Gaza', population: '1.4M', area: '75,709 km²', capital: 'Xai-Xai' },
  { id: 'maputo-prov', name: 'Maputo Província', population: '1.9M', area: '26,058 km²', capital: 'Matola' },
  { id: 'maputo-city', name: 'Maputo Cidade', population: '1.1M', area: '346 km²', capital: 'Maputo' },
]

const getFill = (id, activeId, hoveredId, isCapital) => {
  if (id === activeId) return isCapital ? '#fcd34d' : '#34d399'
  if (id === hoveredId) return isCapital ? '#10b981' : '#0d9488'
  return isCapital ? '#059669' : '#064e3b'
}

const getStroke = (id, activeId, isCapital) => {
  if (id === activeId) return isCapital ? '#fde68a' : '#6ee7b7'
  return isCapital ? '#fcd34d' : '#34d399'
}

export default function MozambiqueMap() {
  const [active, setActive] = useState(provinces[10])
  const [hovered, setHovered] = useState(null)

  const displayed = hovered || active

  const pathProps = (prov, isCapital = false) => ({
    fill: getFill(prov.id, active?.id, hovered?.id, isCapital),
    stroke: getStroke(prov.id, active?.id, isCapital),
    strokeWidth: '1.5',
    className: 'cursor-pointer',
    style: { transition: 'fill 0.22s ease, stroke 0.22s ease' },
    onClick: () => setActive(prov),
    onMouseEnter: () => setHovered(prov),
    onMouseLeave: () => setHovered(null),
  })

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* Map */}
      <div className="flex-1 flex justify-center">
        <svg
          viewBox="0 0 300 520"
          className="w-full max-w-[260px] lg:max-w-xs"
          style={{ filter: 'drop-shadow(0 8px 40px rgba(0,154,68,0.22))' }}
        >
          <path d="M160,10 L240,15 L250,30 L245,70 L200,80 L155,75 L150,50 Z" {...pathProps(provinces[0])} />
          <path d="M80,20 L155,15 L150,50 L155,75 L130,110 L75,115 L65,80 L70,40 Z" {...pathProps(provinces[1])} />
          <path d="M155,75 L200,80 L245,70 L250,100 L230,130 L190,145 L155,140 L130,110 Z" {...pathProps(provinces[2])} />
          <path d="M100,115 L130,110 L155,140 L190,145 L195,175 L170,195 L130,200 L95,185 L85,155 Z" {...pathProps(provinces[3])} />
          <path d="M65,115 L100,115 L85,155 L75,175 L50,180 L40,155 L45,125 Z" {...pathProps(provinces[4])} />
          <path d="M85,155 L95,185 L90,215 L70,230 L50,220 L40,195 L50,180 Z" {...pathProps(provinces[5])} />
          <path d="M90,215 L95,185 L130,200 L170,195 L175,225 L160,255 L120,260 L90,250 L70,230 Z" {...pathProps(provinces[6])} />
          <path d="M95,255 L120,260 L160,255 L168,285 L160,320 L140,340 L115,345 L95,325 L88,295 Z" {...pathProps(provinces[7])} />
          <path d="M80,320 L95,325 L115,345 L118,375 L105,400 L80,410 L65,390 L60,355 L65,330 Z" {...pathProps(provinces[8])} />
          <path d="M65,390 L80,410 L82,435 L70,455 L52,450 L45,425 L50,400 Z" {...pathProps(provinces[9])} />
          <path d="M52,450 L70,455 L72,475 L58,480 L45,468 L45,452 Z" {...pathProps(provinces[10], true)} />

          <text x="238" y="298" fill="rgba(52,211,153,0.28)" fontSize="9" fontStyle="italic">Oceano</text>
          <text x="238" y="311" fill="rgba(52,211,153,0.28)" fontSize="9" fontStyle="italic">Índico</text>
          <text x="255" y="48" fill="rgba(255,255,255,0.45)" fontSize="11" fontWeight="bold">N</text>
          <line x1="261" y1="50" x2="261" y2="63" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* Detail panel */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {displayed && (
            <motion.div
              key={displayed.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="mb-5"
            >
              <div className="relative rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/70 to-emerald-900/30 backdrop-blur-sm p-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-emerald-400/50 text-xs uppercase tracking-[0.18em] mb-1.5">Província</p>
                    <h3 className="text-2xl font-bold text-white">{displayed.name}</h3>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-emerald-400/50 text-xs mb-1.5">População</p>
                    <p className="text-xl font-bold text-white">{displayed.population}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-emerald-400/50 text-xs mb-1.5">Área</p>
                    <p className="text-base font-bold text-white leading-snug">{displayed.area}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <p className="text-emerald-400/50 text-xs mb-1.5">Capital</p>
                    <p className="text-base font-bold text-white">{displayed.capital}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Province list */}
        <div className="space-y-0.5 max-h-[17rem] overflow-y-auto pr-1">
          {provinces.map((prov) => (
            <motion.div
              key={prov.id}
              onClick={() => setActive(prov)}
              onMouseEnter={() => setHovered(prov)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.15 }}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer transition-colors duration-150 ${
                active?.id === prov.id
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : hovered?.id === prov.id
                  ? 'bg-white/5 border border-white/10 text-gray-200'
                  : 'border border-transparent text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                  active?.id === prov.id ? 'bg-emerald-400' :
                  hovered?.id === prov.id ? 'bg-white/40' : 'bg-white/15'
                }`} />
                <span className="font-medium text-sm">{prov.name}</span>
              </div>
              <span className="text-xs text-gray-500">{prov.population}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
