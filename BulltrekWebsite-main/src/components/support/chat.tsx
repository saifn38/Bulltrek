'use client'

import { ArrowLeft, Link2, List, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from 'react-router-dom'

export default function SupportTicket() {
    const router = useNavigate()
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4">
        {/* Header */}
        <header className="flex items-center gap-4 py-4 border-b border-gray-200">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100" onClick={() => router(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <span className="text-sm font-medium">Ticket ID</span>{" "}
            <span className="text-sm">1234GHY</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-6 space-y-6">
          {/* Concern Section */}
          <div className="space-y-2">
            <h2 className="text-base font-medium">Concern</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore
              magnLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore
            </p>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            <div className="flex flex-col items-end">
              <div className="max-w-[90%] rounded-2xl border border-[#FFD7B1] bg-[#FFD7B1] p-4">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisil?
                </p>
                <p className="mt-2 text-right text-xs text-gray-600">14/03, 9:03 PM</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="max-w-[90%] rounded-2xl border border-[#FFF1EC] bg-[#FFF1EC] p-4">
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ?
                </p>
                <p className="mt-2 text-right text-xs text-gray-600">14/03, 9:03 PM</p>
              </div>
            </div>
          </div>
        </main>

        {/* Input Area */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              <Textarea 
                placeholder="Type Here" 
                className="min-h-[100px] resize-none pr-12 pb-12 rounded-xl border-gray-200"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                  <span className="font-medium">Aa</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                  <Link2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                  <List className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                  <span className="font-medium">B</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 rounded-lg">
                  <span className="font-medium italic">I</span>
                </Button>
              </div>
              <Button 
                size="icon" 
                className="absolute bottom-3 right-3 h-8 w-8 text-white bg-[#4A1515] hover:bg-[#5A2525] rounded-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

