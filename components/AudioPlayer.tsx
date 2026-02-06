'use client'

import { useAudioPlayer } from '@/contexts/AudioPlayerContext'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Animated visualization bars
function VisualizationBars({ isPlaying, barCount = 5 }: { isPlaying: boolean; barCount?: number }) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {Array.from({ length: barCount }).map((_, i) => (
        <div
          key={i}
          className={`w-1 bg-amber-500 rounded-full transition-all ${
            isPlaying ? 'animate-equalizer' : 'h-1'
          }`}
          style={{
            animationDelay: `${i * 0.1}s`,
            height: isPlaying ? undefined : '4px',
          }}
        />
      ))}
      <style jsx>{`
        @keyframes equalizer {
          0%, 100% { height: 4px; }
          25% { height: 12px; }
          50% { height: 6px; }
          75% { height: 16px; }
        }
        .animate-equalizer {
          animation: equalizer 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Mini player component (collapsed state)
function MiniPlayer({ 
  currentTrack, 
  isPlaying, 
  toggle, 
  onExpand 
}: { 
  currentTrack: NonNullable<ReturnType<typeof useAudioPlayer>['currentTrack']>
  isPlaying: boolean
  toggle: () => void
  onExpand: () => void
}) {
  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-3 flex items-center gap-3 cursor-pointer hover:bg-zinc-800/95 transition-colors group"
      onClick={onExpand}
    >
      {/* Album art with visualization */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center relative flex-shrink-0"
        style={{ 
          background: `linear-gradient(135deg, ${currentTrack.coverGradient.primary}, ${currentTrack.coverGradient.secondary})` 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <VisualizationBars isPlaying={isPlaying} barCount={3} />
        </div>
      </div>
      
      {/* Track info */}
      <div className="min-w-0 max-w-[140px]">
        <p className="text-white font-medium text-sm truncate">{currentTrack.title}</p>
        <p className="text-zinc-500 text-xs truncate">{currentTrack.artistName}</p>
      </div>
      
      {/* Play/Pause button */}
      <button 
        onClick={(e) => {
          e.stopPropagation()
          toggle()
        }}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform flex-shrink-0"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-5 h-5 text-zinc-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      
      {/* Expand indicator */}
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </div>
    </div>
  )
}

export function AudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    queue,
    currentIndex,
    isVisible,
    isExpanded,
    toggle,
    seek,
    setVolume,
    toggleMute,
    playNext,
    playPrevious,
    toggleExpand,
    hidePlayer,
  } = useAudioPlayer()

  const progressRef = useRef<HTMLDivElement>(null)
  const volumeRef = useRef<HTMLDivElement>(null)
  const [isDraggingProgress, setIsDraggingProgress] = useState(false)
  const [isDraggingVolume, setIsDraggingVolume] = useState(false)
  const [displayTime, setDisplayTime] = useState(currentTime)
  const [isMiniMode, setIsMiniMode] = useState(false)
  
  // Simulate progress for demo when no actual audio
  useEffect(() => {
    if (isPlaying && duration > 0) {
      const interval = setInterval(() => {
        setDisplayTime(prev => {
          if (prev >= duration) {
            playNext()
            return 0
          }
          return prev + 0.25
        })
      }, 250)
      return () => clearInterval(interval)
    }
  }, [isPlaying, duration, playNext])

  // Sync display time with actual time when not simulating
  useEffect(() => {
    if (currentTime > 0) {
      setDisplayTime(currentTime)
    }
  }, [currentTime])

  // Reset display time when track changes
  useEffect(() => {
    setDisplayTime(0)
  }, [currentTrack?.id])

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const newTime = percent * duration
    seek(newTime)
    setDisplayTime(newTime)
  }

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return
    const rect = volumeRef.current.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    setVolume(Math.max(0, Math.min(1, percent)))
  }

  if (!isVisible || !currentTrack) return null

  // Render mini player mode
  if (isMiniMode) {
    return (
      <>
        <MiniPlayer 
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          toggle={toggle}
          onExpand={() => setIsMiniMode(false)}
        />
      </>
    )
  }

  const progress = duration > 0 ? (displayTime / duration) * 100 : 0
  const effectiveVolume = isMuted ? 0 : volume

  return (
    <>
      {/* Expanded queue overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={toggleExpand}
        />
      )}

      {/* Main player bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-xl border-t border-zinc-800 transition-all duration-300 animate-player-slide-up ${
        isExpanded ? 'h-96' : 'h-20'
      }`}>
        {/* Expanded queue view */}
        {isExpanded && (
          <div className="h-72 overflow-y-auto p-4 border-b border-zinc-800">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Queue</h3>
              {queue.length === 0 ? (
                <p className="text-zinc-500">No tracks in queue</p>
              ) : (
                <div className="space-y-2">
                  {queue.map((track, index) => (
                    <div 
                      key={`${track.id}-${index}`}
                      className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                        index === currentIndex 
                          ? 'bg-amber-500/10 border border-amber-500/30' 
                          : 'hover:bg-zinc-800/50'
                      }`}
                    >
                      <div className="w-8 text-center">
                        {index === currentIndex && isPlaying ? (
                          <VisualizationBars isPlaying={true} barCount={3} />
                        ) : (
                          <span className="text-zinc-500 text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${track.coverGradient.primary}, ${track.coverGradient.secondary})` 
                        }}
                      >
                        <div className="w-4 h-3 bg-zinc-900/50 rounded-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${index === currentIndex ? 'text-amber-500' : 'text-white'}`}>
                          {track.title}
                        </p>
                        <p className="text-sm text-zinc-500 truncate">{track.artistName}</p>
                      </div>
                      <span className="text-sm text-zinc-500">{track.duration}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Player controls */}
        <div className="h-20 flex items-center px-4 gap-4">
          {/* Track info with visualization */}
          <div className="flex items-center gap-3 min-w-[180px] max-w-[300px]">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg relative overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, ${currentTrack.coverGradient.primary}, ${currentTrack.coverGradient.secondary})` 
              }}
            >
              {/* Cassette spools */}
              <div className="w-5 h-3.5 bg-zinc-900/50 rounded-sm flex items-center justify-center gap-1">
                <div className={`w-1.5 h-1.5 border border-zinc-600 rounded-full ${isPlaying ? 'animate-spin' : ''}`} />
                <div className={`w-1.5 h-1.5 border border-zinc-600 rounded-full ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
              {/* Visualization overlay */}
              {isPlaying && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <VisualizationBars isPlaying={true} barCount={4} />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <Link 
                href={`/albums/${currentTrack.albumSlug}`}
                className="text-white font-medium text-sm truncate block hover:text-amber-500 transition-colors"
              >
                {currentTrack.title}
              </Link>
              <p className="text-zinc-500 text-xs truncate">{currentTrack.artistName}</p>
            </div>
          </div>

          {/* Center controls */}
          <div className="flex-1 flex flex-col items-center gap-1 max-w-2xl">
            {/* Control buttons */}
            <div className="flex items-center gap-4">
              <button 
                onClick={playPrevious}
                className="text-zinc-400 hover:text-white transition-colors p-2"
                title="Previous"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              <button 
                onClick={toggle}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg className="w-5 h-5 text-zinc-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-zinc-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              <button 
                onClick={playNext}
                className="text-zinc-400 hover:text-white transition-colors p-2"
                title="Next"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                </svg>
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full flex items-center gap-2">
              <span className="text-xs text-zinc-500 w-10 text-right">
                {formatTime(displayTime)}
              </span>
              <div 
                ref={progressRef}
                className="flex-1 h-1 bg-zinc-700 rounded-full cursor-pointer group"
                onClick={handleProgressClick}
                onMouseDown={() => setIsDraggingProgress(true)}
                onMouseUp={() => setIsDraggingProgress(false)}
              >
                <div 
                  className="h-full bg-amber-500 rounded-full relative transition-all"
                  style={{ width: `${progress}%` }}
                >
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow transition-opacity ${
                    isDraggingProgress ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
              <span className="text-xs text-zinc-500 w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3 min-w-[180px] justify-end">
            {/* Mini mode toggle */}
            <button 
              onClick={() => setIsMiniMode(true)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              title="Mini player"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Queue button */}
            <button 
              onClick={toggleExpand}
              className={`p-2 rounded-lg transition-colors ${
                isExpanded ? 'text-amber-500 bg-amber-500/10' : 'text-zinc-400 hover:text-white'
              }`}
              title="Queue"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white transition-colors p-1"
              >
                {effectiveVolume === 0 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : effectiveVolume < 0.5 ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
              <div 
                ref={volumeRef}
                className="w-20 h-1 bg-zinc-700 rounded-full cursor-pointer group"
                onClick={handleVolumeClick}
                onMouseDown={() => setIsDraggingVolume(true)}
                onMouseUp={() => setIsDraggingVolume(false)}
              >
                <div 
                  className="h-full bg-zinc-400 rounded-full relative transition-all"
                  style={{ width: `${effectiveVolume * 100}%` }}
                >
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow transition-opacity ${
                    isDraggingVolume ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`} />
                </div>
              </div>
            </div>

            {/* Close button */}
            <button 
              onClick={hidePlayer}
              className="text-zinc-400 hover:text-white transition-colors p-2"
              title="Close player"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind player */}
      <div className="h-20" />

      <style jsx>{`
        @keyframes player-slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-player-slide-up {
          animation: player-slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  )
}
