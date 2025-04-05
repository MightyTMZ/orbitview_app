"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Pencil, MapPin, Building2 } from "lucide-react";
import { EditDialog } from "./edit-dialog";

export function ProfileHeader() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    title: "AI Engineer & Full Stack Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    bio: "Passionate about building AI-powered applications that solve real-world problems. Experienced in machine learning, full-stack development, and cloud architecture. Always eager to learn and collaborate on innovative projects."
  });

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setProfile({
      name: formData.get("name") as string,
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      bio: formData.get("bio") as string,
    });
  };

  return (
    <div className="bg-card border-b">
      <div className="container mx-auto px-4">
        <div className="py-8">
          <div className="flex items-start justify-between">
            <div className="flex gap-6">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold">{profile.name}</h1>
                  <EditDialog title="Edit Profile">
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" defaultValue={profile.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" defaultValue={profile.title} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" name="company" defaultValue={profile.company} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={profile.location} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea id="bio" name="bio" defaultValue={profile.bio} />
                      </div>
                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </EditDialog>
                </div>
                <p className="text-xl text-muted-foreground mt-1">{profile.title}</p>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    <span>{profile.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-muted-foreground max-w-2xl">{profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}