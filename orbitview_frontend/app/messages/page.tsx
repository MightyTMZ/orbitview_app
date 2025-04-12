"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import TextareaAutosize from "react-textarea-autosize";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  Search,
  Phone,
  Video,
  Info,
  Image as ImageIcon,
  File,
  Smile,
  Send,
  Filter,
  Settings,
  Star,
  Clock,
  Users,
  Archive,
  Trash2,
  MoreVertical,
  ChevronDown,
  Pin,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  timestamp: string;
  unread: number;
  isPinned?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status: 'sent' | 'delivered' | 'read';
  reactions?: {
    emoji: string;
    count: number;
    userReacted: boolean;
  }[];
}

export default function MessagesPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      status: 'online',
      lastMessage: "Looking forward to our collaboration!",
      timestamp: "2m ago",
      unread: 2,
      isPinned: true
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      status: 'away',
      lastMessage: "Great presentation today!",
      timestamp: "1h ago",
      unread: 0
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "1",
      content: "Hi! I saw your work on the AI project. Very impressive!",
      timestamp: "10:30 AM",
      type: 'text',
      status: 'read',
      reactions: [
        { emoji: "👍", count: 1, userReacted: true },
        { emoji: "🚀", count: 2, userReacted: false }
      ]
    },
    {
      id: "2",
      senderId: "current_user",
      content: "Thank you! I'd love to discuss potential collaboration opportunities.",
      timestamp: "10:32 AM",
      type: 'text',
      status: 'read'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(contacts[0]);
  const [newMessage, setNewMessage] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [view, setView] = useState<'all' | 'unread' | 'archived'>('all');

  const messageListRef = useRef<List>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current_user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage("");
    
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getItemSize = (index: number) => {
    const message = messages[index];
    const baseHeight = 80;
    const contentLength = message.content.length;
    const lines = Math.ceil(contentLength / 50);
    return baseHeight * lines;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Contacts Sidebar */}
          <Card className="md:col-span-4 lg:col-span-3">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Messages</h2>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Message Settings</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Filter className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filter Messages</DialogTitle>
                        <DialogDescription>
                          Customize your message view
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="pl-9 pr-4"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={view === 'all' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('all')}
                >
                  All
                </Button>
                <Button
                  variant={view === 'unread' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('unread')}
                >
                  Unread
                </Button>
                <Button
                  variant={view === 'archived' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('archived')}
                >
                  Archived
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="space-y-2">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id}>
                      <button
                        className={`w-full p-3 rounded-lg hover:bg-secondary/50 transition-colors ${
                          selectedContact?.id === contact.id ? 'bg-secondary' : ''
                        }`}
                        onClick={() => setSelectedContact(contact)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                              contact.status === 'online' ? 'bg-green-500' :
                              contact.status === 'away' ? 'bg-yellow-500' :
                              'bg-gray-500'
                            }`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{contact.name}</span>
                              <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && (
                            <Badge variant="default" className="rounded-full">
                              {contact.unread}
                            </Badge>
                          )}
                        </div>
                      </button>
                      <Separator className="my-2" />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-8 lg:col-span-9">
            {selectedContact ? (
              <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.status === 'online' ? 'Online' : 
                         selectedContact.status === 'away' ? 'Away' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Phone className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Voice Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Video className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Video Call</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Chat Info</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pin className="w-4 h-4 mr-2" />
                          Pin Conversation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive Chat
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Chat
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        ref={messageListRef}
                        height={height}
                        width={width}
                        itemCount={messages.length}
                        itemSize={getItemSize}
                      >
                        {({ index, style }) => {
                          const message = messages[index];
                          const isCurrentUser = message.senderId === 'current_user';
                          const prevMessage = index > 0 ? messages[index - 1] : null;
                          const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
                          
                          const isFirstInGroup = !prevMessage || prevMessage.senderId !== message.senderId;
                          const isLastInGroup = !nextMessage || nextMessage.senderId !== message.senderId;
                          
                          return (
                            <div
                              style={{
                                ...style,
                                paddingTop: isFirstInGroup ? '1rem' : '0.25rem',
                                paddingBottom: isLastInGroup ? '1rem' : '0.25rem',
                              }}
                              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                            >
                              <div 
                                className={`flex items-end gap-2 max-w-[70%] ${
                                  isCurrentUser ? 'flex-row-reverse' : ''
                                }`}
                              >
                                {!isCurrentUser && isLastInGroup && (
                                  <Avatar className="w-8 h-8 mb-1">
                                    <AvatarImage src={selectedContact?.avatar} />
                                    <AvatarFallback>{selectedContact?.name[0]}</AvatarFallback>
                                  </Avatar>
                                )}
                                {!isCurrentUser && !isLastInGroup && (
                                  <div className="w-8" />
                                )}
                                <div
                                  className={`rounded-lg p-3 ${
                                    isCurrentUser
                                      ? 'bg-primary text-primary-foreground'
                                      : 'bg-secondary'
                                  } ${
                                    isFirstInGroup && isLastInGroup
                                      ? 'rounded-2xl'
                                      : isFirstInGroup
                                      ? isCurrentUser
                                        ? 'rounded-t-2xl rounded-l-2xl rounded-br-lg'
                                        : 'rounded-t-2xl rounded-r-2xl rounded-bl-lg'
                                      : isLastInGroup
                                      ? isCurrentUser
                                        ? 'rounded-b-2xl rounded-l-2xl rounded-tr-lg'
                                        : 'rounded-b-2xl rounded-r-2xl rounded-tl-lg'
                                      : isCurrentUser
                                      ? 'rounded-l-2xl rounded-tr-lg rounded-br-lg'
                                      : 'rounded-r-2xl rounded-tl-lg rounded-bl-lg'
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap leading-relaxed">
                                    {message.content}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1.5">
                                    <span className="text-xs opacity-70">
                                      {message.timestamp}
                                    </span>
                                    {isCurrentUser && message.status === 'read' && (
                                      <span className="text-xs">✓✓</span>
                                    )}
                                  </div>
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div className="flex gap-1 mt-2">
                                      {message.reactions.map((reaction, i) => (
                                        <span
                                          key={i}
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            reaction.userReacted
                                              ? 'bg-primary/20'
                                              : 'bg-secondary/50'
                                          }`}
                                        >
                                          {reaction.emoji} {reaction.count}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }}
                      </List>
                    )}
                  </AutoSizer>
                  <div ref={messageEndRef} />
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <TextareaAutosize
                        className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-20"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        minRows={1}
                        maxRows={5}
                      />
                      <div className="absolute right-2 bottom-2 flex items-center gap-1">
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <ImageIcon className="w-4 h-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <File className="w-4 h-4" />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button type="submit" size="icon" className="h-10 w-10">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a contact to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}