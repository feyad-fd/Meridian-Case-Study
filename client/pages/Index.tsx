import { useEffect, useMemo, useState } from "react";
import { getIframeSrc } from "../lib/iframe";
import "../case-study.css";

type SectionProps = { number: string; label: string; title: string; children: React.ReactNode };

const figures = {
  live: "/live.png",
  shipped: "/shipped.png",
  comparison: "/comparison.png",
};

function Section({ number, label, title, children }: SectionProps) {
  return <section><div className="doc-row"><aside className="margin-col"><span className="sec-num">{number}</span><div className="sec-title">{label}</div></aside><div className="content-col"><h2 className="title">{title}</h2>{children}</div></div></section>;
}

function Figure({ src, alt, tag, caption, markers = false }: { src: string; alt: string; tag: string; caption: string; markers?: boolean }) {
  return <figure className="fig"><span className="tag">{tag}</span><div className="fig-frame"><img src={src} alt={alt} />{markers && <><span className="marker one">1</span><span className="marker two">2</span></>}</div><figcaption>{caption}</figcaption></figure>;
}

function Redline({ label, before, after }: { label: string; before: string; after: string }) {
  return <li><div className="redline-label">{label}</div><div className="redline-body"><del>{before}</del><ins>{after}</ins></div></li>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="stat"><span className="num">{value}</span><span className="lbl">{label}</span></div>;
}

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

  return <div className="case-study"><div className="sheet">
    <header className="masthead">
      <div className="masthead-top"><span>Product Design - Case Study</span></div>
      <h1 className="doc-title">Optimising<br />the <em>First Fold</em></h1>
      <p className="doc-sub">Most people never scrolled past the top fold of the screen.<br />So I optimised it to sell the services.</p>
      <div className="byline"><span>Role - Design Point of Contact</span><span>Timeline - Jul 3–20, 2026</span><span>Tools - Figma, Microsoft Clarity</span><span>Status - Shipped, live</span></div>
    </header>

    <div className="journey"><div><b>1</b><strong>Jul 3</strong><span>Kickoff</span><small>Brief, stakeholders, and success metrics</small></div><div><b>2</b><strong>Jul 5–7</strong><span>Diagnosis</span><small>Clarity review and fold mapping</small></div><div><b>3</b><strong>Jul 8–16</strong><span>Revision</span><small>Hero cut, tabs rebuilt, card grid shipped</small></div><div><b>4</b><strong>Jul 17–20</strong><span>Launch</span><small>Dev handoff and production release</small></div></div>

    <section className="abstract"><div className="doc-row"><aside className="margin-col"><span className="sec-num">Abstract</span></aside><div className="content-col"><div className="abstract-box"><strong>The problem.</strong> The page opened with a big hero. Services were hidden below it, behind gray service tabs that made one option look already chosen. Most visitors never scrolled past this first screen.<br /><br /><strong>The fix.</strong> Rebuilt the first fold to lead with services, equalized tab weight, and shipped a dev-ready page in under a month.</div></div></div></section>

    <figure className="fig">
      <span className="tag">Figma - Design File</span>
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
      <figcaption><b>Figma</b> - Design file for the Meridian PPC LP Optimisation project.</figcaption>
    </figure>

    <Section number="I." label="The Brief" title="Services are the product, not the story"><p className="lead">Meridian sells manuscript editing to researchers. Traffic is mixed rather than single-channel - but every visitor, regardless of source, arrives already comparing options. The page&apos;s only job is to confirm the offer fast and move someone toward a quote.</p><ul className="status-list"><li>Library<br />Majority of traffic comes from journal backlinks from Meridian&apos;s own online research library</li><li>Paid<br />Some part of traffic comes from paid campaigns and ads</li><li>Organic<br />Smaller share, direct Google search</li></ul><p>I was the product designer and design point of contact. I owned this from the first research session to the shipped page, working closely with the growth PM and marketing team. This case study covers that whole journey.</p></Section>

    <Section number="II." label="The Signal" title="Most visitors never scroll past the first fold"><p>Microsoft Clarity insights showed a consistent pattern across visits: the large majority of users did not scroll past the first fold. Whatever content sat below roughly 900px was, for most sessions, effectively invisible.</p><p className="signal-quote">→ If it isn&apos;t visible in the first screen, most visitors never see it.</p><p className="signal-cite">The goal was clear: fix the first fold and reduce drop-offs.</p></Section>

    <Section number="III." label="The Diagnosis" title="The hero and the tabs killed the fold"><p>The live page spent its one guaranteed screen on introductions instead of options. Two specific issues stood out:</p><Figure src={figures.live} alt="Live version of the landing page, first fold12" tag="Fig. 1 - Live version, first 900px" caption="Fig. 1 - the version live at the start of this project. Hero and intro copy run roughly 340px before any service is visible." markers /><ul className="annot-list"><li><span className="num">1</span><span>The hero swallowed the fold. 340px deep before a single service appeared on a page whose entire job was to sell services.</span></li><li><span className="num">2</span><span>The tabs implied a decision before the visitor made one. Three of four service tabs sat in flat gray on a gray field, reading as disabled.</span></li></ul></Section>

    <Section number="IV." label="The Revision" title="Cut the hero. Surface the services."><p>I cut the hero to its essentials, rebuilt the tab bar so every option carried equal visual weight, and rearranged the service cards to cut unnecessary scrolling.</p><Figure src={figures.shipped} alt="Shipped version of the landing page, first fold" tag="Fig. 2 - Shipped version, first 900px" caption="Fig. 2 - the shipped design. Four services, all visible, inside the same 900px that used to hold only a hero." /><ul className="redline-list"><Redline label="Hero" before="~340px, full-bleed photo, no services visible" after="193px - a 43% cut, tab bar lands in view immediately below" /><Redline label="Tab bar" before="Gray-on-gray inactive tabs, one implied default" after="White background on every tab, one accent color marks the active state only" /><Redline label="Service cards" before="Vertical stack - comparing all options meant real scrolling" after="Two-column grid (stakeholder-agreed) - four services readable at a glance" /><Redline label="Fold depth" before="~1,300px to see all three services in the old layout" after="875px to see all four services, comfortably inside the first screen" /></ul><p>Further down the page, the same logic carried through - an AI-vs-human comparison table replaced a wall of feature text, giving the strongest trust argument a scannable, skimmable shape:</p><Figure src={figures.comparison} alt="Comparison table contrasting AI tools against Meridian's human editors" tag="Comparison table contrasting AI tools against Meridian's human editors" caption="Fig. 3 - comparison module, shipped. Restated the page&apos;s core sales argument as a scan, not a read." /><h3 className="subhead">What actually shipped</h3><ul className="status-list"><li>Shipped<br />Hero reduced, services surfaced above the fold</li><li>Shipped<br />Tab bar rebuilt for equal visual weight across services</li><li>Shipped<br />Service cards arranged into a horizontal grid to reduce scroll</li><li>Shipped<br />Indicative pricing added directly to service cards, cutting friction before a quote request</li><li>Shipped<br />Sample thumbnails added to the Graphical Abstract and Manuscript Formatting cards, previewing the actual deliverable</li></ul></Section>

    <Section number="V." label="Status, Honestly" title="The baseline to beat"><p className="stat-note">The optimisation shipped July 20, 2026 - under a month before this was written - so there isn&apos;t a clean post-launch read yet. What follows is the pre-optimisation baseline for the page&apos;s paid-campaign channel specifically (Apr–Jun), used to set the bar - library and organic traffic aren&apos;t reflected in RoAS since no ad spend is attached to them.</p><div className="stat-strip"><Stat value="$10,625" label="Spend, Apr–Jun" /><Stat value="54" label="Jobs acquired" /><Stat value="$40,235.75" label="Revenue generated" /><Stat value="~4×" label="RoAS" /></div><span className="baseline-flag">Baseline - not a result of this optimisation</span><p>I&apos;ll update this section with post-launch numbers once a full reporting cycle is available.</p></Section>

    <Section number="VI." label="Reflection" title="Three lessons from this optimisation"><div className="principles"><div className="principle"><span className="rn">i.</span><div><h3>Attention here is conditional, not guaranteed</h3><p>Some visitors arrive with no real intent to buy. The first few seconds of the page aren&apos;t for explaining everything - they&apos;re for giving that visitor a reason to stay.</p></div></div><div className="principle"><span className="rn">ii.</span><div><h3>The top ~30% of the screen carries the whole pitch</h3><p>For most sessions, that&apos;s the entire page. Whatever you most want a visitor to notice belongs there - not because it&apos;s convention, but because it&apos;s the only part guaranteed to be seen.</p></div></div><div className="principle"><span className="rn">iii.</span><div><h3>Order by importance, not by habit</h3><p>“Hero, then trust, then product” is a template, not a rule. When behavioral data says people don&apos;t scroll, the page&apos;s structure has to match that - most important first, every time.</p></div></div></div></Section>

    <footer className="colophon"><div className="colophon-grid"><div><b>Project</b>Meridian Editorial - Services Landing Page<br />Optimization cycle, Jul 2026</div><div><b>Role</b>Solo Product Designer<br />End-to-end, brief to shipped</div><div><b>Method</b>Microsoft Clarity session review<br />Figma, dev handoff</div></div><p className="fine">Client name changed to protect confidentiality - the design decisions, data, and outcomes described are unchanged. This case study will be updated with post-launch performance once a full reporting cycle is available.</p></footer>
  </div></div>;
}
