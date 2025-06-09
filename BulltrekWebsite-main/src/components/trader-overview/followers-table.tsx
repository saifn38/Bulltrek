import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Follower } from "@/types/followers"

interface FollowersTableProps {
  followers: Follower[]
}

export function FollowersTable({ followers }: FollowersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Followers</TableHead>
          <TableHead>Total Volume (USTD)</TableHead>
          <TableHead>Order</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {followers.map((follower) => (
          <TableRow key={follower.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={follower.avatar} alt={follower.name} />
                  <AvatarFallback>{follower.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{follower.name}</div>
                  <div className="text-sm text-muted-foreground">{follower.username}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{follower.totalVolume.toLocaleString()}</TableCell>
            <TableCell>
              <span className="text-green-600">+{follower.percentageChange}%</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

