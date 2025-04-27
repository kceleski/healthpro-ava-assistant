
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/portal/Dashboard";
import Facilities from "./pages/portal/Facilities";
import ClientDetails from "./pages/portal/ClientDetails";
import AvaPortal from "./pages/portal/AvaPortal";
import FacilityMapPage from "./pages/FacilityMapPage";
import AssessmentPage from "./pages/AssessmentPage";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/facilities-map" element={
            <RequireAuth>
              <FacilityMapPage />
            </RequireAuth>
          } />
          <Route path="/portal/dashboard" element={<Dashboard />} />
          <Route path="/portal/facilities" element={<Facilities />} />
          <Route path="/portal/client/:id" element={<ClientDetails />} />
          <Route path="/portal/ava" element={<AvaPortal />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
