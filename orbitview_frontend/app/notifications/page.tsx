"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Search,
  Users,
  Star,
  Briefcase,
  MessageSquare,
  Heart,
  Clock,
  Filter,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Archive,
  MoreVertical
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Notification {
  id: string;
  type: 'connection' | 'endorsement' | 'job' | 'message' | 'like';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  link: string;
  date: Date;
}

const ITEMS_PER_PAGE = 10;

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "connection",
      title: "New Connection Request",
      description: "Sarah Chen wants to connect with you",
      timestamp: "2m ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/my-network",
      date: new Date()
    },
    {
      id: "2",
      type: "endorsement",
      title: "New Skill Endorsement",
      description: "Michael Rodriguez endorsed you for Machine Learning",
      timestamp: "1h ago",
      read: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/profile",
      date: new Date(Date.now() - 3600000)
    },
    {
      id: "3",
      type: "job",
      title: "Job Match Found",
      description: "New AI Engineer position at TechCorp matches your profile",
      timestamp: "2h ago",
      read: false,
      link: "/jobs",
      date: new Date(Date.now() - 7200000)
    },
    {
      id: "4",
      type: "like",
      title: "Post Reaction",
      description: "Emily Johnson and 5 others liked your post about AI trends",
      timestamp: "3h ago",
      read: true,
      link: "/feed",
      date: new Date(Date.now() - 10800000)
    },
    {
      id: "5",
      type: "message",
      title: "New Message",
      description: "David Wilson sent you a message about the ML project",
      timestamp: "5h ago",
      read: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      link: "/messages",
      date: new Date(Date.now() - 18000000)
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [type, setType] = useState<Notification['type'] | 'all'>('all');

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

  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = 
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        filter === 'all' ||
        (filter === 'unread' && !notification.read) ||
        (filter === 'read' && notification.read);

      const matchesType =
        type === 'all' || notification.type === type;

      return matchesSearch && matchesFilter && matchesType;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const totalPages = Math.ceil(filteredNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNotifications = filteredNotifications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Archive className="w-4 h-4 mr-2" />
              Archive All
            </Button>
            <Button>
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <Card className="p-6 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Filter By Status</h3>
                <div className="space-y-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('all')}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    All Notifications
                  </Button>
                  <Button 
                    variant={filter === 'unread' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('unread')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Unread
                    {unreadCount > 0 && (
                      <Badge className="ml-auto">{unreadCount}</Badge>
                    )}
                  </Button>
                  <Button 
                    variant={filter === 'read' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('read')}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Read
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-4">Filter By Type</h3>
                <div className="space-y-2">
                  <Button 
                    variant={type === 'all' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('all')}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    All Types
                  </Button>
                  <Button 
                    variant={type === 'connection' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('connection')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Connections
                  </Button>
                  <Button 
                    variant={type === 'endorsement' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('endorsement')}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Endorsements
                  </Button>
                  <Button 
                    variant={type === 'job' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('job')}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Jobs
                  </Button>
                  <Button 
                    variant={type === 'like' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('like')}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Reactions
                  </Button>
                  <Button 
                    variant={type === 'message' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setType('message')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-10" 
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <Card>
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-6 space-y-6">
                  {paginatedNotifications.map((notification) => (
                    <div key={notification.id}>
                      <div className="flex items-start gap-4">
                        {notification.avatar ? (
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={notification.avatar} />
                            <AvatarFallback>{notification.title[0]}</AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link 
                                href={notification.link}
                                className="font-medium hover:underline"
                              >
                                {notification.title}
                              </Link>
                              <p className="text-muted-foreground">
                                {notification.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs">
                                    Unread
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Mark as {notification.read ? 'unread' : 'read'}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Archive className="w-4 h-4 mr-2" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredNotifications.length)} of {filteredNotifications.length}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">{currentPage}</span>
                    <span className="text-sm text-muted-foreground">of</span>
                    <span className="text-sm font-medium">{totalPages}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}