"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search,
  MapPin,
  Building2,
  Clock,
  Briefcase,
  Users,
  Target,
  ArrowRight,
  Filter,
  Sparkles,
  GraduationCap,
  DollarSign,
  Star
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'internship';
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  skills: string[];
  matchScore: number;
  applicants: number;
  companyInfo: {
    size: string;
    industry: string;
    rating: number;
  };
}

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "AI Research Engineer",
      company: "TechCorp AI",
      location: "San Francisco, CA (Hybrid)",
      type: "full-time",
      salary: "$120,000 - $180,000",
      posted: "2 days ago",
      description: "Join our AI research team to develop cutting-edge machine learning models and push the boundaries of artificial intelligence. Work on real-world applications of AI that impact millions of users.",
      requirements: [
        "MS/PhD in Computer Science or related field",
        "3+ years of experience in ML/AI",
        "Strong Python programming skills",
        "Experience with PyTorch or TensorFlow"
      ],
      skills: ["Python", "Machine Learning", "Deep Learning", "PyTorch", "Research"],
      matchScore: 95,
      applicants: 42,
      companyInfo: {
        size: "1,000-5,000",
        industry: "Artificial Intelligence",
        rating: 4.8
      }
    },
    {
      id: "2",
      title: "Machine Learning Internship",
      company: "AI Startups Inc",
      location: "Remote",
      type: "internship",
      salary: "$45/hr",
      posted: "1 day ago",
      description: "Exciting opportunity for students to gain hands-on experience in machine learning and AI development. Work with senior engineers on production ML models.",
      requirements: [
        "Currently pursuing BS/MS in Computer Science",
        "Strong programming fundamentals",
        "Basic understanding of ML concepts",
        "Excellent problem-solving skills"
      ],
      skills: ["Python", "Machine Learning", "Data Science", "SQL"],
      matchScore: 88,
      applicants: 76,
      companyInfo: {
        size: "50-200",
        industry: "Technology",
        rating: 4.5
      }
    },
    {
      id: "3",
      title: "Full Stack AI Engineer",
      company: "Future Systems",
      location: "New York, NY (On-site)",
      type: "full-time",
      salary: "$140,000 - $200,000",
      posted: "3 days ago",
      description: "Looking for a full-stack engineer with AI expertise to build intelligent web applications. Work on projects combining modern web technologies with AI/ML capabilities.",
      requirements: [
        "5+ years of full-stack development experience",
        "Experience with AI/ML integration in web apps",
        "Proficiency in React, Node.js, and Python",
        "Understanding of ML deployment workflows"
      ],
      skills: ["React", "Node.js", "Python", "AI Integration", "AWS"],
      matchScore: 92,
      applicants: 38,
      companyInfo: {
        size: "500-1,000",
        industry: "Enterprise Software",
        rating: 4.6
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">AI-Powered Job Search</h1>
          <p className="text-muted-foreground mb-6">Discover opportunities matched to your skills and career goals</p>
          
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Search jobs by title, company, or keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recommended for you</h2>
              <Button variant="ghost" className="text-sm">
                View all
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Your Job Search</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Match Score</h4>
                  </div>
                  <p className="text-2xl font-bold">92%</p>
                  <p className="text-sm text-muted-foreground">Average match with shown jobs</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm font-medium mb-1">Profile Views</p>
                    <p className="text-xl font-bold">48</p>
                    <p className="text-xs text-green-600">↑ 15% this week</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <p className="text-sm font-medium mb-1">Applications</p>
                    <p className="text-xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Job Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>San Francisco Bay Area</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span>Full-time, Internship</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>$120k - $200k</span>
                </div>
                <Button className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Update Preferences
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const typeColors = {
    'full-time': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'internship': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <Badge variant="secondary" className={job.type === 'internship' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}>
              {job.type === 'internship' ? 'Internship' : 'Full-time'}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
          <Target className="w-4 h-4 text-primary" />
          <span className="font-medium">{job.matchScore}% match</span>
        </div>
      </div>

      <p className="text-sm mb-4">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <Badge key={skill} variant="secondary">{skill}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{job.posted}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>{job.applicants} applicants</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span>{job.companyInfo.rating}/5</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {job.companyInfo.size} employees • {job.companyInfo.industry}
        </div>
        <Button>
          Apply Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}