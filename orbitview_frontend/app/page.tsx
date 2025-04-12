"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BrainCog, 
  Rocket, 
  Users, 
  Zap,
  Briefcase,
  Target,
  TrendingUp,
  Star,
  ArrowRight,
  MapPin,
  Building2,
  Search,
  GraduationCap,
  BarChart3,
  Network,
  Orbit,
  Sparkles,
  Bot,
  LineChart,
  Share2
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  // This would come from your auth system
  const [isAuthenticated] = useState(true);

  return isAuthenticated ? (
    // Authenticated Home Page
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Your professional <span className="text-primary font-semibold">orbit</span> is growing. Let's expand your reach.</p>
          </div>
          <Button asChild>
            <Link href="/profile">View Profile</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Profile Views</h3>
                </div>
                <p className="text-2xl font-bold">324</p>
                <p className="text-sm text-green-600">↑ 12% this week</p>
              </Card>
              {/*
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">AI Match Rate</h3>
                </div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-green-600">↑ 5% improvement</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Orbit Growth</h3>
                </div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-green-600">↑ 8% this month</p>
              </Card>*/}
            </div>

            {/* AI Insights */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">AI-Powered Insights</h2>
                  <p className="text-muted-foreground">Your professional story, analyzed and enhanced</p>
                </div>
                <Button variant="outline">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Refresh Insights
                </Button>
              </div>
              <div className="space-y-6">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">Skill Growth Trajectory</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">
                    Your expertise in AI and Machine Learning positions you in the top 15% of professionals in your field.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <Badge variant="secondary">Neural Networks</Badge>
                    <Badge variant="secondary">Python</Badge>
                  </div>
                </div>

                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Network className="w-5 h-5 text-primary" />
                    <h3 className="font-medium">Network Analysis</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Your connections show strong alignment with emerging AI research teams. Consider expanding into robotics.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Enhance Your <span className="text-primary font-semibold">Orbit</span></h2>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Bot className="w-4 h-4 mr-2" />
                  Update AI Profile
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Your Story
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Star className="w-4 h-4 mr-2" />
                  Highlight Achievements
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  ) : (
    // Guest Home Page
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Own your story and{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/80">
                orbit
              </span>
              <span className="absolute inset-0 bg-primary/10 blur-xl rounded-full"></span>
            </span>
            <br />
            Shape your future. 
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            OrbitView transforms your experience into an AI-powered narrative. Go beyond static resumes - let your achievements, skills, and potential <span className="text-primary font-medium">orbit</span> together in a dynamic professional profile.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Start Your <span className="relative inline-block px-1">
                <span className="relative z-10">Orbit</span>
                <span className="absolute inset-0 bg-white/20 rounded-md blur-sm"></span>
              </span></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">See It in Action</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <BrainCog className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Story</h3>
            <p className="text-muted-foreground">
              Your experience is vectorized and analyzed by AI to create a rich, dynamic professional narrative that evolves with you.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <Orbit className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Dynamic <span className="text-primary">Orbits</span></h3>
            <p className="text-muted-foreground">
              Connect your skills, projects, and achievements in meaningful constellations that showcase your unique professional journey.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <Network className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent Networking</h3>
            <p className="text-muted-foreground">
              Our AI matches you with opportunities and connections based on your professional <span className="text-primary font-medium">orbit's</span> unique patterns.
            </p>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-card rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10x</div>
              <p className="text-muted-foreground">richer professional profiles compared to traditional resumes</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <p className="text-muted-foreground">match accuracy with AI-powered opportunity recommendations</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3x</div>
              <p className="text-muted-foreground">more meaningful professional connections</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}