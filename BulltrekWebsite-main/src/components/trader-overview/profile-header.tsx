import { Share2, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { UserProfile } from "@/types/dashboard"

interface ProfileHeaderProps {
  profile: UserProfile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 py-8 bg-white">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={profile.avatar} alt={profile.name} />
          <AvatarFallback>{profile.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{profile.name}</h1>
            <span className="text-sm text-muted-foreground">{profile.username}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Registered: {profile.registeredDate}</span>
            <span>•</span>
            <span>{profile.statusLine}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
        <Button variant="default" className="bg-[#4A1D2F] hover:bg-[#3A1525] text-white">
          Copy
        </Button>
      </div>
    </div>
  )
}

