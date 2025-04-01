"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EditDialog } from "./edit-dialog";
import { 
  Sparkles, 
  Twitter, 
  Linkedin, 
  Github,
  Copy,
  Share2,
  MessageSquare,
  ThumbsUp,
  BarChart3
} from "lucide-react";

interface ContentPiece {
  id: string;
  type: 'linkedin' | 'twitter' | 'blog';
  title: string;
  content: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
  };
  tags: string[];
}

export function BrandingSection() {
  const [content, setContent] = useState<ContentPiece[]>([
    {
      id: "1",
      type: "linkedin",
      title: "The Future of AI in Software Development",
      content: "Just published my latest findings on how AI is transforming the software development lifecycle. Key insights:\n\n1. 40% reduction in debugging time\n2. 3x faster prototype development\n3. Improved code quality through AI-powered reviews\n\nExcited to share more detailed analysis in the comments! #AI #SoftwareDevelopment #Innovation",
      metrics: {
        views: 1200,
        likes: 89,
        comments: 24
      },
      tags: ["AI", "Software Development", "Innovation"]
    },
    {
      id: "2",
      type: "twitter",
      title: "Machine Learning Tips",
      content: "🚀 Quick ML tip:\n\nWhen fine-tuning large language models, start with a small learning rate (1e-5) and gradually increase if needed.\n\nSaved me 48 hours of training time last week!\n\n#MachineLearning #AI #TechTips",
      metrics: {
        views: 850,
        likes: 56,
        comments: 12
      },
      tags: ["Machine Learning", "Tips", "AI"]
    }
  ]);

  const handleGenerateContent = async (prompt: string) => {
    // In a real implementation, this would call an AI service
    const newContent = {
      id: Date.now().toString(),
      type: "linkedin" as const,
      title: "AI-Generated Post",
      content: `Generated content based on: ${prompt}\n\nThis is where the AI-generated content would go, tailored to your expertise and style.`,
      metrics: {
        views: 0,
        likes: 0,
        comments: 0
      },
      tags: ["AI", "Generated", "Content"]
    };
    setContent([newContent, ...content]);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Personal Brand Builder</h2>
          <p className="text-muted-foreground">AI-powered content creation to showcase your expertise</p>
        </div>
        <EditDialog 
          title="Generate Content"
          trigger={
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Content
            </Button>
          }
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleGenerateContent(formData.get("prompt") as string);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prompt">What would you like to share?</Label>
              <Textarea 
                id="prompt" 
                name="prompt" 
                placeholder="E.g., Share insights about my recent machine learning project" 
                className="h-32"
                required 
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Generate</Button>
            </div>
          </form>
        </EditDialog>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-medium">Brand Impact</h3>
            <p className="text-sm text-muted-foreground">Your content reached 2,050 professionals this week</p>
          </div>
        </div>

        <div className="space-y-6">
          {content.map((piece) => (
            <ContentCard key={piece.id} content={piece} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function ContentCard({ content }: { content: ContentPiece }) {
  const IconComponent = {
    linkedin: Linkedin,
    twitter: Twitter,
    blog: MessageSquare
  }[content.type];

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-secondary rounded-md">
            <IconComponent className="w-4 h-4" />
          </div>
          <span className="font-medium">{content.title}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm whitespace-pre-wrap">{content.content}</p>

      <div className="flex flex-wrap gap-2">
        {content.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>

      <div className="flex items-center gap-6 pt-2 border-t">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <ThumbsUp className="w-4 h-4" />
          <span>{content.metrics.likes}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MessageSquare className="w-4 h-4" />
          <span>{content.metrics.comments}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <BarChart3 className="w-4 h-4" />
          <span>{content.metrics.views} views</span>
        </div>
      </div>
    </div>
  );
}