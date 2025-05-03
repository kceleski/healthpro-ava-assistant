import React, { useState } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { 
  User, Calendar, Building, MapPin, BarChart3, PlusCircle, Search, 
  ArrowRight, Phone, Mail, ChevronRight, Clock, FileText, CalendarClock, 
  AlertCircle, Filter, Home, BellRing, CheckCircle, PieChart, Activity,
  MoreHorizontal, Download, Printer, Share2, RefreshCw, Star, Users, 
  Clipboard
} from 'lucide-react';

// Generate random percentage for demo
const randomProgress = () => Math.floor(Math.random() * 100);

// Helper function for current date
const getCurrentDate = () => {
  const date = new Date();
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

const Dashboard = () => {
  const [period, setPerio
