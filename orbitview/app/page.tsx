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
  BarChart3
} from "lucide-react";
import Link from "next/link";

interface RecommendedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  posted: string;
}

interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
  matchScore: number;
}

export default function Home() {
  // This would come from your auth system
  const [isAuthenticated] = useState(false);

  const [recommendedJobs] = useState<RecommendedJob[]>([
    {
      id: "1",
      title: "Senior AI Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      matchScore: 95,
      posted: "2 days ago"
    },
    {
      id: "2",
      title: "Machine Learning Engineer",
      company: "AI Solutions Inc.",
      location: "Remote",
      matchScore: 92,
      posted: "1 day ago"
    }
  ]);

  const [suggestedConnections] = useState<Connection[]>([
    {
      id: "1",
      name: "Sarah Chen",
      title: "AI Research Engineer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "ML Engineer",
      company: "Meta",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ]);

  const [trendingCompanies] = useState<Company[]>([
    {
      id: "1",
      name: "AI Solutions Inc.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      industry: "Artificial Intelligence",
      description: "Leading AI research and development company",
      matchScore: 95
    },
    {
      id: "2",
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      industry: "Technology",
      description: "Enterprise software solutions provider",
      matchScore: 88
    }
  ]);

  return isAuthenticated ? (
    // Authenticated Home Page
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John!</h1>
            <p className="text-muted-foreground">Here's what's happening in your professional network</p>
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
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Job Match Rate</h3>
                </div>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-sm text-green-600">↑ 5% improvement</p>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Network Growth</h3>
                </div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-green-600">↑ 8% this month</p>
              </Card>
            </div>

            {/* Recommended Jobs */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recommended Jobs</h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/jobs">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
              <div className="space-y-4">
                {recommendedJobs.map((job) => (
                  <div key={job.id} className="flex items-start justify-between p-4 bg-secondary/30 rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {job.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          <span>{job.posted}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm">Apply Now</Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Network Growth */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Grow Your Network</h2>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg">
                    <Avatar>
                      <AvatarImage src={connection.image} />
                      <AvatarFallback>{connection.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{connection.name}</h3>
                      <p className="text-sm text-muted-foreground">{connection.title}</p>
                      <p className="text-sm text-muted-foreground">{connection.company}</p>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Companies */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Trending Companies</h2>
              <div className="space-y-4">
                {trendingCompanies.map((company) => (
                  <Link key={company.id} href={`/companies/${company.id}`}>
                    <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
                      <Avatar>
                        <AvatarImage src={company.logo} />
                        <AvatarFallback>{company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{company.name}</h3>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {company.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                        <p className="text-sm text-muted-foreground mt-1">{company.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Update Job Preferences
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Add New Skills
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Your AI-Powered Career Accelerator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Showcase your true potential, connect with opportunities, and build your career in the AI era - all powered by intelligent automation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">See Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <BrainCog className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Driven Portfolio</h3>
            <p className="text-muted-foreground">
              Showcase your projects and impact with AI-generated case studies and metrics that matter to employers.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Job Matching</h3>
            <p className="text-muted-foreground">
              Get personalized job and internship matches based on your skills, projects, and career aspirations.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4 text-primary">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Intelligent Networking</h3>
            <p className="text-muted-foreground">
              Connect with the right people based on mutual interests and opportunities, not cold outreach.
            </p>
          </Card>
        </div>

        {/* Stats Section */}
        <Card className="bg-card rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <p className="text-muted-foreground">of users land interviews within 30 days</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">3x</div>
              <p className="text-muted-foreground">faster job placement compared to traditional methods</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">92%</div>
              <p className="text-muted-foreground">employer satisfaction with candidate matches</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}