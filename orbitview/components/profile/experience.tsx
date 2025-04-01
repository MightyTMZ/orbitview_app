"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Briefcase } from "lucide-react";
import { EditDialog } from "./edit-dialog";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
}

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: "1",
      title: "Senior AI Engineer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description: "Led the development of machine learning models for predictive analytics. Improved system efficiency by 40% through optimization techniques."
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description: "Developed and maintained multiple web applications using React, Node.js, and AWS. Implemented CI/CD pipelines and automated testing."
    }
  ]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExperience = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    };
    setExperiences([newExperience, ...experiences]);
  };

  const handleEdit = (id: string, updatedData: Partial<Experience>) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, ...updatedData } : exp
    ));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Experience</h2>
        <EditDialog 
          title="Add Experience"
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          }
        >
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Job Title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Company Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input id="period" name="period" placeholder="e.g., 2022 - Present" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your role and achievements" required />
            </div>
            <Button type="submit" className="w-full">Add Experience</Button>
          </form>
        </EditDialog>
      </div>
      
      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </Card>
  );
}

function ExperienceItem({ experience, onEdit }: {
  experience: Experience;
  onEdit: (id: string, data: Partial<Experience>) => void;
}) {
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onEdit(experience.id, {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    });
  };

  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="p-2 bg-secondary rounded-lg">
          <Briefcase className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{experience.title}</h3>
            <p className="text-muted-foreground">{experience.company}</p>
            <p className="text-sm text-muted-foreground">{experience.period}</p>
          </div>
          <EditDialog title="Edit Experience">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={experience.title} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" defaultValue={experience.company} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input id="period" name="period" defaultValue={experience.period} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={experience.description} />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </EditDialog>
        </div>
        <p className="mt-2">{experience.description}</p>
      </div>
    </div>
  );
}