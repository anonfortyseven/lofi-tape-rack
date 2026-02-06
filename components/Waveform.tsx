'use client'

import { useEffect, useState } from 'react'

interface WaveformProps {
  barCount?: number
  color?: string
  secondaryColor?: string
  isPlaying?: boolean
  className?: string
}

export function Waveform({ 
  barCount = 32, 
  color = '#F59E0B',
  secondaryColor,
  isPlaying = true,
  className = ''
}: WaveformProps) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    // Initialize bars with random heights
    setBars(Array.from({ length: barCount }, () => Math.random() * 0.6 + 0.2))
  }, [barCount])

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setBars(prev => prev.map((height, i) => {
        // Smooth random movement
        const change = (Math.random() - 0.5) * 0.2
        const newHeight = height + change
        // Keep within bounds
        return Math.max(0.15, Math.min(1, newHeight))
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className={`flex items-center justify-center gap-[2px] h-full ${className}`}>
      {bars.map((height, i) => {
        // Create gradient effect across bars if secondaryColor provided
        const barColor = secondaryColor 
          ? `linear-gradient(to top, ${color}, ${secondaryColor})`
          : color
        
        return (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-100 ease-out"
            style={{
              height: `${height * 100}%`,
              background: barColor,
              opacity: isPlaying ? 0.8 : 0.4,
              transform: isPlaying ? 'scaleY(1)' : 'scaleY(0.5)',
            }}
          />
        )
      })}
    </div>
  )
}

// Smaller inline waveform for list items
export function MiniWaveform({ 
  isPlaying = true,
  color = '#F59E0B'
}: { 
  isPlaying?: boolean
  color?: string 
}) {
  return (
    <div className="flex items-center gap-[1px] h-4">
      {[0.4, 0.7, 0.5, 0.9, 0.3].map((baseHeight, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full transition-all"
          style={{
            height: `${baseHeight * 100}%`,
            backgroundColor: color,
            animation: isPlaying ? `waveform-bounce ${0.4 + i * 0.1}s ease-in-out infinite alternate` : 'none',
            opacity: isPlaying ? 0.9 : 0.4,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes waveform-bounce {
          0% { transform: scaleY(0.5); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
