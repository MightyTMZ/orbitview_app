"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth";
import { 
  Github, 
  Linkedin, 
  Mail,
  Lock,
  User,
  Building2,
  BrainCog,
  Rocket,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    re_password: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step < 3) {
      const form = e.currentTarget;
      const newData = Object.fromEntries(new FormData(form));
      setFormData(prev => ({ ...prev, ...newData }));
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      await register(formData);
      toast({
        title: "Registration successful",
        description: "Welcome to OrbitView!",
      });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.response?.data?.detail || "Please check your information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="flex items-center gap-2 mb-8">
          <BrainCog className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    className="pl-10" 
                    placeholder="Enter your email" 
                    defaultValue={formData.email}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    className="pl-10" 
                    placeholder="Create a password" 
                    defaultValue={formData.password}
                    required 
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="re_password" 
                    name="re_password" 
                    type="password" 
                    className="pl-10" 
                    placeholder="Confirm password" 
                    defaultValue={formData.re_password}
                    required 
                  />
                </div>
                <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="first_name" 
                    name="first_name" 
                    type="text" 
                    className="pl-10" 
                    placeholder="Enter your first name" 
                    defaultValue={formData.first_name}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    id="last_name" 
                    name="last_name" 
                    type="text" 
                    className="pl-10" 
                    placeholder="Enter your last name" 
                    defaultValue={formData.last_name}
                    required 
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label>What brings you to OrbitView?</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <Button type="button" variant="outline" className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                    <Rocket className="w-6 h-6" />
                    <span>Career Growth</span>
                  </Button>
                  <Button type="button" variant="outline" className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                    <BrainCog className="w-6 h-6" />
                    <span>Skill Development</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {step === 3 ? (isLoading ? "Creating account..." : "Complete Sign Up") : "Continue"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {step === 1 && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
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
            </>
          )}
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>

        {step > 1 && (
          <Button
            variant="ghost"
            className="absolute top-4 left-4"
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}
      </Card>
    </div>
  );
}