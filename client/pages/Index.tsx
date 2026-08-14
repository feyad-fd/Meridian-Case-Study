import { useEffect, useMemo, useState } from "react";
import { getIframeSrc } from "../lib/iframe";

const figures = {
  live: "https://www.figma.com/api/mcp/asset/8badb470-a2f1-429c-9bf5-70d32bce0b91.png",
  shipped: "https://www.figma.com/api/mcp/asset/612e6b0f-968f-44f0-aadb-fe3305817228.png",
  comparison: "https://www.figma.com/api/mcp/asset/cc3d0db8-b8ef-4a21-9a87-3e4629cc9e51.png",
};

const Redline = ({ label, before, after }: { label: string; before: string; after: string }) => (
  <li>
    <div className="redline-label">{label}</div>
    <div className="redline-body"><del>{before}</del><ins>{after}</ins></div>
  </li>
);

const Status = ({ children, proposed = false }: { children: string; proposed?: boolean }) => (
  <li><span className={`status-pill ${proposed ? "proposed" : "shipped"}`}>{proposed ? "Proposed" : "Shipped"}</span><span>{children}</span></li>
);

export default function Index() {
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));

    const frame = document.querySelector<HTMLElement>(".fig-frame[data-lazy-iframe]");
    if (!frame) {
      return () => observer.disconnect();
    }

    const loadObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadIframe(true);
            loadObserver.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );

    loadObserver.observe(frame);

    return () => {
      observer.disconnect();
      loadObserver.disconnect();
    };
  }, []);

  const iframeSrc = useMemo(() => getIframeSrc(
    "https://embed.figma.com/design/1ueYeizVcNp9GNW1Ml90Mq/ASP-PPC-LP-Optimisation?node-id=0-1&embed-host=share",
    shouldLoadIframe,
  ), [shouldLoadIframe]);

  return (
    <div className="case-study"><div className="sheet">
      <header className="masthead">
        <div className="masthead-top"><span>Product Design — Case Study</span></div>
        <h1 className="doc-title">Redlining<br />the <em>First Fold</em></h1>
        <p className="doc-sub">Here's how I rebuilt that fold to surface the right message and move people toward a quote.</p>
        <div className="byline"><span><b>Role</b> — Design Point of Contact</span><span><b>Timeline</b> — Jul 3–20, 2026</span><span><b>Tools</b> — Figma, Microsoft Clarity</span><span><b>Status</b> — Shipped, live</span></div>
      </header>

      <div className="timeline">
        <div className="timeline-step">
          <div className="timeline-dot">1</div>
          <div className="timeline-date">Jul 3</div>
          <div className="timeline-label">Kickoff</div>
          <div className="timeline-desc">Brief, stakeholders, and success metrics</div>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">2</div>
          <div className="timeline-date">Jul 5–7</div>
          <div className="timeline-label">Diagnosis</div>
          <div className="timeline-desc">Clarity review and fold mapping</div>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">3</div>
          <div className="timeline-date">Jul 8–16</div>
          <div className="timeline-label">Revision</div>
          <div className="timeline-desc">Hero cut, tabs rebuilt, card grid shipped</div>
        </div>
        <div className="timeline-step">
          <div className="timeline-dot">4</div>
          <div className="timeline-date">Jul 17–20</div>
          <div className="timeline-label">Launch</div>
          <div className="timeline-desc">Dev handoff and production release</div>
        </div>
      </div>

      <section className="abstract reveal">
        <div className="doc-row">
          <aside className="margin-col">
            <span className="sec-num">Abstract</span>
          </aside>
          <div className="content-col">
            <div className="abstract-box">
              <p className="abstract-problem">
                <strong>The problem.</strong> Meridian's landing page opened with a full-height hero and buried services under a tab bar that visually favored one option. Most visitors never scrolled past the first screen.
              </p>
              <div className="abstract-channels">
                <span className="traffic-pill">Library</span>
                <span className="traffic-pill">Paid</span>
                <span className="traffic-pill">Organic</span>
              </div>
              <p className="abstract-outcome">
                <strong>The fix.</strong> Rebuilt the first fold to lead with services, equalized tab weight, and shipped a dev-ready page in under a month.
              </p>
            </div>
          </div>
        </div>
      </section>

      <figure className="fig">
        <span className="tag">Figma — Design File</span>
        <div className="fig-frame" data-lazy-iframe>
          {!shouldLoadIframe ? (
            <div className="fig-frame__placeholder" aria-label="Loading embedded design preview" />
          ) : null}
          <iframe
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
            width="800"
            height="450"
            src={iframeSrc}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <figcaption><b>Figma</b> — Design file for the Meridian PPC LP Optimisation project.</figcaption>
      </figure>

      <Section number="I." label="The Brief" title="Services are the product, not the story">
        <p className="lead">Meridian sells manuscript editing to researchers. Traffic is mixed rather than single-channel — but every visitor, regardless of source, arrives already comparing options. The page&apos;s only job is to confirm the offer fast and move someone toward a quote.</p>
        <ul className="status-list traffic-list"><li><span className="traffic-pill">Library</span><span>Majority of traffic comes from journal backlinks from Meridian&apos;s own online research library</span></li><li><span className="traffic-pill">Paid</span><span>Some part of traffic comes from paid campaigns and ads</span></li><li><span className="traffic-pill">Organic</span><span>Smaller share, direct Google search</span></li></ul>
        <p>I was the design point of contact for this initiative owning the problem from the first session through to a shipped page, and partnering with the growth PM and marketing stakeholders on prioritization along the way. This case study covers that full cycle, not just the design file.</p>
      </Section>

      <Section number="II." label="The Signal" title="Most visitors never scroll past the first fold"><p>Microsoft Clarity insights showed a consistent pattern across visits: the large majority of users did not scroll past the first fold. Whatever content sat below roughly 900px was, for most sessions, effectively invisible.</p><p className="signal-quote"><span>→</span> If it isn&apos;t visible in the first screen, most visitors never see it.</p><p className="signal-cite">Reframed the brief from “redesign the page” to “fix the first fold.”</p></Section>

      <Section number="III." label="The Diagnosis" title="The hero and the tabs killed the fold"><p>The live page spent its one guaranteed screen on introductions instead of options. Two specific issues stood out:</p><figure className="fig"><span className="tag before">Fig. 1 — Live version, first 900px</span><div className="fig-frame"><img src={figures.live} alt="Live version of the landing page, first fold" /><span className="marker one">1</span><span className="marker two">2</span></div><figcaption><b>Fig. 1</b> — the version live at the start of this project. Hero and intro copy run roughly 340px before any service is visible.</figcaption></figure><ul className="annot-list"><li><span className="num">1</span><span><b>The hero swallowed the fold.</b> 340px deep before a single service appeared on a page whose entire job was to sell services.</span></li><li><span className="num">2</span><span><b>The tabs implied a decision before the visitor made one.</b> Three of four service tabs sat in flat gray on a gray field, reading as disabled.</span></li></ul></Section>

      <Section number="IV." label="The Revision" title="Cut the hero. Surface the services."><p>I cut the hero to its essentials, rebuilt the tab bar so every option carried equal visual weight, and rearranged the service cards to cut unnecessary scrolling.</p><figure className="fig"><span className="tag after">Fig. 2 — Shipped version, first 900px</span><div className="fig-frame"><img src={figures.shipped} alt="Shipped version of the landing page, first fold" /></div><figcaption><b>Fig. 2</b> — the shipped design. Four services, all visible, inside the same 900px that used to hold only a hero.</figcaption></figure><ul className="redline-list"><Redline label="Hero" before="~340px, full-bleed photo, no services visible" after="193px — a 43% cut, tab bar lands in view immediately below" /><Redline label="Tab bar" before="Gray-on-gray inactive tabs, one implied default" after="White background on every tab, one accent color marks the active state only" /><Redline label="Service cards" before="Vertical stack — comparing all options meant real scrolling" after="Two-column grid (stakeholder-agreed) — four services readable at a glance" /><Redline label="Fold depth" before="~1,300px to see all three services in the old layout" after="875px to see all four services, comfortably inside the first screen" /></ul><p>Further down the page, the same logic carried through — an AI-vs-human comparison table replaced a wall of feature text, giving the strongest trust argument a scannable, skimmable shape:</p><figure className="fig"><div className="fig-frame"><img src={figures.comparison} alt="Comparison table contrasting AI tools against Meridian's human editors" /></div><figcaption><b>Fig. 3</b> — comparison module, shipped. Restated the page&apos;s core sales argument as a scan, not a read.</figcaption></figure><h3 className="subhead">What actually shipped</h3><ul className="status-list"><Status>Hero reduced, services surfaced above the fold</Status><Status>Tab bar rebuilt for equal visual weight across services</Status><Status>Service cards arranged into a horizontal grid to reduce scroll</Status><Status>Indicative pricing added directly to service cards, cutting friction before a quote request</Status><Status>Sample thumbnails added to the Graphical Abstract and Manuscript Formatting cards, previewing the actual deliverable</Status></ul></Section>

      <Section number="V." label="Status, Honestly" title="The baseline to beat"><p className="stat-note">The redesign shipped July 20, 2026 — under a month before this was written — so there isn&apos;t a clean post-launch read yet. What follows is the pre-redesign baseline for the page&apos;s paid-campaign channel specifically (Apr–Jun), used to set the bar — library and organic traffic aren&apos;t reflected in RoAS since no ad spend is attached to them.</p><div className="stat-strip"><Stat value="$10,625" label="Spend, Apr–Jun" /><Stat value="54" label="Jobs acquired" /><Stat value="$40,235.75" label="Revenue generated" /><Stat value="~4×" label="RoAS" /></div><span className="baseline-flag">Baseline — not a result of this redesign</span><p>I&apos;ll update this section with post-launch numbers once a full reporting cycle is available.</p></Section>

      <Section number="VI." label="Reflection" title="Three lessons from this redesign"><div className="principles"><Principle number="i." title="Attention here is conditional, not guaranteed">Some visitors arrive with no real intent to buy. The first few seconds of the page aren&apos;t for explaining everything — they&apos;re for giving that visitor a reason to stay.</Principle><Principle number="ii." title="The top ~30% of the screen carries the whole pitch">For most sessions, that&apos;s the entire page. Whatever you most want a visitor to notice belongs there — not because it&apos;s convention, but because it&apos;s the only part guaranteed to be seen.</Principle><Principle number="iii." title="Order by importance, not by habit">“Hero, then trust, then product” is a template, not a rule. When behavioral data says people don&apos;t scroll, the page&apos;s structure has to match that — most important first, every time.</Principle></div></Section>

      <footer className="colophon"><div className="colophon-grid"><div><b>Project</b>Meridian Editorial — Services Landing Page<br />Optimization cycle, Jul 2026</div><div><b>Role</b>Solo Product Designer<br />End-to-end, brief to shipped</div><div><b>Method</b>Microsoft Clarity session review<br />Figma, dev handoff</div></div><p className="fine">Client name changed to protect confidentiality — the design decisions, data, and outcomes described are unchanged. This case study will be updated with post-launch performance once a full reporting cycle is available.</p></footer>
    </div></div>
  );
}

function Section({ number, label, title, children }: { number: string; label: string; title: string; children: React.ReactNode }) { return <section className="reveal"><div className="doc-row"><aside className="margin-col"><span className="sec-num">{number}</span><div className="sec-title">{label}</div></aside><div className="content-col"><h2 className="title">{title}</h2>{children}</div></div></section>; }
function Stat({ value, label }: { value: string; label: string }) { return <div className="stat"><span className="num">{value}</span><span className="lbl">{label}</span></div>; }
function Principle({ number, title, children }: { number: string; title: string; children: React.ReactNode }) { return <div className="principle"><span className="rn">{number}</span><div><h3>{title}</h3><p>{children}</p></div></div>; }
