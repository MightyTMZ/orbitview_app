"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, GraduationCap } from "lucide-react";
import { EditDialog } from "./edit-dialog";

interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  description: string;
}

export function EducationSection() {
  const [educations, setEducations] = useState<Education[]>([
    {
      id: "1",
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      period: "2018 - 2020",
      description: "Specialized in Machine Learning and Artificial Intelligence. Research focus on Natural Language Processing."
    },
    {
      id: "2",
      degree: "Bachelor of Science in Computer Engineering",
      school: "MIT",
      period: "2014 - 2018",
      description: "Dean's List. Senior thesis on Distributed Systems."
    }
  ]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEducation = {
      id: Date.now().toString(),
      degree: formData.get("degree") as string,
      school: formData.get("school") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    };
    setEducations([newEducation, ...educations]);
  };

  const handleEdit = (id: string, updatedData: Partial<Education>) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, ...updatedData } : edu
    ));
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Education</h2>
        <EditDialog 
          title="Add Education"
          trigger={
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          }
        >
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" placeholder="Degree Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input id="school" name="school" placeholder="School Name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="period">Period</Label>
              <Input id="period" name="period" placeholder="e.g., 2018 - 2020" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe your studies and achievements" required />
            </div>
            <Button type="submit" className="w-full">Add Education</Button>
          </form>
        </EditDialog>
      </div>
      
      <div className="space-y-6">
        {educations.map((education) => (
          <EducationItem
            key={education.id}
            education={education}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </Card>
  );
}

function EducationItem({ education, onEdit }: {
  education: Education;
  onEdit: (id: string, data: Partial<Education>) => void;
}) {
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onEdit(education.id, {
      degree: formData.get("degree") as string,
      school: formData.get("school") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    });
  };

  return (
    <div className="flex gap-4">
      <div className="mt-1">
        <div className="p-2 bg-secondary rounded-lg">
          <GraduationCap className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{education.degree}</h3>
            <p className="text-muted-foreground">{education.school}</p>
            <p className="text-sm text-muted-foreground">{education.period}</p>
          </div>
          <EditDialog title="Edit Education">
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input id="degree" name="degree" defaultValue={education.degree} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">School</Label>
                <Input id="school" name="school" defaultValue={education.school} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input id="period" name="period" defaultValue={education.period} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" defaultValue={education.description} />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </EditDialog>
        </div>
        <p className="mt-2">{education.description}</p>
      </div>
    </div>
  );
}