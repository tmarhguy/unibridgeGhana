'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface EssayEditorProps {
  essayType: 'personal_statement' | 'why_university' | 'leadership' | 'challenge'
  universityName?: string
  maxWords?: number
  minWords?: number
  prompt?: string
  placeholder?: string
  initialContent?: string
  onSave?: (content: string, title: string) => void
  autoSave?: boolean
}

const ESSAY_PROMPTS = {
  personal_statement: {
    title: "Personal Statement",
    prompt: "Tell us about yourself. What makes you unique? What are your goals, values, and aspirations? How have your experiences shaped who you are today?",
    tips: [
      "Be authentic and genuine in your writing",
      "Show, don't just tell - use specific examples",
      "Connect your experiences to your future goals",
      "Avoid clichés and generic statements",
      "Make sure it's about YOU, not just your accomplishments"
    ],
    examples: [
      "Growing up in a small village in the Northern Region taught me...",
      "When my family's shop burned down, I learned the value of resilience...",
      "As the first in my family to attend university, I understand..."
    ]
  },
  why_university: {
    title: "Why This University?",
    prompt: "Why do you want to attend this specific university? What draws you to this institution and how will you contribute to the campus community?",
    tips: [
      "Research specific programs, professors, or opportunities",
      "Mention unique aspects of the university",
      "Explain how you'll contribute to campus life",
      "Connect your goals with what the university offers",
      "Be specific - avoid generic reasons"
    ],
    examples: [
      "Professor Kwame Asante's research in renewable energy aligns with...",
      "The University's commitment to community service through...",
      "Having visited the campus during Open Day, I was impressed by..."
    ]
  },
  leadership: {
    title: "Leadership Experience",
    prompt: "Describe a time when you demonstrated leadership. What did you learn from this experience and how will you apply these lessons in university?",
    tips: [
      "Choose a specific example, not general leadership qualities",
      "Explain the challenge or situation you faced",
      "Describe your actions and decision-making process",
      "Reflect on what you learned",
      "Connect to how you'll lead in university"
    ],
    examples: [
      "As head prefect, I had to mediate a conflict between...",
      "When our debate team was struggling, I organized...",
      "Leading the school's environmental club taught me..."
    ]
  },
  challenge: {
    title: "Overcoming Challenges",
    prompt: "Describe a significant challenge you've faced and how you overcame it. What did this experience teach you about yourself?",
    tips: [
      "Be honest about the challenge, but focus on your response",
      "Show personal growth and resilience",
      "Explain specific actions you took",
      "Reflect on lessons learned",
      "Demonstrate maturity in your perspective"
    ],
    examples: [
      "When my father lost his job during my WASSCE year...",
      "Struggling with mathematics until I changed my approach...",
      "Balancing school responsibilities with caring for my siblings..."
    ]
  }
}

const EssayEditor: React.FC<EssayEditorProps> = ({
  essayType,
  universityName,
  maxWords = 650,
  minWords = 250,
  prompt,
  placeholder,
  initialContent = '',
  onSave,
  autoSave = true
}) => {
  const [content, setContent] = useState(initialContent)
  const [title, setTitle] = useState('')
  const [wordCount, setWordCount] = useState(0)
  const [characterCount, setCharacterCount] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [showPromptHelp, setShowPromptHelp] = useState(false)
  const [selectedTip, setSelectedTip] = useState(0)
  
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>()

  const essayData = ESSAY_PROMPTS[essayType] || {
    title: "Essay",
    prompt: prompt || "Write your essay here...",
    tips: ["Write clearly and concisely", "Use specific examples", "Be authentic"],
    examples: []
  }

  // Calculate word and character count
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0)
    setWordCount(words.length)
    setCharacterCount(content.length)
  }, [content])

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && content && content !== initialContent) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        handleSave()
        setIsTyping(false)
      }, 2000) // Auto-save after 2 seconds of inactivity
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [content, title])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setIsTyping(true)
  }

  const handleSave = () => {
    if (onSave) {
      onSave(content, title)
    }
    setLastSaved(new Date())
    console.log('Essay saved:', { title, content, wordCount })
  }

  const getWordCountColor = () => {
    if (wordCount < minWords) return 'text-red-600'
    if (wordCount > maxWords) return 'text-red-600'
    if (wordCount >= minWords && wordCount <= maxWords * 0.9) return 'text-green-600'
    return 'text-orange-600'
  }

  const getProgressPercentage = () => {
    return Math.min((wordCount / maxWords) * 100, 100)
  }

  const formatPrompt = (promptText: string) => {
    if (universityName) {
      return promptText.replace(/this university/gi, universityName)
        .replace(/this institution/gi, universityName)
    }
    return promptText
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <span className="text-2xl">📝</span>
                {essayData.title}
                {universityName && (
                  <Badge variant="outline" className="text-sm">
                    for {universityName}
                  </Badge>
                )}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {formatPrompt(essayData.prompt)}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setShowPromptHelp(!showPromptHelp)}
                className="text-blue-600 border-blue-600"
              >
                💡 Writing Tips
              </Button>
              {lastSaved && (
                <div className="text-xs text-gray-500 text-right">
                  <div>Last saved</div>
                  <div>{lastSaved.toLocaleTimeString()}</div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Writing Tips Sidebar */}
        {showPromptHelp && (
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {essayData.tips.map((tip: string, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedTip === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTip(index)}
                  >
                    <div className="text-sm font-medium text-gray-900">{tip}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {essayData.examples.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Example Openings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {essayData.examples.map((example: string, index: number) => (
                    <div
                      key={index}
                      className="p-3 bg-gray-50 rounded-lg border-l-4 border-green-500"
                    >
                      <div className="text-sm italic text-gray-700">"{example}"</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Main Editor */}
        <div className={showPromptHelp ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <Card>
            <CardHeader>
              <div className="space-y-4">
                {/* Essay Title */}
                <div>
                  <Label htmlFor="essay-title">Essay Title (Optional)</Label>
                  <Input
                    id="essay-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your essay a title..."
                    className="mt-1"
                  />
                </div>

                {/* Word Count Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Progress</Label>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={getWordCountColor()}>
                        {wordCount} / {maxWords} words
                      </span>
                      <span className="text-gray-500">
                        {characterCount} characters
                      </span>
                      {isTyping && (
                        <span className="text-blue-600 flex items-center gap-1">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          Typing...
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        wordCount < minWords ? 'bg-red-500' :
                        wordCount > maxWords ? 'bg-red-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Minimum: {minWords} words</span>
                    <span>Maximum: {maxWords} words</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Main Text Editor */}
                <div>
                  <Textarea
                    ref={textareaRef}
                    value={content}
                    onChange={handleContentChange}
                    placeholder={placeholder || `Start writing your ${essayData.title.toLowerCase()} here...\n\nRemember to:\n• Be authentic and specific\n• Use concrete examples\n• Show your personality\n• Connect to your goals`}
                    className="min-h-[400px] text-base leading-relaxed resize-none"
                    style={{ lineHeight: '1.6' }}
                  />
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        wordCount >= minWords && wordCount <= maxWords 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}></div>
                      <span>Word Count {wordCount >= minWords && wordCount <= maxWords ? 'Good' : 'Check'}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${content.length > 50 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Content Started</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${lastSaved ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span>Auto-saved</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSave}>
                      💾 Save Draft
                    </Button>
                    <Button 
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={wordCount < minWords || wordCount > maxWords}
                    >
                      ✅ Mark Complete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EssayEditor
