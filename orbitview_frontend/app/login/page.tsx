"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Github, 
  Linkedin, 
  Mail,
  Lock,
  BrainCog,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login
    console.log("Login submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="flex items-center gap-2 mb-8">
          <BrainCog className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Welcome back</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  id="email" 
                  type="email" 
                  className="pl-10" 
                  placeholder="Enter your email" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  id="password" 
                  type="password" 
                  className="pl-10" 
                  placeholder="Enter your password" 
                  required 
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign In
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" className="w-full">
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button variant="outline" type="button" className="w-full">
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}