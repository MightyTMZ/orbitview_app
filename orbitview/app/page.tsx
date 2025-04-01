"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BrainCog, Rocket, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Your AI-Powered Career Accelerator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Showcase your true potential, connect with opportunities, and build your career in the AI era - all powered by intelligent automation.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">See Demo</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BrainCog className="w-8 h-8" />}
            title="AI-Driven Portfolio"
            description="Showcase your projects and impact with AI-generated case studies and metrics that matter to employers."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Smart Job Matching"
            description="Get personalized job and internship matches based on your skills, projects, and career aspirations."
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Intelligent Networking"
            description="Connect with the right people based on mutual interests and opportunities, not cold outreach."
          />
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <StatCard number="85%" text="of users land interviews within 30 days" />
            <StatCard number="3x" text="faster job placement compared to traditional methods" />
            <StatCard number="92%" text="employer satisfaction with candidate matches" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </Card>
  );
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}