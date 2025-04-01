"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Briefcase,
  Star,
  Award,
  Brain,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  MessageSquare,
  Eye,
  Calendar,
  Bell,
  GraduationCap,
  BookOpen,
  Clock,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Activity {
  id: string;
  type: 'view' | 'connection' | 'skill' | 'job';
  title: string;
  description: string;
  timestamp: string;
}

interface CareerInsight {
  id: string;
  title: string;
  description: string;
  action: string;
  impact: string;
  category: 'skill' | 'network' | 'opportunity';
}

interface SkillTrend {
  name: string;
  growth: number;
  demand: number;
  relevance: number;
}

export default function DashboardPage() {
  const [activities] = useState<Activity[]>([
    {
      id: "1",
      type: 'view',
      title: "Profile viewed by Tech Recruiter",
      description: "Sarah Chen from AI Solutions Inc.",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      type: 'connection',
      title: "New connection request",
      description: "John Smith, Senior AI Engineer at Google",
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      type: 'skill',
      title: "Skill endorsement received",
      description: "Machine Learning endorsed by 3 connections",
      timestamp: "1 day ago"
    }
  ]);

  const [insights] = useState<CareerInsight[]>([
    {
      id: "1",
      title: "Emerging AI Skill Gap",
      description: "Your expertise in LLMs positions you well for the growing demand in AI engineering roles",
      action: "Consider highlighting recent LLM projects",
      impact: "+45% job match rate",
      category: 'skill'
    },
    {
      id: "2",
      title: "Network Growth Opportunity",
      description: "Connect with 5 AI researchers in your area to strengthen your professional network",
      action: "View suggested connections",
      impact: "3x interview chances",
      category: 'network'
    }
  ]);

  const [skillTrends] = useState<SkillTrend[]>([
    {
      name: "Large Language Models",
      growth: 85,
      demand: 92,
      relevance: 95
    },
    {
      name: "MLOps",
      growth: 75,
      demand: 88,
      relevance: 90
    },
    {
      name: "Vector Databases",
      growth: 70,
      demand: 85,
      relevance: 88
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/*<div>
              <h1 className="text-3xl font-bold">Career Dashboard</h1>
              <p className="text-muted-foreground">AI-powered insights to accelerate your career growth</p>
            </div>*/}
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Calendar className="w-4 h-4" />
              </Button>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Profile Views</h3>
                </div>
                <p className="text-2xl font-bold">324</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  12% this week
                </p>
              </Card>
              {/*
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Job Match Rate</h3>
                </div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  5% improvement
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Network Reach</h3>
                </div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  8% growth
                </p>
              </Card>*/}
            </div>

            {/* AI Career Insights */}
            <div>
              <h2 className="text-xl font-semibold mb-4">AI Career Insights</h2>
              <div className="space-y-4">
                {insights.map((insight) => (
                  <Card key={insight.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {insight.category === 'skill' ? (
                          <Brain className="w-5 h-5 text-primary" />
                        ) : insight.category === 'network' ? (
                          <Users className="w-5 h-5 text-primary" />
                        ) : (
                          <Rocket className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{insight.title}</h3>
                        <p className="text-muted-foreground mb-3">{insight.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {insight.impact}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            {insight.action}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Skill Trends */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Trending Skills in Your Field</h2>
              <Card className="p-6">
                <div className="space-y-6">
                  {skillTrends.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <Badge variant="secondary">High Demand</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Growth</p>
                          <div className="h-2 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${skill.growth}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Demand</p>
                          <div className="h-2 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${skill.demand}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Relevance</p>
                          <div className="h-2 bg-secondary rounded-full">
                            <div 
                              className="h-2 bg-primary rounded-full" 
                              style={{ width: `${skill.relevance}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4">
                  View All Skill Insights
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            </div>

            {/* Learning Progress Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
              <Card className="p-6">
                <div className="flex items-center justify-center h-48 bg-secondary/30 rounded-lg">
                  <div className="text-center">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md">
                      Track your learning journey, earn certifications, and showcase your expertise.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/50 rounded-lg">
                      {activity.type === 'view' ? (
                        <Eye className="w-4 h-4" />
                      ) : activity.type === 'connection' ? (
                        <Users className="w-4 h-4" />
                      ) : activity.type === 'skill' ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <Briefcase className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View All Activity
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Browse Job Matches
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Grow Your Network
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Update Skills
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}