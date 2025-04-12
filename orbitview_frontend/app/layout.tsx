import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Briefcase, 
  User, 
  LayoutDashboard, 
  MessageSquare,
  Settings,
  LogOut,
  UserPlus,
  Brain,
  ChevronDown,
  Globe,
} from 'lucide-react';

import { ClientNav } from '@/components/nav-client-components';
import { SheetNav } from '@/components/sheet-client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'OrbitView - Your AI-Powered Career Platform',
  description: 'Navigate your career path with AI-powered insights, job matching, and professional networking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const NavLinks = () => (
    <>
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/">
          <Home className="w-4 h-4 mr-2" />
          Home
        </Link>
      </Button>
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/feed">
          <Globe className="w-4 h-4 mr-2" />
          Feed
        </Link>
      </Button>
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/dashboard">
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Link>
      </Button>
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/jobs">
          <Briefcase className="w-4 h-4 mr-2" />
          Jobs
        </Link>
      </Button>
      <Button variant="ghost" asChild className="justify-start">
        <Link href="/my-network">
          <UserPlus className="w-4 h-4 mr-2" />
          Network
        </Link>
      </Button>
    </>
  );

  const MessagesDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 relative">
          <MessageSquare className="w-4 h-4" />
          Messages
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/messages" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/ai-messages" className="flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            AI Messages
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <div className="container mx-auto px-4">
              <div className="h-16 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <Link href="/" className="font-bold text-xl hidden lg:block">OrbitView</Link>
                  <div className="hidden lg:flex items-center gap-1">
                    <NavLinks />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ClientNav />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <ChevronDown className="w-4 h-4 hidden lg:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-network" className="flex items-center">
                          <UserPlus className="w-4 h-4 mr-2" />
                          My Network
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <SheetNav />
                </div>
              </div>
            </div>
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}