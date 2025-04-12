import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  mutualConnections: number;
  skills: string[];
  matchScore: number;
  endorsements?: number;
  connectionDate: string;
  status: 'pending' | 'connected' | 'following';
  lastInteraction?: {
    type: 'message' | 'endorsement' | 'like' | 'comment';
    date: string;
  };
  profile: {
    bio?: string;
    experience: {
      title: string;
      company: string;
      period: string;
      description: string;
    }[];
    education: {
      degree: string;
      school: string;
      period: string;
      description: string;
    }[];
    certifications?: {
      name: string;
      issuer: string;
      date: string;
    }[];
  };
  engagement: {
    totalInteractions: number;
    lastActive: string;
    commonInterests: string[];
  };
  aiInsights?: {
    collaborationScore: number;
    skillAlignment: number;
    growthAreas: string[];
    recommendedActions: string[];
  };
}

interface NetworkState {
  connections: Connection[];
  pendingConnections: Connection[];
  addConnection: (connection: Connection) => void;
  removeConnection: (id: string) => void;
  updateConnection: (id: string, data: Partial<Connection>) => void;
  acceptConnection: (id: string) => void;
  rejectConnection: (id: string) => void;
  getConnectionById: (id: string) => Connection | undefined;
  getConnectionsByCompany: (company: string) => Connection[];
  getConnectionsBySkill: (skill: string) => Connection[];
  getMutualConnections: (connectionId: string) => Connection[];
  getSuggestedConnections: () => Connection[];
}

export const useNetworkStore = create<NetworkState>()(
  persist(
    (set, get) => ({
      connections: generateInitialConnections(),
      pendingConnections: [],

      addConnection: (connection) => 
        set((state) => ({
          connections: [...state.connections, connection]
        })),

      removeConnection: (id) =>
        set((state) => ({
          connections: state.connections.filter((c) => c.id !== id)
        })),

      updateConnection: (id, data) =>
        set((state) => ({
          connections: state.connections.map((c) =>
            c.id === id ? { ...c, ...data } : c
          )
        })),

      acceptConnection: (id) =>
        set((state) => {
          const connection = state.pendingConnections.find((c) => c.id === id);
          if (!connection) return state;

          return {
            pendingConnections: state.pendingConnections.filter((c) => c.id !== id),
            connections: [...state.connections, { ...connection, status: 'connected' }]
          };
        }),

      rejectConnection: (id) =>
        set((state) => ({
          pendingConnections: state.pendingConnections.filter((c) => c.id !== id)
        })),

      getConnectionById: (id) => {
        const state = get();
        return state.connections.find((c) => c.id === id);
      },

      getConnectionsByCompany: (company) => {
        const state = get();
        return state.connections.filter((c) => c.company === company);
      },

      getConnectionsBySkill: (skill) => {
        const state = get();
        return state.connections.filter((c) => c.skills.includes(skill));
      },

      getMutualConnections: (connectionId) => {
        const state = get();
        const connection = state.connections.find((c) => c.id === connectionId);
        if (!connection) return [];
        
        // In a real implementation, this would use actual connection data
        return state.connections.filter((c) => 
          c.id !== connectionId && 
          c.skills.some((skill) => connection.skills.includes(skill))
        );
      },

      getSuggestedConnections: () => {
        const state = get();
        // In a real implementation, this would use AI/ML to suggest relevant connections
        return state.connections
          .filter((c) => c.matchScore > 85)
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 5);
      }
    }),
    {
      name: 'network-storage',
    }
  )
);

function generateInitialConnections(): Connection[] {
  const companies = [
    "TechCorp", "InnovateAI", "DataTech Solutions", "Future Systems",
    "Cloud Dynamics", "Neural Labs", "Quantum Computing Inc.", "ByteWorks",
    "Digital Frontiers", "Tech Innovations"
  ];

  const locations = [
    "San Francisco, CA", "New York, NY", "Boston, MA", "Seattle, WA",
    "Austin, TX", "Chicago, IL", "Los Angeles, CA", "Denver, CO",
    "Portland, OR", "Miami, FL"
  ];

  const titles = [
    "Software Engineer", "Product Manager", "Data Scientist", "Full Stack Developer",
    "DevOps Engineer", "UX Designer", "Technical Lead", "Engineering Manager",
    "Solutions Architect", "Cloud Engineer"
  ];

  const skills = [
    "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "TypeScript",
    "GraphQL", "Machine Learning", "CI/CD", "MongoDB", "PostgreSQL", "Vue.js",
    "Go", "Rust", "System Design", "Microservices", "Data Analysis"
  ];

  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c",
  ];

  return Array.from({ length: 35 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Connection ${i + 1}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    avatar: `${avatars[Math.floor(Math.random() * avatars.length)]}?random=${i}`,
    mutualConnections: Math.floor(Math.random() * 50) + 1,
    skills: Array.from(
      { length: Math.floor(Math.random() * 4) + 2 },
      () => skills[Math.floor(Math.random() * skills.length)]
    ).filter((v, i, a) => a.indexOf(v) === i),
    matchScore: Math.floor(Math.random() * 30) + 70,
    endorsements: Math.floor(Math.random() * 100),
    connectionDate: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: 'connected' as const,
    profile: {
      experience: [
        {
          title: titles[Math.floor(Math.random() * titles.length)],
          company: companies[Math.floor(Math.random() * companies.length)],
          period: "2020 - Present",
          description: "Led development of key initiatives and managed team projects."
        }
      ],
      education: [
        {
          degree: "Bachelor of Science in Computer Science",
          school: "University of Technology",
          period: "2016 - 2020",
          description: "Focus on AI and Machine Learning"
        }
      ]
    },
    engagement: {
      totalInteractions: Math.floor(Math.random() * 100),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      commonInterests: skills.slice(0, Math.floor(Math.random() * 3) + 1)
    },
    aiInsights: {
      collaborationScore: Math.floor(Math.random() * 30) + 70,
      skillAlignment: Math.floor(Math.random() * 30) + 70,
      growthAreas: skills.slice(0, Math.floor(Math.random() * 2) + 1),
      recommendedActions: [
        "Schedule a knowledge sharing session",
        "Collaborate on upcoming project"
      ]
    }
  }));
}