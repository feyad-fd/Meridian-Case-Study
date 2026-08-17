import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/60">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-extrabold tracking-tight">Philonet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#browse" className="hover:text-primary transition-colors">Browse</a>
          <a href="#reflect" className="hover:text-primary transition-colors">Reflect</a>
          <a href="#hot" className="hover:text-primary transition-colors">Hot Room</a>
          <a href="#join" className="hover:text-primary transition-colors">Rooms</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/waitlist"
            className="rounded-pill gradient-pill px-5 py-2 text-sm font-semibold shadow-md text-primary-foreground hover:brightness-110 active:scale-95 transition [text-shadow:0_1px_0_rgba(0,0,0,0.15)] animate-shimmer"
          >
            Join the Waitlist
          </Link>
        </div>
      </div>
    </header>
  );
}
