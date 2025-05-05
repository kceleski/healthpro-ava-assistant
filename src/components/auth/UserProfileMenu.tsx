
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, User, Settings, Heart } from 'lucide-react';
import { AuthDialog } from './AuthDialog';
import { Link } from 'react-router-dom';

export function UserProfileMenu() {
  const { user, loading, signOut, isAuthenticated } = useAuth();
  
  const getInitials = () => {
    if (user?.full_name) {
      return user.full_name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    
    return 'U';
  };
  
  if (loading) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }
  
  if (!isAuthenticated) {
    return <AuthDialog />;
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer flex w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/favorites" className="cursor-pointer flex w-full">
            <Heart className="mr-2 h-4 w-4" />
            <span>Saved Facilities</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link to="/settings" className="cursor-pointer flex w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
