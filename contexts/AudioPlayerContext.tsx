'use client'

import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'

export interface Track {
  id: string
  title: string
  artistName: string
  albumTitle: string
  albumSlug: string
  duration: string
  audioUrl?: string // Optional - will use placeholder if not provided
  coverGradient: {
    primary: string
    secondary: string
  }
}

export interface QueuedTrack extends Track {
  queueIndex: number
}

interface AudioPlayerContextType {
  // Current track state
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  
  // Queue state
  queue: QueuedTrack[]
  currentIndex: number
  
  // Player visibility
  isVisible: boolean
  isExpanded: boolean
  
  // Controls
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  
  // Queue controls
  playTrack: (track: Track, clearQueue?: boolean) => void
  playAlbum: (tracks: Track[], startIndex?: number) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  playNext: () => void
  playPrevious: () => void
  
  // UI controls
  showPlayer: () => void
  hidePlayer: () => void
  toggleExpand: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  // Audio element ref
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Current track state
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  
  // Queue state
  const [queue, setQueue] = useState<QueuedTrack[]>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  
  // Player visibility
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  // Initialize audio element on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume
      
      // Set up event listeners
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0)
      })
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0)
      })
      
      audioRef.current.addEventListener('ended', () => {
        // Auto-play next track in queue
        if (currentIndex < queue.length - 1) {
          playNext()
        } else {
          setIsPlaying(false)
        }
      })
      
      audioRef.current.addEventListener('error', () => {
        console.error('Audio error - continuing without audio')
        // Still allow UI to show playing state for demo purposes
      })
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  // Parse duration string to seconds
  const parseDuration = (durationStr: string): number => {
    const parts = durationStr.split(':').map(Number)
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1]
    }
    return 0
  }

  // Controls
  const play = useCallback(() => {
    if (audioRef.current && currentTrack?.audioUrl) {
      audioRef.current.play().catch(() => {
        // Silently handle autoplay restrictions
      })
    }
    setIsPlaying(true)
  }, [currentTrack])

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
    }
    setIsPlaying(false)
  }, [])

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, play, pause])

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
    setCurrentTime(time)
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)))
    setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev)
  }, [])

  // Queue controls
  const playTrack = useCallback((track: Track, clearQueueFirst = false) => {
    if (clearQueueFirst) {
      setQueue([{ ...track, queueIndex: 0 }])
      setCurrentIndex(0)
    } else {
      // Add to queue and play immediately
      const newIndex = queue.length
      setQueue(prev => [...prev, { ...track, queueIndex: newIndex }])
      setCurrentIndex(newIndex)
    }
    
    setCurrentTrack(track)
    setIsVisible(true)
    
    // Set duration from track data
    setDuration(parseDuration(track.duration))
    setCurrentTime(0)
    
    // Load and play audio if URL provided
    if (track.audioUrl && audioRef.current) {
      audioRef.current.src = track.audioUrl
      audioRef.current.play().catch(() => {
        // Handle autoplay restrictions
      })
    }
    
    setIsPlaying(true)
  }, [queue.length])

  const playAlbum = useCallback((tracks: Track[], startIndex = 0) => {
    const queuedTracks = tracks.map((track, index) => ({
      ...track,
      queueIndex: index,
    }))
    
    setQueue(queuedTracks)
    setCurrentIndex(startIndex)
    
    const firstTrack = tracks[startIndex]
    setCurrentTrack(firstTrack)
    setIsVisible(true)
    
    // Set duration from track data
    setDuration(parseDuration(firstTrack.duration))
    setCurrentTime(0)
    
    // Load and play audio if URL provided
    if (firstTrack.audioUrl && audioRef.current) {
      audioRef.current.src = firstTrack.audioUrl
      audioRef.current.play().catch(() => {})
    }
    
    setIsPlaying(true)
  }, [])

  const addToQueue = useCallback((track: Track) => {
    setQueue(prev => [...prev, { ...track, queueIndex: prev.length }])
    
    // If nothing is playing, start playing this track
    if (!currentTrack) {
      playTrack(track, false)
    }
  }, [currentTrack, playTrack])

  const removeFromQueue = useCallback((index: number) => {
    setQueue(prev => {
      const newQueue = prev.filter((_, i) => i !== index)
      return newQueue.map((track, i) => ({ ...track, queueIndex: i }))
    })
    
    if (index < currentIndex) {
      setCurrentIndex(prev => prev - 1)
    } else if (index === currentIndex) {
      // If removing current track, play next
      if (queue.length > 1) {
        const nextTrack = queue[index + 1] || queue[index - 1]
        if (nextTrack) {
          setCurrentTrack(nextTrack)
          setDuration(parseDuration(nextTrack.duration))
          setCurrentTime(0)
        }
      } else {
        setCurrentTrack(null)
        setIsPlaying(false)
        setIsVisible(false)
      }
    }
  }, [currentIndex, queue])

  const clearQueue = useCallback(() => {
    setQueue([])
    setCurrentIndex(-1)
    setCurrentTrack(null)
    setIsPlaying(false)
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
  }, [])

  const playNext = useCallback(() => {
    if (currentIndex < queue.length - 1) {
      const nextTrack = queue[currentIndex + 1]
      setCurrentIndex(prev => prev + 1)
      setCurrentTrack(nextTrack)
      setDuration(parseDuration(nextTrack.duration))
      setCurrentTime(0)
      
      if (nextTrack.audioUrl && audioRef.current) {
        audioRef.current.src = nextTrack.audioUrl
        audioRef.current.play().catch(() => {})
      }
      
      setIsPlaying(true)
    }
  }, [currentIndex, queue])

  const playPrevious = useCallback(() => {
    // If more than 3 seconds in, restart current track
    if (currentTime > 3) {
      seek(0)
      return
    }
    
    if (currentIndex > 0) {
      const prevTrack = queue[currentIndex - 1]
      setCurrentIndex(prev => prev - 1)
      setCurrentTrack(prevTrack)
      setDuration(parseDuration(prevTrack.duration))
      setCurrentTime(0)
      
      if (prevTrack.audioUrl && audioRef.current) {
        audioRef.current.src = prevTrack.audioUrl
        audioRef.current.play().catch(() => {})
      }
      
      setIsPlaying(true)
    } else {
      seek(0)
    }
  }, [currentIndex, currentTime, queue, seek])

  // UI controls
  const showPlayer = useCallback(() => setIsVisible(true), [])
  const hidePlayer = useCallback(() => {
    setIsVisible(false)
    setIsExpanded(false)
    pause()
  }, [pause])
  const toggleExpand = useCallback(() => setIsExpanded(prev => !prev), [])

  return (
    <AudioPlayerContext.Provider
      value={{
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
        play,
        pause,
        toggle,
        seek,
        setVolume,
        toggleMute,
        playTrack,
        playAlbum,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playNext,
        playPrevious,
        showPlayer,
        hidePlayer,
        toggleExpand,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
