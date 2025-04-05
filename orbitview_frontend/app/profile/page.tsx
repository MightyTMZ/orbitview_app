"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Building2, 
  GraduationCap, 
  MapPin, 
  Plus,
  Pencil,
  Trophy,
  Link as LinkIcon
} from "lucide-react";
import { ProfileHeader } from "@/components/profile/header";
import { ExperienceSection } from "@/components/profile/experience";
import { EducationSection } from "@/components/profile/education";
import { ProjectsSection } from "@/components/profile/projects";
import { BrandingSection } from "@/components/profile/branding";
import { AICloneSection } from "@/components/profile/ai-clone";
import { FreelanceSection } from "@/components/profile/freelance";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-6">
            <AICloneSection />
            <FreelanceSection />
            <BrandingSection />
            <ExperienceSection />
            <EducationSection />
            <ProjectsSection />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">AI Career Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-sm font-medium">Profile Strength</p>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                  <p className="text-2xl font-bold">324</p>
                  <p className="text-sm text-green-600">↑ 12% this week</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>React</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Node.js</Badge>
                <Badge>Python</Badge>
                <Badge>Machine Learning</Badge>
                <Badge>Data Analysis</Badge>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}