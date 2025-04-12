"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Menu, Home, Globe, LayoutDashboard, Briefcase, UserPlus, MessageSquare, Brain, ChevronDown } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

export function SheetNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="flex flex-col gap-4">
          <Link href="/" className="font-bold text-xl">OrbitView</Link>
          <Separator />
          <div className="flex flex-col gap-2">
            <NavLinks />
            <MessagesDropdown />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}