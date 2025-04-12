"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search,
  MapPin,
  Building2,
  Clock,
  Briefcase,
  Users,
  Target,
  ArrowRight,
  Filter,
  Sparkles,
  GraduationCap,
  DollarSign,
  Star,
  ChevronLeft,
  ChevronRight,
  Brain,
  Bot,
  Rocket,
  Zap
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'internship';
  salary: string;
  posted: string;
  description: string;
  requirements: string[];
  skills: string[];
  matchScore: number;
  applicants: number;
  companyInfo: {
    size: string;
    industry: string;
    rating: number;
  };
}

const ITEMS_PER_PAGE = 5;

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([
    // ... (keep your existing jobs data)
  ]);

  // Traditional search filters
  const [locationFilter, setLocationFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<'all' | 'full-time' | 'internship'>('all');

  // Filter jobs based on traditional search criteria
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = typeFilter === 'all' || job.type === typeFilter;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Handle AI job search
  const handleAiSearch = async () => {
    setIsGenerating(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, this would call an AI service
    const relevantJobs = jobs
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 5);
    
    setJobs(prevJobs => [...relevantJobs, ...prevJobs]);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Next Opportunity</h1>
          <p className="text-muted-foreground mb-6">Discover opportunities matched to your skills and career goals</p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="traditional" className="space-y-8">
          <TabsList>
            <TabsTrigger value="traditional" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Traditional Search
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              AI-Powered Search
            </TabsTrigger>
          </TabsList>

          <TabsContent value="traditional">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Filters Sidebar */}
              <Card className="p-6 h-fit">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Input 
                      placeholder="Enter location..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Job Type</label>
                    <div className="flex gap-2">
                      <Button 
                        variant={typeFilter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTypeFilter('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={typeFilter === 'full-time' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTypeFilter('full-time')}
                      >
                        Full-time
                      </Button>
                      <Button 
                        variant={typeFilter === 'internship' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTypeFilter('internship')}
                      >
                        Internship
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience Level</label>
                    <Input 
                      placeholder="Years of experience..."
                      value={experienceFilter}
                      onChange={(e) => setExperienceFilter(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Salary Range</label>
                    <Input 
                      placeholder="e.g., $100k-$150k"
                      value={salaryFilter}
                      onChange={(e) => setSalaryFilter(e.target.value)}
                    />
                  </div>
                  <Button className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </Card>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      className="pl-10" 
                      placeholder="Search jobs by title, company, or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">{currentPage}</span>
                        <span className="text-sm text-muted-foreground">of</span>
                        <span className="text-sm font-medium">{totalPages}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* AI Search Input */}
              <div className="lg:col-span-3">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-semibold">AI Job Search</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Describe your ideal job, including your skills, experience, and preferences. Our AI will find the most relevant opportunities for you.
                  </p>
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Example: I'm a senior software engineer with 5 years of experience in React and Node.js. I'm looking for a remote position where I can lead teams and work on innovative projects..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      className="h-32"
                    />
                    <div className="flex gap-4">
                      <Button 
                        className="flex-1"
                        onClick={handleAiSearch}
                        disabled={!aiPrompt.trim() || isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Generating matches...
                          </>
                        ) : (
                          <>
                            <Rocket className="w-4 h-4 mr-2" />
                            Find Matching Jobs
                          </>
                        )}
                      </Button>
                      <Button variant="outline" onClick={() => setAiPrompt("")}>
                        Clear
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* AI Search Results */}
              {aiPrompt && !isGenerating && (
                <>
                  <Card className="p-6 h-fit">
                    <div className="flex items-center gap-2 mb-4">
                      <Target className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Match Analysis</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <h4 className="font-medium mb-2">Key Skills Identified</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge>React</Badge>
                          <Badge>Node.js</Badge>
                          <Badge>Team Leadership</Badge>
                        </div>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <h4 className="font-medium mb-2">Experience Level</h4>
                        <p className="text-sm text-muted-foreground">Senior (5+ years)</p>
                      </div>
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <h4 className="font-medium mb-2">Preferences</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>• Remote work</p>
                          <p>• Leadership opportunities</p>
                          <p>• Innovative projects</p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">AI-Matched Opportunities</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Zap className="w-3 h-3 mr-1" />
                        5 relevant matches
                      </Badge>
                    </div>
                    <div className="space-y-4">
                      {paginatedJobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{job.title}</h3>
            <Badge variant="secondary" className={job.type === 'internship' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}>
              {job.type === 'internship' ? 'Internship' : 'Full-time'}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded">
          <Target className="w-4 h-4 text-primary" />
          <span className="font-medium">{job.matchScore}% match</span>
        </div>
      </div>

      <p className="text-sm mb-4">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <Badge key={skill} variant="secondary">{skill}</Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="w-4 h-4 text-muted-foreground" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span>{job.posted}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span>{job.applicants} applicants</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Star className="w-4 h-4 text-muted-foreground" />
          <span>{job.companyInfo.rating}/5</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-sm text-muted-foreground">
          {job.companyInfo.size} employees • {job.companyInfo.industry}
        </div>
        <Button>
          Apply Now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}