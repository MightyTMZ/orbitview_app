import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Briefcase, User } from 'lucide-react';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'OrbitView - Your AI-Powered Career Platform',
  description: 'Navigate your career path with AI-powered insights, job matching, and professional networking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="border-b">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="font-bold text-xl">OrbitView</Link>
              <div className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/jobs">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Jobs
                  </Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </Button>
              </div>
            </div>
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}