'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { X, MessageCircle, Send } from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

interface QuickQuestion {
  id: string
  emoji: string
  question: string
  answer: string
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'how-it-works',
    emoji: '🚀',
    question: 'How does this work?',
    answer: `UniBridge Ghana simplifies university applications! Here's how:

1. **Create Your Profile** - Add your academic info, WASSCE results, and preferences
2. **Discover Universities** - Browse 100+ institutions with smart matching
3. **Apply Once** - Use our common application to apply to multiple universities
4. **Track Progress** - Monitor application status and deadlines in real-time
5. **Get Accepted** - Receive decisions and choose your perfect university!

Our platform connects you to public and private universities across all 10 regions of Ghana.`
  },
  {
    id: 'what-learn',
    emoji: '🎭',
    question: 'What will I learn?',
    answer: `Through UniBridge Ghana, you'll discover:

📚 **University Options**
- 100+ accredited institutions
- Program requirements and details
- Tuition fees and scholarship opportunities

🎯 **Application Process**
- How to complete strong applications
- Essay writing tips and guidance
- Document preparation requirements

💡 **Career Insights**
- Program outcomes and career paths
- Industry connections and opportunities
- Graduate employment statistics

🏆 **Success Strategies**
- Application timeline management
- Interview preparation
- Financial aid navigation`
  },
  {
    id: 'data-safety',
    emoji: '🔒',
    question: 'Is my data safe?',
    answer: `Absolutely! Your privacy and security are our top priorities:

🛡️ **Data Protection**
- End-to-end encryption for all personal information
- Secure servers hosted in Ghana
- GDPR-compliant data handling

🔐 **Access Control**
- Multi-factor authentication available
- University partners access only application-relevant data
- You control what information to share

📋 **Transparency**
- Clear privacy policy in English and local languages
- Regular security audits and updates
- Data deletion options available

🤝 **Trust**
- Endorsed by Ghana Education Service
- Used by 1000+ students successfully
- Zero data breaches since launch`
  }
]

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m your UniBridge assistant. I\'m here to help you navigate university applications in Ghana. Feel free to ask me anything or click on the quick questions below!',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleQuickQuestion = (question: QuickQuestion) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: question.question,
      timestamp: new Date()
    }

    // Add bot response
    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: question.answer,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: "Thanks for your question! I'm still learning. For specific inquiries, please contact our support team at support@unibridge.gh or call +233-XX-XXXXXXX.",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage, botMessage])
    setInputMessage('')
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div>
                <CardTitle className="text-lg">UniBridge Assistant</CardTitle>
                <p className="text-emerald-100 text-sm">Online now</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-emerald-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="grid gap-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuickQuestion(question)}
                  className="flex items-center gap-3 p-3 bg-white hover:bg-emerald-50 rounded-xl border border-gray-200 transition-all duration-200 text-left group"
                >
                  <span className="text-lg">{question.emoji}</span>
                  <span className="text-gray-700 text-sm group-hover:text-emerald-700 transition-colors">
                    {question.question}
                  </span>
                  <MessageCircle className="w-4 h-4 text-emerald-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatBot
