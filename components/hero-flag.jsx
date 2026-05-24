'use client'

import { useEffect, useRef } from 'react'

export default function HeroFlag() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let time = 0

    canvas.width = 320
    canvas.height = 210

    const COLS = 40
    const ROWS = 26
    const cellW = canvas.width / COLS
    const cellH = canvas.height / ROWS

    const getColor = (row) => {
      const t = row / ROWS
      if (t < 0.333) return '#009A44'
      if (t < 0.666) return '#000000'
      return '#D21034'
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.04

      for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
          const waveX = Math.sin(col * 0.3 - time * 2) * 6
          const waveY = Math.cos(col * 0.2 - time * 1.5) * 3
          const x = col * cellW
          const y = row * cellH + waveX + waveY

          const brightness = 0.85 + Math.sin(col * 0.3 - time * 2) * 0.15
          const baseColor = getColor(row)

          const r = parseInt(baseColor.slice(1, 3), 16)
          const g = parseInt(baseColor.slice(3, 5), 16)
          const b = parseInt(baseColor.slice(5, 7), 16)

          ctx.fillStyle = `rgb(${Math.floor(r * brightness)},${Math.floor(g * brightness)},${Math.floor(b * brightness)})`
          ctx.fillRect(x, y, cellW + 1, cellH + 1)
        }
      }

      // Yellow stripes
      const stripe1Y = canvas.height * 0.333 + Math.sin(-time * 2) * 6
      const stripe2Y = canvas.height * 0.666 + Math.sin(-time * 2) * 6
      ctx.fillStyle = '#FCE300'
      ctx.fillRect(0, stripe1Y - 2, canvas.width, 5)
      ctx.fillRect(0, stripe2Y - 2, canvas.width, 5)

      // Red triangle
      ctx.beginPath()
      const triWave = Math.sin(-time * 2) * 4
      ctx.moveTo(0, triWave)
      ctx.lineTo(0, canvas.height + triWave)
      ctx.lineTo(canvas.width * 0.35, canvas.height / 2)
      ctx.closePath()
      ctx.fillStyle = '#D21034'
      ctx.fill()

      // Star in triangle
      const cx = canvas.width * 0.12
      const cy = canvas.height / 2 + triWave * 0.3
      drawStar(ctx, cx, cy, 5, 14, 6, '#FCE300')

      // Flag pole
      ctx.fillStyle = 'linear-gradient'
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
      grad.addColorStop(0, '#c9a227')
      grad.addColorStop(1, '#6b4c11')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, 6, canvas.height)

      // Shine overlay
      const shine = ctx.createLinearGradient(0, 0, canvas.width, 0)
      shine.addColorStop(0, 'rgba(255,255,255,0)')
      shine.addColorStop(0.3 + Math.sin(time) * 0.1, 'rgba(255,255,255,0.08)')
      shine.addColorStop(1, 'rgba(0,0,0,0.2)')
      ctx.fillStyle = shine
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="rounded-sm"
        style={{
          width: '320px',
          height: '210px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,154,68,0.15)',
          filter: 'drop-shadow(0 0 20px rgba(0,154,68,0.2))',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-16px',
          left: '10%',
          right: '10%',
          height: '16px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
        }}
      />
    </div>
  )
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR, color) {
  let rot = (Math.PI / 2) * 3
  const step = Math.PI / spikes
  ctx.beginPath()
  ctx.moveTo(cx, cy - outerR)
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      cx + Math.cos(rot) * outerR,
      cy + Math.sin(rot) * outerR
    )
    rot += step
    ctx.lineTo(
      cx + Math.cos(rot) * innerR,
      cy + Math.sin(rot) * innerR
    )
    rot += step
  }
  ctx.lineTo(cx, cy - outerR)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}