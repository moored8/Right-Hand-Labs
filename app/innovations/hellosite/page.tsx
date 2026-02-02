'use client';

import Link from 'next/link';

export default function HelloSitePage() {
  return (
    <main className="relative z-10 min-h-screen pt-24 pb-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/innovations" className="text-amber-500 hover:text-amber-400 text-sm font-medium mb-8 inline-block">
          ← Innovations
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          HelloSite
        </h1>
        <p className="text-white/80 text-lg">
          Smart and talking web agents that capture more leads. Add your HelloSite content here.
        </p>
      </div>
    </main>
  );
}
