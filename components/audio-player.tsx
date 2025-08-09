"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Minimize2, X } from "lucide-react"

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  const tracks = [
    {
      title: "Midnight Vibes",
      artist: "EventPro Productions",
      duration: "3:45",
      genre: "Electronic",
    },
    {
      title: "Wedding Dreams",
      artist: "EventPro Productions",
      duration: "4:12",
      genre: "Ambient",
    },
    {
      title: "Corporate Energy",
      artist: "EventPro Productions",
      duration: "2:58",
      genre: "Upbeat",
    },
  ]

  // Check if player was previously closed
  useEffect(() => {
    const playerClosed = localStorage.getItem("audioPlayerClosed")
    if (playerClosed === "true") {
      setIsVisible(false)
    }
  }, [])

  // Audio visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 300
    canvas.height = 60

    let animationId: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create waveform visualization
      const bars = 50
      const barWidth = canvas.width / bars

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * (isPlaying ? 40 : 10) + 5
        const x = i * barWidth
        const y = (canvas.height - barHeight) / 2

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, "#8B5CF6")
        gradient.addColorStop(1, "#EC4899")

        ctx.fillStyle = gradient
        ctx.fillRect(x, y, barWidth - 1, barHeight)
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isPlaying, isVisible])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const closePlayer = () => {
    setIsPlaying(false)
    setIsVisible(false)
    // Remember that the user closed the player
    localStorage.setItem("audioPlayerClosed", "true")
  }

  const resetPlayerVisibility = () => {
    // Function to reset player visibility (can be called from dev tools or other components)
    localStorage.removeItem("audioPlayerClosed")
    setIsVisible(true)
  }

  // Add a way to reset the player visibility (for development/testing)
  useEffect(() => {
    // @ts-ignore - Add to window for debugging
    window.resetAudioPlayer = resetPlayerVisibility
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 right-4 z-40"
        >
          <Card className="bg-black/80 backdrop-blur-md border-white/20 overflow-hidden">
            <CardContent className="p-0">
              <AnimatePresence mode="wait">
                {isMinimized ? (
                  <motion.div
                    key="minimized"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                      </Button>
                      <div className="text-white">
                        <p className="text-sm font-medium">{tracks[currentTrack].title}</p>
                        <p className="text-xs text-white/60">{tracks[currentTrack].artist}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsMinimized(false)}
                        className="text-white/60 hover:text-white"
                      >
                        <Minimize2 className="w-4 h-4 rotate-180" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={closePlayer}
                        className="text-white/60 hover:text-white"
                        title="Fermer le lecteur"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="w-80"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">Nos Créations</h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setIsMinimized(true)}
                            className="text-white/60 hover:text-white"
                            title="Réduire"
                          >
                            <Minimize2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={closePlayer}
                            className="text-white/60 hover:text-white"
                            title="Fermer le lecteur"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Waveform */}
                    <div className="p-4 bg-black/40">
                      <canvas ref={canvasRef} className="w-full h-15 rounded" />
                    </div>

                    {/* Track Info */}
                    <div className="p-4">
                      <h4 className="text-white font-medium">{tracks[currentTrack].title}</h4>
                      <p className="text-white/60 text-sm">{tracks[currentTrack].artist}</p>
                      <div className="flex items-center justify-between text-xs text-white/40 mt-2">
                        <span>{formatTime(currentTime)}</span>
                        <span>{tracks[currentTrack].duration}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="p-4 border-t border-white/10">
                      <div className="flex items-center justify-center space-x-4 mb-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={prevTrack}
                          className="text-white/60 hover:text-white"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={togglePlay}
                          className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={nextTrack}
                          className="text-white/60 hover:text-white"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Volume */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={toggleMute}
                          className="text-white/60 hover:text-white"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-200"
                            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
