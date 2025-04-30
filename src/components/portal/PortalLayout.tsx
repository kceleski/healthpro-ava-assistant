
import React, { ReactNode } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PortalLayoutProps {
  children: ReactNode;
}

const PortalLayout: React.FC<PortalLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Senior Care Portal</h1>
          </div>
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>
      <div className="container py-6">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
