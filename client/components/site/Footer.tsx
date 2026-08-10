import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-24">
      <div className="h-16 wave-top"></div>
      <div className="bg-gradient-to-b from-sky/40 via-lavender/30 to-background py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">✸</span>
            <span className="font-display font-extrabold text-lg">Philonet</span>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <a href="#browse" className="relative hover:text-primary transition-colors after:content-['✦'] after:absolute after:-top-3 after:-right-3 after:text-[10px] after:opacity-60">Browse</a>
            <a href="#reflect" className="relative hover:text-primary transition-colors after:content-['✨'] after:absolute after:-top-3 after:-right-3 after:text-[10px] after:opacity-60">Reflect</a>
            <a href="#hot" className="relative hover:text-primary transition-colors after:content-['★'] after:absolute after:-top-3 after:-right-3 after:text-[10px] after:opacity-60">Hot</a>
            <Link to="/waitlist" className="relative hover:text-primary transition-colors after:content-['☄'] after:absolute after:-top-3 after:-right-3 after:text-[10px] after:opacity-60">Waitlist</Link>
          </nav>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Philonet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
