"use client";

import { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell,
  Clock,
  Users,
  Star,
  Briefcase,
  MessageSquare,
  Heart
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: 'connection' | 'endorsement' | 'job' | 'message' | 'like';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  link: string;
}

export function NotificationDropdown() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "connection",
      title: "New Connection Request",
      description: "Sarah Chen wants to connect with you",
      timestamp: "2m ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/my-network"
    },
    {
      id: "2",
      type: "endorsement",
      title: "New Skill Endorsement",
      description: "Michael Rodriguez endorsed you for Machine Learning",
      timestamp: "1h ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/profile"
    },
    {
      id: "3",
      type: "job",
      title: "Job Match Found",
      description: "New AI Engineer position at TechCorp matches your profile",
      timestamp: "2h ago",
      read: false,
      link: "/jobs"
    },
    {
      id: "4",
      type: "like",
      title: "Post Reaction",
      description: "Emily Johnson and 5 others liked your post about AI trends",
      timestamp: "3h ago",
      read: true,
      link: "/feed"
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      description: "David Wilson sent you a message about the ML project",
      timestamp: "5h ago",
      read: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/messages"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'connection':
        return <Users className="w-4 h-4" />;
      case 'endorsement':
        return <Star className="w-4 h-4" />;
      case 'job':
        return <Briefcase className="w-4 h-4" />;
      case 'message':
        return <MessageSquare className="w-4 h-4" />;
      case 'like':
        return <Heart className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="default" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button variant="ghost" size="sm">
            Mark all as read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[400px]">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} asChild>
              <Link
                href={notification.link}
                className={`flex items-start gap-3 p-3 ${
                  !notification.read ? 'bg-secondary/50' : ''
                }`}
              >
                {notification.avatar ? (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>
                      {notification.title[0]}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {notification.timestamp}
                    </span>
                  </div>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/notifications" className="flex justify-center">
            View all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}