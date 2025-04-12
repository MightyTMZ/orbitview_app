"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Users,
  MessageSquare,
  Building2,
  MapPin,
  Link as LinkIcon,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  Network
} from "lucide-react";
import Link from "next/link";
import { useNetworkStore } from "@/lib/stores/network-store";

const ITEMS_PER_PAGE = 10;

export default function MyNetworkPage() {
  const { connections } = useNetworkStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<'all' | 'recent' | 'endorsed'>('all');

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = 
      connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      connection.company.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === 'recent') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return matchesSearch && new Date(connection.connectionDate) > thirtyDaysAgo;
    } else if (filter === 'endorsed') {
      return matchesSearch && (connection.endorsements || 0) > 20;
    }
    return matchesSearch;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const totalPages = Math.ceil(filteredConnections.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedConnections = filteredConnections.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">My Network</h1>
          <p className="text-muted-foreground">
            {connections.length} connections in your professional network
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Card className="p-6 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Network Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Total Connections</span>
                    <span className="font-medium">{connections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">New This Month</span>
                    <span className="font-medium">
                      {connections.filter(c => {
                        const thirtyDaysAgo = new Date();
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                        return new Date(c.connectionDate) > thirtyDaysAgo;
                      }).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Highly Endorsed</span>
                    <span className="font-medium">
                      {connections.filter(c => (c.endorsements || 0) > 20).length}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Filter View</h3>
                <div className="space-y-2">
                  <Button 
                    variant={filter === 'all' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('all')}
                  >
                    <Network className="w-4 h-4 mr-2" />
                    All Connections
                  </Button>
                  <Button 
                    variant={filter === 'recent' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('recent')}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Recent Connections
                  </Button>
                  <Button 
                    variant={filter === 'endorsed' ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => setFilter('endorsed')}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Highly Endorsed
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  className="pl-10" 
                  placeholder="Search connections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>

            <Card className="h-[calc(100vh-16rem)]">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {paginatedConnections.map((connection) => (
                    <Card key={connection.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={connection.avatar} />
                          <AvatarFallback>{connection.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{connection.name}</h3>
                                <Badge variant="secondary">
                                  Connected {connection.connectionDate}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground">{connection.title}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  <span>{connection.company}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  <span>{connection.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{connection.mutualConnections} mutual connections</span>
                                </div>
                                {connection.endorsements && (
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4" />
                                    <span>{connection.endorsements} endorsements</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/messages?user=${connection.id}`}>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Message
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/users/${connection.id}`}>
                                  <LinkIcon className="w-4 h-4 mr-2" />
                                  View Profile
                                </Link>
                              </Button>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {connection.skills.map((skill) => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredConnections.length)} of {filteredConnections.length}
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
      </div>
    </div>
  );
}