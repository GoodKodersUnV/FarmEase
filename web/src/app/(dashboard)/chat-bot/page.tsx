'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Mic, MicOff, Play, Pause, Bot, User, Loader2, Tractor, Wheat, Sun, Cloud } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function FarmerAIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm FarmerAI, your agricultural assistant. How can I help you today? Feel free to ask about crop management, weather forecasts, or any farming-related questions.",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null)
  
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const speechSynthRef = useRef<SpeechSynthesis | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    speechSynthRef.current = window.speechSynthesis
    return () => {
      if (speechSynthRef.current) {
        speechSynthRef.current.cancel()
      }
    }
  }, [])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Replace with your Gemini API call
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      })

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      // Handle error appropriately
    } finally {
      setIsLoading(false)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const audioChunks: Blob[] = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        // Convert audio to text using Web Speech API
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)()
        recognition.continuous = true
        recognition.lang = 'en-US'
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript
          setInputMessage(transcript)
        }
        
        recognition.start()
      }

      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const playMessage = (message: Message, index: number) => {
    if (speechSynthRef.current) {
      if (currentPlayingIndex === index) {
        speechSynthRef.current.cancel()
        setCurrentPlayingIndex(null)
        return
      }

      speechSynthRef.current.cancel()
      const utterance = new SpeechSynthesisUtterance(message.content)
      utterance.onend = () => setCurrentPlayingIndex(null)
      utteranceRef.current = utterance
      speechSynthRef.current.speak(utterance)
      setCurrentPlayingIndex(index)
    }
  }

  const stopPlayback = () => {
    if (speechSynthRef.current) {
      speechSynthRef.current.cancel()
      setCurrentPlayingIndex(null)
    }
  }

  return (
    <div className="h-[91.5vh] max-w-4xl mx-auto p-4">
      <Card className="h-full flex flex-col bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">FarmerAI Assistant</CardTitle>
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="FarmerAI" />
            <AvatarFallback><Tractor className="h-6 w-6" /></AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="flex-1 p-4 flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-start gap-3 p-4 rounded-lg",
                    message.role === 'user' 
                      ? "bg-primary-foreground ml-auto" 
                      : "bg-white dark:bg-gray-800"
                  )}
                  style={{ maxWidth: '80%' }}
                >
                  <Avatar className={cn(
                    "h-8 w-8",
                    message.role === 'user' ? "bg-primary" : "bg-green-500"
                  )}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Tractor className="h-4 w-4" />
                    )}
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => playMessage(message, index)}
                            >
                              {currentPlayingIndex === index ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {currentPlayingIndex === index ? 'Pause' : 'Play'} message
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex items-center gap-2 pt-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "flex-shrink-0",
                      isRecording && "text-red-500 border-red-500"
                    )}
                    onClick={isRecording ? stopRecording : startRecording}
                  >
                    {isRecording ? (
                      <MicOff className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isRecording ? 'Stop' : 'Start'} voice input
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Input
              placeholder="Ask about crops, weather, or farming techniques..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              // onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="flex-shrink-0 bg-green-600 hover:bg-green-700"
                    onClick={handleSend}
                    disabled={!inputMessage.trim() || isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Send message
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}