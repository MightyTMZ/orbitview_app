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
  MessageSquare,
  UserPlus,
  Star,
  Briefcase,
  GraduationCap,
  Trophy,
  Brain,
  Target,
  BarChart3,
  Link as LinkIcon,
  ExternalLink,
  Clock
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
    change: number;
  }[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export default function UserProfilePage() {
  const [user] = useState({
    name: "Sarah Chen",
    title: "Senior AI Research Engineer",
    company: "AI Solutions Inc.",
    location: "San Francisco Bay Area",
    bio: "AI researcher and engineer with 8+ years of experience in machine learning and deep learning. Focused on developing scalable AI solutions that solve real-world problems. Published author in top ML conferences.",
    stats: {
      connections: 2840,
      recommendations: 24,
      posts: 156
    },
    skills: [
      "Machine Learning",
      "Deep Learning",
      "PyTorch",
      "TensorFlow",
      "Computer Vision",
      "Natural Language Processing",
      "MLOps",
      "Python",
      "Research"
    ],
    endorsements: {
      "Machine Learning": 48,
      "Deep Learning": 35,
      "PyTorch": 29
    },
    matchScore: 92
  });

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "Large Language Model for Code Generation",
      description: "Led the development of a specialized LLM for code generation and documentation. Implemented novel architecture improvements that increased code completion accuracy.",
      technologies: ["PyTorch", "Transformers", "Python", "CUDA"],
      metrics: [
        {
          label: "Accuracy",
          value: "+40%",
          change: 40
        },
        {
          label: "Inference Speed",
          value: "-35%",
          change: -35
        }
      ]
    },
    {
      id: "2",
      title: "Computer Vision Pipeline Optimization",
      description: "Optimized real-time object detection pipeline for edge devices. Reduced model size while maintaining accuracy through quantization and pruning.",
      technologies: ["TensorFlow", "OpenCV", "C++", "TensorRT"],
      metrics: [
        {
          label: "Model Size",
          value: "-65%",
          change: -65
        },
        {
          label: "FPS",
          value: "+85%",
          change: 85
        }
      ]
    }
  ]);

  const [experience] = useState<Experience[]>([
    {
      id: "1",
      title: "Senior AI Research Engineer",
      company: "AI Solutions Inc.",
      period: "2020 - Present",
      description: "Leading research in large language models and computer vision. Managing a team of 5 researchers and collaborating with product teams to deploy AI solutions at scale."
    },
    {
      id: "2",
      title: "Machine Learning Engineer",
      company: "Tech Innovations Ltd",
      period: "2018 - 2020",
      description: "Developed and deployed machine learning models for recommendation systems and natural language processing applications."
    }
  ]);

  const [education] = useState<Education[]>([
    {
      id: "1",
      degree: "Ph.D. in Computer Science",
      school: "Stanford University",
      period: "2015 - 2018",
      description: "Research focus on deep learning architectures for computer vision. Published 5 papers in top-tier conferences."
    },
    {
      id: "2",
      degree: "M.S. in Computer Science",
      school: "UC Berkeley",
      period: "2013 - 2015",
      description: "Specialized in machine learning and artificial intelligence."
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4">
          <div className="py-8">
            <div className="flex items-start justify-between">
              <div className="flex gap-6">
                <Avatar className="w-32 h-32 border-4 border-background">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Target className="w-3 h-3 mr-1" />
                      {user.matchScore}% match
                    </Badge>
                  </div>
                  <p className="text-xl text-muted-foreground">{user.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{user.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold">{user.stats.connections}</p>
                  <p className="text-sm text-muted-foreground">Connections</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.stats.recommendations}</p>
                  <p className="text-sm text-muted-foreground">Recommendations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{user.stats.posts}</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </div>
              </div>
            </div>
            <div className="mt-6 max-w-2xl">
              <p className="text-muted-foreground">{user.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Projects */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div className="p-2 bg-secondary rounded-lg">
                          <Trophy className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{project.title}</h3>
                        <p className="mt-2 text-muted-foreground">{project.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          {project.metrics.map((metric, index) => (
                            <div key={index} className="bg-secondary/30 p-3 rounded-lg">
                              <div className="flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">{metric.label}</span>
                              </div>
                              <p className="text-2xl font-bold mt-1">{metric.value}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">{tech}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <Card key={exp.id} className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div className="p-2 bg-secondary rounded-lg">
                          <Briefcase className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                        <p className="mt-2">{exp.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <Card key={edu.id} className="p-6">
                    <div className="flex gap-4">
                      <div className="mt-1">
                        <div className="p-2 bg-secondary rounded-lg">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-muted-foreground">{edu.school}</p>
                        <p className="text-sm text-muted-foreground">{edu.period}</p>
                        <p className="mt-2">{edu.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
              <div className="space-y-4">
                {Object.entries(user.endorsements).map(([skill, count]) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{skill}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        <span>{count} endorsements</span>
                      </div>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div 
                        className="h-2 bg-primary rounded-full" 
                        style={{ width: `${(count / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 mt-6">
                  {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Career Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">AI Expertise</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Top 5% in machine learning and deep learning expertise among professionals in the Bay Area
                  </p>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Network Overlap</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    12 mutual connections in AI research and development
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
} 