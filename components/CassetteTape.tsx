'use client'

import { useState } from 'react'

interface CassetteTapeProps {
  playing?: boolean
  color?: string
  secondaryColor?: string
  label?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

export function CassetteTape({
  playing = false,
  color = '#F59E0B',
  secondaryColor = '#D97706',
  label,
  className = '',
  size = 'md',
  onClick,
}: CassetteTapeProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const isSpinning = playing || isHovered

  const sizeClasses = {
    sm: 'w-32 h-20',
    md: 'w-48 h-32',
    lg: 'w-64 h-44',
  }

  const reelSizes = {
    sm: { reel: 'w-5 h-5', hub: 'w-2 h-2' },
    md: { reel: 'w-8 h-8', hub: 'w-3 h-3' },
    lg: { reel: 'w-11 h-11', hub: 'w-4 h-4' },
  }

  const labelSizes = {
    sm: 'text-[8px] px-2',
    md: 'text-xs px-4',
    lg: 'text-sm px-6',
  }

  return (
    <div
      className={`relative cursor-pointer transition-transform duration-300 ${isHovered ? 'scale-105' : ''} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Main cassette body */}
      <div
        className={`${sizeClasses[size]} rounded-lg relative overflow-hidden shadow-2xl`}
        style={{
          background: `linear-gradient(180deg, ${color} 0%, ${secondaryColor} 100%)`,
        }}
      >
        {/* Top screws */}
        <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-zinc-900/30" />
        <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-zinc-900/30" />
        
        {/* Label strip at top */}
        {label && (
          <div 
            className={`absolute top-2 left-1/2 -translate-x-1/2 bg-white/90 rounded ${labelSizes[size]} py-0.5 font-mono font-bold text-zinc-800 truncate max-w-[80%] text-center shadow-sm`}
          >
            {label}
          </div>
        )}

        {/* Window area */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900/90 rounded-lg flex items-center justify-center shadow-inner"
          style={{
            width: size === 'lg' ? '80%' : size === 'md' ? '75%' : '70%',
            height: size === 'lg' ? '55%' : size === 'md' ? '50%' : '45%',
          }}
        >
          {/* Tape reels */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
            {/* Left reel */}
            <div className="relative">
              <div
                className={`${reelSizes[size].reel} rounded-full border-2 border-zinc-600 bg-zinc-800 flex items-center justify-center`}
                style={{
                  animation: isSpinning ? 'spin 1.5s linear infinite' : 'none',
                }}
              >
                {/* Tape spokes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(0deg)' }} />
                  <div className="absolute w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(60deg)' }} />
                  <div className="absolute w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(120deg)' }} />
                </div>
                {/* Hub */}
                <div className={`${reelSizes[size].hub} rounded-full bg-zinc-500 relative z-10`} />
              </div>
              {/* Tape on reel */}
              <div 
                className="absolute inset-0 rounded-full border-4 border-amber-900/60"
                style={{
                  animation: isSpinning ? 'spin 1.5s linear infinite' : 'none',
                }}
              />
            </div>

            {/* Tape window reflection */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            {/* Right reel */}
            <div className="relative">
              <div
                className={`${reelSizes[size].reel} rounded-full border-2 border-zinc-600 bg-zinc-800 flex items-center justify-center`}
                style={{
                  animation: isSpinning ? 'spin 1.5s linear infinite' : 'none',
                }}
              >
                {/* Tape spokes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(0deg)' }} />
                  <div className="absolute w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(60deg)' }} />
                  <div className="absolute w-full h-0.5 bg-zinc-600/50" style={{ transform: 'rotate(120deg)' }} />
                </div>
                {/* Hub */}
                <div className={`${reelSizes[size].hub} rounded-full bg-zinc-500 relative z-10`} />
              </div>
              {/* Less tape on right reel (playing effect) */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-amber-900/40"
                style={{
                  animation: isSpinning ? 'spin 1.5s linear infinite' : 'none',
                }}
              />
            </div>
          </div>

          {/* Tape path between reels */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-amber-900/50 rounded-full" />
        </div>

        {/* Bottom tape head area */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-zinc-900/60 rounded-t flex items-center justify-center gap-1"
          style={{
            width: size === 'lg' ? '60%' : size === 'md' ? '55%' : '50%',
            height: size === 'lg' ? '18%' : '15%',
          }}
        >
          <div className="w-1 h-2 bg-zinc-600 rounded" />
          <div className="w-2 h-2 bg-zinc-500 rounded" />
          <div className="w-1 h-2 bg-zinc-600 rounded" />
        </div>

        {/* Glossy overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 pointer-events-none" />
        
        {/* Edge highlight */}
        <div className="absolute inset-0 rounded-lg border border-white/10" />
      </div>

      {/* Shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/40 blur-lg rounded-full -z-10"
        style={{ opacity: isHovered ? 0.6 : 0.4 }}
      />

      {/* Spinning animation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

// Hero variant with larger size and special effects
export function HeroCassette({
  color = '#F59E0B',
  secondaryColor = '#D97706',
}: {
  color?: string
  secondaryColor?: string
}) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-3xl opacity-30"
        style={{ background: color }}
      />
      <CassetteTape
        size="lg"
        color={color}
        secondaryColor={secondaryColor}
        playing={true}
        label="DRIFT TAPES"
      />
    </div>
  )
}
