
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarInset
} from "@/components/ui/sidebar";
import { 
  Home, Users, Buildings, Calendar, MessageSquare, FileText, 
  Settings, HelpCircle, LogOut, Search
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface PortalLayoutProps {
  children: ReactNode;
}

const PortalLayout = ({ children }: PortalLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2">
              <img 
                src="/lovable-uploads/b6e2fabe-745f-4129-a03e-51af7117e3c6.png" 
                alt="HealthProAssist Logo" 
                className="h-8 w-auto"
              />
              <div className="font-semibold text-lg">HealthProAssist</div>
            </div>
            <div className="px-2 mt-2">
              <Input 
                placeholder="Search..." 
                className="w-full" 
                prefix={<Search className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={currentPath === '/portal/dashboard'}
                  tooltip="Dashboard"
                >
                  <Link to="/portal/dashboard">
                    <Home className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={currentPath.includes('/portal/client')}
                  tooltip="Clients"
                >
                  <Link to="/portal/client/1">
                    <Users className="h-4 w-4" />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={currentPath === '/portal/facilities'}
                  tooltip="Facilities"
                >
                  <Link to="/portal/facilities">
                    <Buildings className="h-4 w-4" />
                    <span>Facilities</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Calendar"
                >
                  <Link to="/portal/calendar">
                    <Calendar className="h-4 w-4" />
                    <span>Calendar</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={currentPath === '/portal/ava'}
                  tooltip="Ava Assistant"
                >
                  <Link to="/portal/ava">
                    <MessageSquare className="h-4 w-4" />
                    <span>Ava Assistant</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip="Documents"
                >
                  <Link to="/portal/documents">
                    <FileText className="h-4 w-4" />
                    <span>Documents</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/portal/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Help">
                  <Link to="/portal/help">
                    <HelpCircle className="h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            
            <div className="px-4 py-2 mt-2">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="User" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">John Placement</div>
                  <div className="text-xs text-muted-foreground">Phoenix, AZ</div>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset>
          <div className="h-14 border-b bg-white flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-medium">HealthProAssist Portal</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Ask Ava
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/a76d8094-6656-45e2-bb65-c21bedb59617.png" alt="Ava" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className="p-6">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PortalLayout;
