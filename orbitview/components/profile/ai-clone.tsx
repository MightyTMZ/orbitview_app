"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { EditDialog } from "./edit-dialog";
import { Brain, MessageSquare, Bot, Sparkles, User, Users, Lightbulb } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'soft-skills' | 'experience';
}

export function AICloneSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: "1",
      title: "Problem-Solving Approach",
      description: "Demonstrates strong analytical skills with a methodical approach to breaking down complex problems. Particularly evident in the AI Analytics Dashboard project.",
      category: "technical"
    },
    {
      id: "2",
      title: "Team Collaboration",
      description: "Shows excellent communication and leadership skills through cross-functional team coordination in multiple projects.",
      category: "soft-skills"
    },
    {
      id: "3",
      title: "Technical Expertise",
      description: "Deep understanding of AI/ML technologies with practical implementation experience in production environments.",
      category: "experience"
    }
  ]);

  const [question, setQuestion] = useState("");

  const handleAskQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date()
    };

    // In a real implementation, this would call an AI service
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Thanks for asking! Here's what I can tell you about "${question}"...

Based on my experience and projects, I would approach this by...

Would you like to know more about any specific aspect?`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage, aiResponse]);
    setQuestion("");
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Clone
          </h2>
          <p className="text-muted-foreground">Ask questions to learn more about my experience and approach</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 h-[400px] overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <Bot className="w-12 h-12 mb-4" />
                <p>Ask me anything about my experience, skills, or approach to problem-solving!</p>
                <p className="text-sm">Example questions:</p>
                <ul className="text-sm mt-2">
                  <li>"How do you approach complex technical challenges?"</li>
                  <li>"What's your experience with AI/ML projects?"</li>
                  <li>"Tell me about your leadership style."</li>
                </ul>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleAskQuestion} className="flex gap-2">
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1"
            />
            <Button type="submit">Ask</Button>
          </form>
        </div>

        {/* Insights Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            <Lightbulb className="w-5 h-5" />
            <h3>AI Insights</h3>
          </div>
          <div className="space-y-3">
            {insights.map(insight => (
              <div key={insight.id} className="p-3 bg-secondary/30 rounded-lg">
                <h4 className="font-medium mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground">{insight.description}</p>
                <Badge variant="secondary" className="mt-2">
                  {insight.category}
                </Badge>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
            <Users className="w-4 h-4" />
            <span>Compatible with 92% of your job preferences</span>
          </div>
        </div>
      </div>
    </Card>
  );
}