"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Scene from "@/components/404/scene";
import PageTransition from "@/components/page-transition";

export default function NotFound() {
  return (
    <PageTransition className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl pt-24 gap-12">
      
      {/* 3D Scene Container */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative rounded-3xl overflow-hidden bg-muted/30 border border-border">
        <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
        <Scene />
      </div>

      {/* Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
        <h1 className="text-8xl font-black text-primary tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-bold tracking-tight">
          Oops! Where did that go?
        </h2>
        <p className="text-muted-foreground text-lg max-w-md">
          The page you are looking for seems to have gone missing. My virtual assistant is currently searching the database, but in the meantime...
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 mt-4 text-sm font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
        >
          <ArrowLeft size={16} />
          Go back home
        </Link>
      </div>

    </PageTransition>
  );
}
