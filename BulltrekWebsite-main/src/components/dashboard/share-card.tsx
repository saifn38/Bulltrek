import { Copy, Share2, Instagram, Linkedin, Twitter, HelpCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ShareCard() {
  return (
    <Card className="max-w-[400px] w-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div>Referral ID: 12345TH</div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
           <TooltipProvider >
           <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-2">
                <div className="text-sm">You can share link on:</div>
                <div className="flex gap-2 mt-2">
                  <Instagram className="h-5 w-5" />
                  <Linkedin className="h-5 w-5" />
                  <Twitter className="h-5 w-5" />
                  <HelpCircle className="h-5 w-5" />
                </div>
              </TooltipContent>
            </Tooltip>
           </TooltipProvider>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            value="https://referral.linknameStrategy.co" 
            readOnly
            className="flex-1 bg-muted px-3 py-1 rounded text-sm"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-between text-sm">
          <div>Verified Referrals: <span className="font-semibold">238</span></div>
          <div>Pending Referrals: <span className="font-semibold">23</span></div>
        </div>
      </CardContent>
    </Card>
  )
}

