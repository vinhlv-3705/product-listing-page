'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const FAQ_DATA = [
  {
    question: 'Thời gian giao hàng bao lâu?',
    answer: '2-3 ngày làm việc ở thành phố, 3-5 ngày ở các tỉnh khác.'
  },
  {
    question: 'Sản phẩm có bảo hành không?',
    answer: 'Có, chúng tôi bảo hành chất lượng 100% hoặc hoàn lại tiền.'
  },
  {
    question: 'Làm sao để đổi/trả hàng?',
    answer: 'Liên hệ tổng đài 1900-xxxx trong vòng 30 ngày nhận hàng.'
  },
  {
    question: 'Có miễn phí vận chuyển không?',
    answer: 'Miễn phí vận chuyển cho đơn hàng trên 500.000 VND.'
  },
]

export function LiveChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    { sender: 'bot', text: 'Xin chào! Tôi có thể giúp bạn điều gì?' }
  ])
  const [input, setInput] = useState('')
  const [selectedFaq, setSelectedFaq] = useState<number | null>(null)

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { sender: 'user', text: input }])
    setInput('')

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: 'bot',
        text: 'Cảm ơn bạn đã hỏi. Vui lòng chọn một trong những câu hỏi thường gặp hoặc liên hệ với chúng tôi qua email.'
      }])
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle size={20} className="text-primary" />
            Trợ giúp trực tuyến
          </DialogTitle>
          <DialogDescription>
            Chúng tôi ở đây để giúp bạn. Hỏi bất kỳ điều gì!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* FAQ Section */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">CÂU HỎI THƯỜNG GẶP:</p>
            <div className="space-y-2">
              {FAQ_DATA.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFaq(selectedFaq === idx ? null : idx)}
                  className="w-full text-left text-sm p-2 rounded-lg hover:bg-secondary transition-colors border border-border"
                >
                  <p className="font-medium text-foreground">{faq.question}</p>
                  {selectedFaq === idx && (
                    <p className="text-xs text-muted-foreground mt-2">{faq.answer}</p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-secondary/30 p-3 rounded-lg space-y-2">
            <p className="text-xs font-semibold">LIÊN HỆ TRỰC TIẾP:</p>
            <p className="text-sm text-foreground">
              Email: <span className="font-medium">support@driedfruit.vn</span>
            </p>
            <p className="text-sm text-foreground">
              Hotline: <span className="font-medium">1900-xxxx</span>
            </p>
            <p className="text-sm text-foreground">
              Giờ làm việc: 8:00 - 22:00 hàng ngày
            </p>
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <Input
              placeholder="Nhập câu hỏi của bạn..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="h-9"
            />
            <Button
              size="icon"
              onClick={handleSend}
              disabled={!input.trim()}
              className="h-9 w-9"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
