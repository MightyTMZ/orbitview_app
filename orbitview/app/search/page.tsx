"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MapPin,
  Building2,
  Users,
  Star,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Globe,
  Brain,
  Target
} from "lucide-react";
import Link from "next/link";

interface Person {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  image: string;
  skills: string[];
  matchScore: number;
  connectionDegree?: '1st' | '2nd' | '3rd';
}

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  specialties: string[];
  rating: number;
  employees: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");

  const [people] = useState<Person[]>([
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior AI Research Engineer",
      company: "AI Solutions Inc.",
      location: "San Francisco, CA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      skills: ["Machine Learning", "PyTorch", "Computer Vision"],
      matchScore: 95,
      connectionDegree: "2nd"
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      title: "ML Engineer",
      company: "TechCorp",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      skills: ["Deep Learning", "TensorFlow", "NLP"],
      matchScore: 88,
      connectionDegree: "1st"
    },
    {
      id: "3",
      name: "Emily Johnson",
      title: "AI Product Manager",
      company: "DataTech Solutions",
      location: "Boston, MA",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      skills: ["Product Strategy", "AI Solutions", "Team Leadership"],
      matchScore: 82
    }
  ]);

  const [companies] = useState<Company[]>([
    {
      id: "1",
      name: "AI Solutions Inc.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      industry: "Artificial Intelligence",
      location: "San Francisco, CA",
      size: "1,000-5,000",
      description: "Leading AI research and development company specializing in enterprise solutions.",
      specialties: ["Machine Learning", "Computer Vision", "NLP"],
      rating: 4.8,
      employees: 3200
    },
    {
      id: "2",
      name: "TechCorp",
      logo: "https://images.unsplash.com/photo-1496200186974-4293800e2c20?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      industry: "Technology",
      location: "New York, NY",
      size: "5,000-10,000",
      description: "Global technology company building the future of enterprise software.",
      specialties: ["Cloud Computing", "AI/ML", "Enterprise Software"],
      rating: 4.6,
      employees: 7500
    },
    {
      id: "3",
      name: "DataTech Solutions",
      logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      industry: "Data Analytics",
      location: "Boston, MA",
      size: "500-1,000",
      description: "Innovative data analytics company transforming business intelligence.",
      specialties: ["Data Analytics", "Business Intelligence", "Machine Learning"],
      rating: 4.5,
      employees: 850
    }
  ]);

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Search</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search for people, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="people" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              People ({filteredPeople.length})
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Companies ({filteredCompanies.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="people" className="space-y-4">
            {filteredPeople.map((person) => (
              <Link key={person.id} href={`/users/${person.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={person.image} />
                        <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{person.name}</h3>
                          {person.connectionDegree && (
                            <Badge variant="secondary" className="text-xs">
                              {person.connectionDegree}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            <Target className="w-3 h-3 mr-1" />
                            {person.matchScore}% match
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">{person.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4" />
                            <span>{person.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{person.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {person.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>

          <TabsContent value="companies" className="space-y-4">
            {filteredCompanies.map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={company.logo} />
                        <AvatarFallback>{company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{company.name}</h3>
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            <Star className="w-3 h-3 mr-1" />
                            {company.rating}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{company.industry}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{company.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{company.size}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{company.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {company.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">{specialty}</Badge>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}