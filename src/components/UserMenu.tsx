import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getGravatar from "@/utils/getGravatar";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

export function UserMenu() {
  const { data: session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                session?.user.image ?? getGravatar(session?.user.email ?? "")
              }
              alt="@shadcn"
            />
            <AvatarFallback>
              {session?.user.name ? session?.user.name[0] : "X"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Dashboard
            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Favorites
            <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500">
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
