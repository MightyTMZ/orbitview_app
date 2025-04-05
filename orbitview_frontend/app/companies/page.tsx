"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, 
  Building2, 
  Users, 
  Globe,
  Briefcase,
  TrendingUp,
  BarChart3,
  Target,
  Star,
  Clock,
  GraduationCap,
  Award,
  Link as LinkIcon,
  ArrowUpRight,
  FileText,
  Newspaper,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Bot,
  Send,
  Brain
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function CompanyProfilePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");

  const [company] = useState({
    name: "AI Solutions Inc.",
    tagline: "Transforming Industries Through Artificial Intelligence",
    description: "AI Solutions Inc. is a leading artificial intelligence research and development company focused on creating scalable AI solutions for enterprise clients. Our team of world-class researchers and engineers develops cutting-edge technologies in machine learning, computer vision, and natural language processing.",
    founded: "2015",
    size: "1,000-5,000 employees",
    industry: "Artificial Intelligence",
    location: "San Francisco, CA",
    type: "Private",
    specialties: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Enterprise AI Solutions",
      "AI Research"
    ],
    stats: {
      employees: 3200,
      followers: "125K+",
      growth: "+45%"
    },
    rating: 4.8,
    culture: {
      values: [
        "Innovation First",
        "Ethical AI Development",
        "Continuous Learning",
        "Global Impact"
      ],
      benefits: [
        "Competitive Salary",
        "Stock Options",
        "Remote Work",
        "Learning Budget",
        "Health Insurance",
        "401(k) Match"
      ]
    }
  });

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date().toLocaleTimeString()
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Thank you for your interest in ${company.name}! Based on your question about "${question}", here's what I can tell you...

Let me provide some relevant information from our company database:

${question.toLowerCase().includes('culture') ? 
  `Our culture is built on values like ${company.culture.values.join(', ')}. We believe in fostering an environment where innovation thrives.` :
  question.toLowerCase().includes('benefit') ?
  `We offer competitive benefits including ${company.culture.benefits.join(', ')}.` :
  `We're a leading AI company founded in ${company.founded}, specializing in ${company.specialties.join(', ')}. Our team of ${company.stats.employees} employees works on cutting-edge AI solutions.`}

Would you like to know more about any specific aspect?`,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage, aiResponse]);
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="py-8">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold">{company.name}</h1>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      <Star className="w-3 h-3 mr-1" />
                      {company.rating}/5
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground">{company.tagline}</p>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{company.size}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <span>{company.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Button>
                      <Users className="w-4 h-4 mr-2" />
                      Follow
                    </Button>
                    <Button variant="outline">
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold">{company.stats.employees}</p>
                  <p className="text-sm text-muted-foreground">Employees</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{company.stats.followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{company.stats.growth}</p>
                  <p className="text-sm text-muted-foreground">YoY Growth</p>
                </div>
              </div>
            </div>
            <div className="mt-6 max-w-3xl">
              <p className="text-muted-foreground">{company.description}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">About {company.name}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="font-medium">{company.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-medium">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company Size</p>
                  <p className="font-medium">{company.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium">{company.type}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Company Culture */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Company Culture</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Our Values</h3>
                  <div className="space-y-3">
                    {company.culture.values.map((value, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                          <Star className="w-4 h-4 text-primary" />
                        </div>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Benefits</h3>
                  <div className="space-y-3">
                    {company.culture.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* AI Assistant */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">AI Brand Ambassador</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Have questions about {company.name}? Our AI assistant is here to help! Ask about our culture, benefits, technologies, or anything else you'd like to know.
              </p>
              
              <div className="bg-secondary/30 rounded-lg p-4 h-[400px] overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                    <Bot className="w-12 h-12 mb-4" />
                    <p>Hi! I'm {company.name}'s AI assistant. How can I help you today?</p>
                    <p className="text-sm mt-2">You can ask me about:</p>
                    <ul className="text-sm mt-2">
                      <li>• Our company culture and values</li>
                      <li>• Benefits and perks</li>
                      <li>• Technologies and specialties</li>
                      <li>• Career opportunities</li>
                    </ul>
                  </div>
                ) : (
                  messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAskQuestion} className="flex gap-2">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about our company..."
                  className="flex-1"
                />
                <Button type="submit">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Company Overview</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Growth</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">+45%</p>
                  <p className="text-sm text-muted-foreground">Year over year revenue growth</p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Team Growth</h4>
                  </div>
                  <p className="text-2xl font-bold">+250</p>
                  <p className="text-sm text-muted-foreground">New hires in last 12 months</p>
                </div>
              </div>
            </Card>

            {/* Latest News */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Latest News</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/50 rounded-lg">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <Link href="#" className="font-medium hover:underline">
                      AI Solutions Inc. Announces Breakthrough in Large Language Models
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>TechCrunch</span>
                      <span>•</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/50 rounded-lg">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <Link href="#" className="font-medium hover:underline">
                      How We're Making AI More Accessible to Enterprises
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>Company Blog</span>
                      <span>•</span>
                      <span>1 week ago</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-secondary/50 rounded-lg">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <Link href="#" className="font-medium hover:underline">
                      AI Solutions Inc. Named Top AI Company to Watch in 2025
                    </Link>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <span>Forbes</span>
                      <span>•</span>
                      <span>2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All News
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}