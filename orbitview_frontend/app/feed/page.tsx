"use client";

import React, { useState, useCallback, useMemo } from "react";
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Image,
  FileText,
  Link as LinkIcon,
  MoreHorizontal,
  MessageSquare,
  Heart,
  Share2,
  Bookmark,
  ThumbsUp,
  Clock,
  FileUp,
  BookOpen,
  Globe,
  Users,
  ChevronDown,
  Plus
} from 'lucide-react';
import Link from "next/link";

interface Post {
  id: string;
  type: 'post' | 'article' | 'resource';
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: {
    text: string;
    image?: string;
    url?: string;
    fileType?: string;
    fileSize?: string;
  };
  timestamp: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  tags: string[];
  isLiked: boolean;
  isBookmarked: boolean;
  readingTime?: string;
}

const POSTS_PER_PAGE = 5;

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [showFullContent, setShowFullContent] = useState<Record<string, boolean>>({});
  const [newPost, setNewPost] = useState("");
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      type: "article",
      author: {
        name: "Sarah Chen",
        title: "AI Research Engineer",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: {
        text: `🎯 Finding Balance in Tech: A Guide to Sustainable Growth

As tech professionals, we often find ourselves caught in the endless cycle of learning and delivering. Here's how I maintain balance while staying ahead:

1. Focused Learning Windows
Instead of constant consumption, dedicate specific time blocks for learning. Quality over quantity.

2. Project Boundaries
Set clear start and end times. Not everything needs to be perfect - done is better than perfect.

3. Regular Reflection
Take time to celebrate wins and learn from challenges. Growth isn't just about moving forward.

4. Community Connection
Share knowledge and learn from peers. We're all in this together.

Remember: Sustainable growth is a marathon, not a sprint. What strategies work for you?

#TechWellness #SustainableGrowth #WorkLifeBalance`,
      },
      timestamp: "2 hours ago",
      metrics: {
        likes: 128,
        comments: 24,
        shares: 12
      },
      tags: ["Wellness", "Career Growth", "Tech Life"],
      isLiked: false,
      isBookmarked: true,
      readingTime: "3 min read"
    },
    {
      id: "2",
      type: "post",
      author: {
        name: "Michael Rodriguez",
        title: "Senior Software Engineer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: {
        text: "Just wrapped up an amazing workshop on mindful coding practices! Here's a snapshot from our meditation break. Remember: taking care of your mental health is just as important as writing clean code. 🧘‍♂️💻",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
      },
      timestamp: "5 hours ago",
      metrics: {
        likes: 256,
        comments: 42,
        shares: 18
      },
      tags: ["Mindfulness", "Developer Life"],
      isLiked: true,
      isBookmarked: false
    },
    {
      id: "3",
      type: "resource",
      author: {
        name: "Emily Johnson",
        title: "Learning Experience Designer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      content: {
        text: "📚 Sharing my curated collection of resources on building healthy tech habits. This guide includes practical tips, research-backed strategies, and templates for creating your own wellness routine.",
        fileType: "PDF Guide",
        fileSize: "2.4 MB",
        url: "#"
      },
      timestamp: "1 day ago",
      metrics: {
        likes: 89,
        comments: 15,
        shares: 45
      },
      tags: ["Resources", "Productivity", "Wellness"],
      isLiked: false,
      isBookmarked: true
    }
  ]);

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (activeTab === 'all') return true;
      if (activeTab === 'articles') return post.type === 'article';
      if (activeTab === 'resources') return post.type === 'resource';
      return true;
    });
  }, [posts, activeTab]);

  const paginatedPosts = useMemo(() => {
    return filteredPosts.slice(0, page * POSTS_PER_PAGE);
  }, [filteredPosts, page]);

  const loadMore = useCallback(() => {
    if (inView && paginatedPosts.length < filteredPosts.length) {
      setPage(prev => prev + 1);
    }
  }, [inView, paginatedPosts.length, filteredPosts.length]);

  const toggleContent = useCallback((postId: string) => {
    setShowFullContent(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  }, []);

  const handleNewPost = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObj: Post = {
      id: Date.now().toString(),
      type: 'post',
      author: {
        name: "John Doe",
        title: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      content: {
        text: newPost
      },
      timestamp: "Just now",
      metrics: {
        likes: 0,
        comments: 0,
        shares: 0
      },
      tags: [],
      isLiked: false,
      isBookmarked: false
    };

    setPosts(prev => [newPostObj, ...prev]);
    setNewPost("");
  }, [newPost]);

  React.useEffect(() => {
    loadMore();
  }, [inView, loadMore]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="p-6">
              <form onSubmit={handleNewPost} className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Textarea
                    placeholder="Share your thoughts, insights, or resources..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="flex-1 resize-none"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Article
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <FileUp className="w-4 h-4 mr-2" />
                      Resource
                    </Button>
                  </div>
                  <Button type="submit" size="sm">Share</Button>
                </div>
              </form>
            </Card>

            {/* Content Filter */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  All
                </TabsTrigger>
                <TabsTrigger value="articles" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Articles
                </TabsTrigger>
                <TabsTrigger value="resources" className="flex items-center gap-2">
                  <FileUp className="w-4 h-4" />
                  Resources
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Content Feed */}
            <div className="space-y-6">
              {paginatedPosts.map((post) => (
                <Card key={post.id} className="p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <span className="text-muted-foreground">•</span>
                          <Button variant="link" className="h-auto p-0">
                            Follow
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.author.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          {post.readingTime && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{post.readingTime}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-4">
                    <div className={showFullContent[post.id] ? '' : 'line-clamp-6'}>
                      <p className="whitespace-pre-wrap">{post.content.text}</p>
                    </div>
                    
                    {post.content.text.length > 240 && (
                      <Button
                        variant="link"
                        className="p-0 h-auto"
                        onClick={() => toggleContent(post.id)}
                      >
                        {showFullContent[post.id] ? 'Show less' : 'Read more'}
                      </Button>
                    )}

                    {post.content.image && (
                      <img
                        src={post.content.image}
                        alt=""
                        className="rounded-lg w-full"
                        loading="lazy"
                      />
                    )}

                    {post.type === 'resource' && post.content.url && (
                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background rounded-lg">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{post.content.fileType}</p>
                            <p className="text-sm text-muted-foreground">{post.content.fileSize}</p>
                          </div>
                        </div>
                        <Button>
                          Download
                        </Button>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">#{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm" className={post.isLiked ? 'text-primary' : ''}>
                        <Heart className="w-4 h-4 mr-2" />
                        {post.metrics.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {post.metrics.comments}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        {post.metrics.shares}
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={post.isBookmarked ? 'text-primary' : ''}
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}

              {/* Infinite scroll trigger */}
              <div ref={ref} className="h-10" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#TechWellness</p>
                    <p className="text-sm text-muted-foreground">1,234 posts</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#MindfulTech</p>
                    <p className="text-sm text-muted-foreground">856 posts</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#BalancedGrowth</p>
                    <p className="text-sm text-muted-foreground">642 posts</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                See more topics
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </Card>

            {/* Suggested Connections */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Grow Your Network</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>EJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Emily Johnson</p>
                      <p className="text-sm text-muted-foreground">AI Researcher</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Michael Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Tech Lead</p>
                    </div>
                  </div>
                  <Button size="sm">Connect</Button>
                </div>
              </div>
              <Button variant="ghost" className="w-full mt-4">
                View all suggestions
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}