import React, { ReactNode } from 'react';

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
              <button className="p-2 rounded-full hover:bg-slate-100">
                <span className="sr-only">Notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                </svg>
              </button>
              <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                <span className="font-medium text-sm">JP</span>
              </div>
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