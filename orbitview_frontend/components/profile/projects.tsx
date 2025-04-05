"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trophy, Link as LinkIcon, BarChart3, ArrowUp, Target, Sparkles, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EditDialog } from "./edit-dialog";

interface ProjectMetric {
  label: string;
  value: string;
  change: number;
  icon: JSX.Element;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  metrics: ProjectMetric[];
  caseStudy?: {
    challenge: string;
    solution: string;
    impact: string;
  };
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "AI-Powered Analytics Dashboard",
      description: "Built a real-time analytics dashboard using React, Python, and TensorFlow. Implemented predictive analytics features that increased user engagement by 45%.",
      technologies: ["React", "Python", "TensorFlow", "AWS"],
      link: "https://github.com/johndoe/analytics-dashboard",
      metrics: [
        {
          label: "User Engagement",
          value: "+45%",
          change: 45,
          icon: <ArrowUp className="w-4 h-4 text-green-500" />
        },
        {
          label: "Processing Time",
          value: "-60%",
          change: -60,
          icon: <BarChart3 className="w-4 h-4 text-blue-500" />
        },
        {
          label: "Accuracy",
          value: "95%",
          change: 95,
          icon: <Target className="w-4 h-4 text-purple-500" />
        }
      ],
      caseStudy: {
        challenge: "The client needed to process large volumes of user behavior data in real-time to make informed business decisions. Traditional analytics solutions were too slow and didn't provide actionable insights.",
        solution: "Implemented a custom machine learning pipeline using TensorFlow that processes user events in real-time. Built a React dashboard with interactive visualizations and predictive analytics features.",
        impact: "Reduced data processing time by 60% and increased user engagement by 45%. The predictive features helped identify user churn risks with 95% accuracy, leading to improved retention strategies."
      }
    },
    {
      id: "2",
      title: "Natural Language Processing API",
      description: "Developed a REST API for text analysis and sentiment prediction. Achieved 92% accuracy in sentiment classification.",
      technologies: ["Python", "FastAPI", "spaCy", "Docker"],
      link: "https://github.com/johndoe/nlp-api",
      metrics: [
        {
          label: "Accuracy",
          value: "92%",
          change: 92,
          icon: <Target className="w-4 h-4 text-purple-500" />
        },
        {
          label: "Response Time",
          value: "-35%",
          change: -35,
          icon: <BarChart3 className="w-4 h-4 text-blue-500" />
        }
      ],
      caseStudy: {
        challenge: "Needed to analyze large volumes of customer feedback across multiple languages to identify sentiment patterns and key issues.",
        solution: "Built a scalable NLP API using FastAPI and spaCy, with custom models for sentiment analysis and key phrase extraction.",
        impact: "Achieved 92% accuracy in sentiment classification and reduced response time by 35%. Helped identify critical customer issues 48 hours faster than manual analysis."
      }
    }
  ]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const technologies = (formData.get("technologies") as string).split(",").map(t => t.trim());
    const newProject = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies,
      link: formData.get("link") as string,
      metrics: [],
      caseStudy: {
        challenge: formData.get("challenge") as string,
        solution: formData.get("solution") as string,
        impact: formData.get("impact") as string,
      }
    };
    setProjects([newProject, ...projects]);
  };

  const handleEdit = (id: string, updatedData: Partial<Project>) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, ...updatedData } : proj
    ));
  };

  const generateCaseStudy = async (project: Project) => {
    // In a real implementation, this would call an AI service
    const aiGeneratedCaseStudy = {
      challenge: "AI-generated challenge description would go here...",
      solution: "AI-generated solution description would go here...",
      impact: "AI-generated impact analysis would go here..."
    };
    handleEdit(project.id, { caseStudy: aiGeneratedCaseStudy });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Projects & Impact</h2>
        <EditDialog 
          title="Add Project"
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          }
        >
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Project Title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your project and its impact" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies</Label>
              <Input id="technologies" name="technologies" placeholder="React, Node.js, etc. (comma-separated)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Project Link</Label>
              <Input id="link" name="link" placeholder="https://github.com/..." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="challenge">Challenge</Label>
              <Textarea id="challenge" name="challenge" placeholder="What problem did you solve?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="solution">Solution</Label>
              <Textarea id="solution" name="solution" placeholder="How did you solve it?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="impact">Impact</Label>
              <Textarea id="impact" name="impact" placeholder="What were the results?" required />
            </div>
            <Button type="submit" className="w-full">Add Project</Button>
          </form>
        </EditDialog>
      </div>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onEdit={handleEdit}
            onGenerateCaseStudy={generateCaseStudy}
          />
        ))}
      </div>
    </Card>
  );
}

function ProjectItem({ project, onEdit, onGenerateCaseStudy }: {
  project: Project;
  onEdit: (id: string, data: Partial<Project>) => void;
  onGenerateCaseStudy: (project: Project) => void;
}) {
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const technologies = (formData.get("technologies") as string).split(",").map(t => t.trim());
    onEdit(project.id, {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies,
      link: formData.get("link") as string,
      caseStudy: {
        challenge: formData.get("challenge") as string,
        solution: formData.get("solution") as string,
        impact: formData.get("impact") as string,
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="mt-1">
          <div className="p-2 bg-secondary rounded-lg">
            <Trophy className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{project.title}</h3>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <LinkIcon className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onGenerateCaseStudy(project)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Case Study
              </Button>
              <EditDialog title="Edit Project">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" name="title" defaultValue={project.title} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" defaultValue={project.description} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="technologies">Technologies</Label>
                    <Input id="technologies" name="technologies" defaultValue={project.technologies.join(", ")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link">Project Link</Label>
                    <Input id="link" name="link" defaultValue={project.link} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="challenge">Challenge</Label>
                    <Textarea id="challenge" name="challenge" defaultValue={project.caseStudy?.challenge} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="solution">Solution</Label>
                    <Textarea id="solution" name="solution" defaultValue={project.caseStudy?.solution} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="impact">Impact</Label>
                    <Textarea id="impact" name="impact" defaultValue={project.caseStudy?.impact} />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
              </EditDialog>
            </div>
          </div>
          <p className="mt-2">{project.description}</p>
          
          {project.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="bg-secondary/50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>

          {project.caseStudy && (
            <div className="mt-4 space-y-4 bg-secondary/30 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <h4 className="font-semibold">Case Study</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium">Challenge</h5>
                  <p className="text-sm text-muted-foreground">{project.caseStudy.challenge}</p>
                </div>
                <div>
                  <h5 className="font-medium">Solution</h5>
                  <p className="text-sm text-muted-foreground">{project.caseStudy.solution}</p>
                </div>
                <div>
                  <h5 className="font-medium">Impact</h5>
                  <p className="text-sm text-muted-foreground">{project.caseStudy.impact}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}