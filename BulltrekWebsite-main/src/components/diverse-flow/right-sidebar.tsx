import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface RightSidebarProps {
  profile: {
    name: string
    username: string
    statusLine: string
    avatar: string
  }
  metrics: {
    roi: number
    maxDrawdown: number
    totalFollowers: number
    followersPnL: number
  }
}

export function RightSidebar({ profile }: RightSidebarProps) {
  return (
    <div className="w-full max-w-sm space-y-6 rounded-lg border bg-white p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h2 className="font-semibold">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.username}</p>
          <p className="text-sm text-muted-foreground">{profile.statusLine}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Asset Allocation</h3>
        <div className="relative aspect-square">
          {/* Donut chart would go here - using placeholder for now */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-semibold">USTD</div>
              <div>53.46%</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-sm">Active</span>
              <span className="text-sm text-muted-foreground">10.2%</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">ROI</span>
          <span className="text-sm font-medium text-red-500">-90.87%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Maximum drawdown</span>
          <span className="text-sm font-medium">34.67%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Total Followers</span>
          <span className="text-sm font-medium">200</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm">Follower's PnL</span>
          <span className="text-sm font-medium">₹2345.89</span>
        </div>
      </div>
    </div>
  )
}

