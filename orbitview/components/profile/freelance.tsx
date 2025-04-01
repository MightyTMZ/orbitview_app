"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EditDialog } from "./edit-dialog";
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  Star,
  Sparkles,
  Rocket,
  Target,
  Users,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  description: string;
  budget: string;
  duration: string;
  skills: string[];
  matchScore: number;
  status: 'open' | 'in_progress' | 'completed';
}

export function FreelanceSection() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: "1",
      title: "Custom GPT Model Development",
      company: "AI Startup Inc.",
      description: "Need a skilled developer to create and fine-tune a custom GPT model for our customer service automation platform. The model should understand industry-specific terminology and provide accurate responses.",
      budget: "$2,000 - $3,500",
      duration: "2-3 weeks",
      skills: ["Python", "OpenAI API", "Machine Learning", "NLP"],
      matchScore: 95,
      status: 'open'
    },
    {
      id: "2",
      title: "AI-Powered Analytics Dashboard",
      company: "TechVision Labs",
      description: "Looking for a developer to build a real-time analytics dashboard that uses AI to predict user behavior and provide actionable insights. Must have experience with data visualization and machine learning.",
      budget: "$3,000 - $5,000",
      duration: "4 weeks",
      skills: ["React", "Python", "TensorFlow", "D3.js"],
      matchScore: 88,
      status: 'in_progress'
    },
    {
      id: "3",
      title: "ML Model Optimization",
      company: "DataTech Solutions",
      description: "Successfully optimized the performance of a recommendation engine, reducing inference time by 60% while maintaining accuracy. Implemented model quantization and pruning techniques.",
      budget: "$1,800",
      duration: "2 weeks",
      skills: ["PyTorch", "Model Optimization", "Python"],
      matchScore: 100,
      status: 'completed'
    }
  ]);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            AI-Powered Opportunities
          </h2>
          <p className="text-muted-foreground">High-impact freelance projects matched to your skills</p>
        </div>
        <Button>
          <Sparkles className="w-4 h-4 mr-2" />
          Find Opportunities
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Match Rate</h3>
            </div>
            <p className="text-2xl font-bold">94%</p>
            <p className="text-sm text-muted-foreground">Average project match score</p>
          </Card>
          
          <Card className="p-4 bg-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Earnings</h3>
            </div>
            <p className="text-2xl font-bold">$4,800</p>
            <p className="text-sm text-muted-foreground">Total earnings this month</p>
          </Card>

          <Card className="p-4 bg-secondary/30">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <h3 className="font-medium">Success Rate</h3>
            </div>
            <p className="text-2xl font-bold">100%</p>
            <p className="text-sm text-muted-foreground">Project completion rate</p>
          </Card>
        </div>

        <div className="space-y-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const statusColors = {
    open: "text-green-500",
    in_progress: "text-blue-500",
    completed: "text-purple-500"
  };

  const statusLabels = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed"
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold">{opportunity.title}</h3>
            <Badge variant="secondary" className={statusColors[opportunity.status]}>
              {statusLabels[opportunity.status]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{opportunity.company}</p>
        </div>
        <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
          <Target className="w-4 h-4 text-primary" />
          <span className="font-medium">{opportunity.matchScore}% match</span>
        </div>
      </div>

      <p className="text-sm mb-4">{opportunity.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span>{opportunity.budget}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{opportunity.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>4 proposals</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {opportunity.skills.map((skill) => (
          <Badge key={skill} variant="secondary">{skill}</Badge>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="w-4 h-4" />
          <span>Verified client</span>
        </div>
        {opportunity.status === 'open' && (
          <Button>
            Submit Proposal
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}