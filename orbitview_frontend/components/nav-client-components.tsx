'use client';

import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationDropdown } from '@/components/notification-dropdown';
import { MessageSquare, Brain, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ClientNav() {
  const unreadMessages = 3;
  const unreadAIMessages = 2;
  const totalUnread = unreadMessages + unreadAIMessages;

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <NotificationDropdown />

      <div className="hidden lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 relative">
              <MessageSquare className="w-4 h-4" />
              Messages
              <ChevronDown className="w-4 h-4" />
              {totalUnread > 0 && (
                <Badge 
                  variant="default" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                >
                  {totalUnread}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/messages" className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Messages
                </div>
                {unreadMessages > 0 && (
                  <Badge variant="secondary">{unreadMessages}</Badge>
                )}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/ai-messages" className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Messages
                </div>
                {unreadAIMessages > 0 && (
                  <Badge variant="secondary">{unreadAIMessages}</Badge>
                )}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}