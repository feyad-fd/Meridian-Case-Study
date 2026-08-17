import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="relative py-20 space-surface star-field">
      <div className="container">
        <div className="mx-auto max-w-xl text-center bg-card/70 backdrop-blur rounded-3xl p-8 shadow-xl border">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold mb-2">Join the Philonet waitlist</h1>
          <p className="text-muted-foreground mb-6">Be first to try conversation rooms, quotes, and playful space vibes.</p>
          {submitted ? (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-mint/60 via-sky/60 to-lavender/60">
              <p className="font-medium">You're on the list! We'll email you soon ✨</p>
            </div>
          ) : (
            <form
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <input
                required
                type="email"
                placeholder="you@galaxy.io"
                className="h-12 px-4 rounded-pill border bg-background/70 backdrop-blur"
              />
              <button className="h-12 px-6 rounded-pill gradient-pill text-primary-foreground font-semibold shadow-md hover:brightness-110 active:scale-95 transition animate-shimmer">
                Join
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
