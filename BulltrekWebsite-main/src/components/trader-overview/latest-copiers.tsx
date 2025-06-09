import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Copier } from "@/types/dashboard"

interface LatestCopiersProps {
  copiers: Copier[]
}

export function LatestCopiers({ copiers }: LatestCopiersProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Latest Copiers</h3>
      <div className="space-y-4">
        {copiers.map((copier) => (
          <div key={copier.id} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={copier.avatar} alt={copier.name} />
                <AvatarFallback>{copier.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="font-medium">{copier.name}</div>
                <div className="text-sm text-muted-foreground">{copier.username}</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{copier.timeAgo}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

