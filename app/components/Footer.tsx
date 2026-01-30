'use client';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-neutral-950/80 backdrop-blur-sm border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 pr-24 md:pr-28">
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <div>
            <p className="text-white/60 text-sm">
              © 2026 Right Hand Labs. All rights reserved.
            </p>
            <p className="text-white/60 text-sm mt-1">
              Right Hand Labs™ is a trademark of Right Hand Labs.
            </p>
          </div>
          <button className="px-6 py-2.5 border border-amber-500 bg-transparent text-amber-500 font-medium text-sm rounded-sm hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300">
            Send Feedback
          </button>
        </div>
      </div>
    </footer>
  );
}
