import React from 'react';
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ModeToggle } from "@/components/layout/ModeToggle"
import { NavigationMenuDemo } from "@/components/layout/NavigationMenu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from "@/components/ui/skeleton"

const Navbar = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="mr-2 lg:hidden">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[480px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <NavigationMenuDemo />
          </SheetContent>
        </Sheet>
        <Link to="/" className="ml-auto font-bold text-lg">
          HealthPro Assist
        </Link>
        <nav className="mx-6 hidden lg:flex">
          <NavigationMenuDemo />
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <ModeToggle />
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.user_metadata?.full_name} />
                    <AvatarFallback>{user?.user_metadata?.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/portal/dashboard')}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/portal/facilities')}>Facilities</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/portal/ava')}>AVA</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/portal/admin')}>Admin Tools</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
