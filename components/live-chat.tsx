'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Bot, User, X, HelpCircle, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Message {
  id: string
  sender: 'user' | 'bot'
  text: string
  timestamp: Date
  isTyping?: boolean
}

const FAQ_DATA = [
  {
    question: 'Thoi gian giao hang bao lau?',
    answer: 'Thoi gian giao hang tuy theo khu vuc:\n- Noi thanh TP.HCM/Ha Noi: 1-2 ngay\n- Cac tinh lan can: 2-3 ngay\n- Cac tinh xa: 3-5 ngay\n\nDon hang dat truoc 14h se duoc xu ly trong ngay.',
    keywords: ['giao hang', 'ship', 'van chuyen', 'thoi gian', 'bao lau'],
  },
  {
    question: 'San pham co bao hanh khong?',
    answer: 'Co! Chung toi cam ket:\n- Bao hanh chat luong 100%\n- Doi tra mien phi trong 7 ngay neu san pham loi\n- Hoan tien 100% neu khong hai long\n\nVui long giu lai hoa don va bao bi san pham.',
    keywords: ['bao hanh', 'doi tra', 'hoan tien', 'loi', 'chat luong'],
  },
  {
    question: 'Lam sao de doi/tra hang?',
    answer: 'De doi/tra hang, ban can:\n1. Lien he hotline 1900-xxxx\n2. Cung cap ma don hang va ly do\n3. Chung toi se gui nhan vien den lay hang\n4. Hoan tien trong 3-5 ngay lam viec\n\nDieu kien: San pham con nguyen tem mac, chua mo seal.',
    keywords: ['doi', 'tra', 'hoan', 'tra hang'],
  },
  {
    question: 'Co mien phi van chuyen khong?',
    answer: 'Co! Mien phi van chuyen cho don hang tu 500.000d.\n\nVoi don duoi 500.000d, phi ship:\n- Noi thanh: 20.000d\n- Ngoai thanh: 30.000d\n\nMa FREESHIP: Mien phi ship cho don tu 300.000d (ap dung den het thang).',
    keywords: ['mien phi', 'freeship', 'phi ship', 'van chuyen'],
  },
  {
    question: 'San pham co an toan khong?',
    answer: 'Hoan toan an toan! San pham cua chung toi:\n- 100% trai cay tu nhien\n- Khong chat bao quan\n- Khong pham mau nhan tao\n- Dat chuan VSATTP\n- Co giay chung nhan xuat xu',
    keywords: ['an toan', 'chat luong', 'nguon goc', 'chat bao quan', 'tu nhien'],
  },
  {
    question: 'Bao quan san pham the nao?',
    answer: 'De san pham ngon lau:\n- Bao quan noi kho rao, thoang mat\n- Tranh anh nang truc tiep\n- Sau khi mo, dong kin va su dung trong 7 ngay\n- Co the bao quan trong tu lanh de giu do gion',
    keywords: ['bao quan', 'luu tru', 'giu', 'han su dung'],
  },
]

const QUICK_REPLIES = [
  'Kiem tra don hang',
  'Ma giam gia',
  'Doi tra hang',
  'Lien he tu van',
]

function findBestAnswer(input: string): string | null {
  const normalizedInput = input.toLowerCase()
  
  for (const faq of FAQ_DATA) {
    if (faq.keywords.some(keyword => normalizedInput.includes(keyword))) {
      return faq.answer
    }
  }
  
  return null
}

export function LiveChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Xin chao! Toi la tro ly ao cua Hoa Qua Say Dac San. Toi co the giup ban:\n\n- Tra loi cau hoi ve san pham\n- Kiem tra tinh trang don hang\n- Ho tro doi/tra hang\n- Tu van chon san pham\n\nBan can ho tro gi?',
      timestamp: new Date(),
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showFaq, setShowFaq] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (text: string) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'bot',
        text,
        timestamp: new Date(),
      }])
      setIsTyping(false)
    }, 800 + Math.random() * 500)
  }

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date(),
    }])
    setInput('')
    setShowFaq(false)

    // Find answer
    const answer = findBestAnswer(messageText)
    
    if (answer) {
      addBotMessage(answer)
    } else {
      addBotMessage('Cam on ban da hoi. Toi chua hieu ro cau hoi cua ban. Ban co the:\n\n1. Chon mot trong cac cau hoi thuong gap ben duoi\n2. Hoac lien he truc tiep:\n   - Hotline: 1900-xxxx\n   - Email: support@driedfruit.vn\n\nNhan vien cua chung toi se ho tro ban trong thoi gian som nhat!')
    }
  }

  const handleFaqClick = (faq: typeof FAQ_DATA[0]) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: faq.question,
      timestamp: new Date(),
    }])
    setShowFaq(false)
    addBotMessage(faq.answer)
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0 gap-0">
        {/* Header */}
        <DialogHeader className="px-4 py-3 border-b bg-primary text-primary-foreground rounded-t-lg">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot size={24} />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-primary" />
              </div>
              <div>
                <p className="font-semibold text-sm">Tro ly ao</p>
                <p className="text-xs opacity-80">Dang hoat dong</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={onClose}
            >
              <X size={18} />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-secondary text-foreground rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className={`text-[10px] mt-1 ${
                    message.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'
                  }`}>
                    {message.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot size={16} className="text-primary-foreground" />
                </div>
                <div className="bg-secondary rounded-2xl px-4 py-3 rounded-bl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* FAQ Section */}
        {showFaq && (
          <div className="px-4 pb-2 border-t pt-2">
            <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
              <HelpCircle size={12} />
              CAU HOI THUONG GAP
            </p>
            <div className="flex flex-wrap gap-1">
              {FAQ_DATA.slice(0, 4).map((faq, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                  onClick={() => handleFaqClick(faq)}
                >
                  {faq.question.slice(0, 25)}...
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Replies */}
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {QUICK_REPLIES.map((reply, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="px-4 py-2 bg-secondary/50 flex items-center justify-between text-xs border-t">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock size={12} />
            <span>8:00 - 22:00</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:1900xxxx" className="flex items-center gap-1 text-primary hover:underline">
              <Phone size={12} />
              1900-xxxx
            </a>
            <a href="mailto:support@driedfruit.vn" className="flex items-center gap-1 text-primary hover:underline">
              <Mail size={12} />
              Email
            </a>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Nhap cau hoi cua ban..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="h-10"
            />
            <Button
              size="icon"
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="h-10 w-10"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
