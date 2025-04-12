"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Brain,
  Bot,
  MessageSquare,
  Clock,
  Star,
  Filter,
  Settings,
  Pin,
  MoreVertical,
  Send,
  Sparkles,
  Target
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AIContact {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  lastInteraction: string;
  matchScore: number;
  isPinned?: boolean;
  lastMessage: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function AIMessagesPage() {
  const [contacts] = useState<AIContact[]>([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      title: "AI Research Engineer",
      company: "AI Solutions Inc.",
      lastInteraction: "2h ago",
      matchScore: 95,
      isPinned: true,
      lastMessage: "I'd be happy to share more about our AI research initiatives."
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      title: "ML Engineer",
      company: "TechCorp",
      lastInteraction: "1d ago",
      matchScore: 88,
      lastMessage: "Let me explain our approach to model optimization."
    }
  ]);

  const [selectedContact, setSelectedContact] = useState<AIContact | null>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "user",
      content: "Can you tell me more about your experience with large language models?",
      timestamp: "10:30 AM"
    },
    {
      id: "2",
      role: "assistant",
      content: "I've worked extensively with transformer architectures and have led several projects involving LLM fine-tuning. My team achieved a 40% improvement in model performance through innovative architecture modifications and training techniques. Would you like me to elaborate on any specific aspect?",
      timestamp: "10:31 AM"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Based on my experience and knowledge, I can tell you that ${newMessage.toLowerCase().includes('project') ? 
        'I have worked on several innovative projects in this area. One notable example...' : 
        'this is an interesting question. Let me share my perspective...'}`,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, userMessage, aiResponse]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">AI Conversations</h1>
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* AI Contacts Sidebar */}
          <Card className="md:col-span-4 lg:col-span-3">
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  className="pl-9"
                  placeholder="Search AI conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback>{contact.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                              <Bot className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{contact.name}</span>
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                <Target className="w-3 h-3 mr-1" />
                                {contact.matchScore}%
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{contact.title}</p>
                            <p className="text-sm text-muted-foreground">{contact.company}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>Last chat: {contact.lastInteraction}</span>
                            </div>
                          </div>
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
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedContact.avatar} />
                        <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                        <Bot className="w-3 h-3" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedContact.title} at {selectedContact.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end gap-2 max-w-[70%] ${
                          message.role === 'user' ? 'flex-row-reverse' : ''
                        }`}>
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Bot className="w-4 h-4" />
                            </div>
                          )}
                          <div className={`rounded-lg p-4 ${
                            message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                          }`}>
                            <p className="whitespace-pre-wrap">{message.content}</p>
                            <p className="text-xs mt-2 opacity-70">{message.timestamp}</p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask anything about their experience..."
                      className="flex-1"
                    />
                    <Button type="submit">
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Select an AI conversation</h3>
                  <p className="text-muted-foreground">Choose a contact to start chatting with their AI clone</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}