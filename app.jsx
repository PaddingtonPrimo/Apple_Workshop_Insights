import { useState, useEffect, useRef } from "react";

const data = {
  stats: [
    { value: "61%", label: "of electronics returns happen shortly after purchase due to setup confusion", icon: "↩" },
    { value: "5M+", label: "customers participated in Today at Apple sessions annually", icon: "◎" },
    { value: "28%", label: "reduction in return rates when electronics retailers invest in product education", icon: "↓" },
    { value: "45%", label: "drop in post-purchase support tickets after product education programs", icon: "✦" },
  ],
  context: [
    { pct: 41, label: "Returned a non-defective electronics product in the past year" },
    { pct: 61, label: "Of those returns occurred due to setup frustration or confusion" },
    { pct: 11, label: "Overall consumer electronics return rate industry-wide" },
    { pct: 30, label: "Online electronics purchases returned vs. 8.9% for in-store" },
  ],
  timeline: [
    { year: "2001", event: "Genius Bar Launched", desc: "1-on-1 technical support and product education introduced as a retail pillar." },
    { year: "2005", event: "In-Store Theatre", desc: "Dedicated spaces created to host product demonstrations and educational events." },
    { year: "2009", event: "Apple Store App", desc: "Post-purchase support extended digitally, bridging in-store guidance with at-home assistance." },
    { year: "2017", event: "Today at Apple", desc: "Hourly workshops rolled out globally covering photography, music, coding, and creative skills." },
    { year: "2024", event: "Ongoing Evolution", desc: "Sessions expanded and personalised; 70,000+ retail employees trained to lead workshops worldwide." },
  ],
  outcomes: [
    { metric: "Return Rate Reduction", value: "28%", note: "Electronics retailers with product education programs vs. control", color: "#34d399" },
    { metric: "Support Ticket Drop", value: "45%", note: "After implementing pre/post-purchase workshop models", color: "#60a5fa" },
    { metric: "Customer Satisfaction", value: "+31%", note: "Improvement in satisfaction scores with technical products", color: "#f472b6" },
    { metric: "Repeat Purchase Rate", value: "Higher", note: "Educated customers show stronger brand loyalty and lower churn", color: "#fbbf24" },
  ],
};

function AnimatedNumber({ target, suffix = "", prefix = "", duration = 1200 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const isPercent = !isNaN(parseInt(target));
        const end = parseInt(target);
        if (!isPercent) { setDisplay(target); return; }
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(ease * end).toString());
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

function BarRow({ pct, label, delay }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setWidth(pct), delay);
      }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "13px", color: "#94a3b8", maxWidth: "78%", lineHeight: 1.4 }}>{label}</span>
        <span style={{ fontSize: "14px", fontWeight: 700, color: "#f1f5f9", fontFamily: "'DM Mono', monospace" }}>{pct}%</span>
      </div>
      <div style={{ background: "#1e293b", borderRadius: "999px", height: "6px", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "999px",
          background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
          width: `${width}%`, transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)"
        }} />
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("problem");

  return (
    <div style={{
      background: "#060b14",
      minHeight: "100vh",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#f1f5f9",
      padding: "0",
      overflowX: "hidden"
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@700;800;900&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 10px 20px; border-radius: 6px; font-family: 'Lato', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.2s; }
        .tab-btn:hover { background: #1e293b; }
        .outcome-card { border: 1px solid #1e293b; border-radius: 12px; padding: 24px; transition: all 0.25s; }
        .outcome-card:hover { border-color: #334155; transform: translateY(-2px); background: #0f172a; }
        .timeline-item { position: relative; padding-left: 44px; padding-bottom: 32px; }
        .timeline-item::before { content: ''; position: absolute; left: 14px; top: 28px; bottom: 0; width: 1px; background: linear-gradient(to bottom, #334155, transparent); }
        .timeline-dot { position: absolute; left: 8px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #3b82f6; border: 2px solid #060b14; box-shadow: 0 0 0 3px #1d4ed855; }
        .stat-card { border: 1px solid #1e293b; border-radius: 16px; padding: 28px; background: #0a1628; transition: all 0.3s; }
        .stat-card:hover { border-color: #3b82f688; background: #0f1e35; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.7s ease forwards; }
        .hero-glow { position: absolute; top: -80px; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background: radial-gradient(ellipse, #1d4ed822 0%, transparent 70%); pointer-events: none; }
      `}</style>

      {/* HERO */}
      <div style={{ position: "relative", padding: "80px 24px 60px", textAlign: "center", borderBottom: "1px solid #1e293b", overflow: "hidden" }}>
        <div className="hero-glow" />
        <div style={{ display: "inline-block", background: "#1d4ed820", border: "1px solid #3b82f640", borderRadius: "999px", padding: "6px 16px", marginBottom: "24px" }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#60a5fa", textTransform: "uppercase" }}>Insights Deep Dive · Retail Education Impact</span>
        </div>
        <h1 className="fade-up" style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 6vw, 64px)",
          fontWeight: 900, lineHeight: 1.1, margin: "0 auto 20px", maxWidth: "760px",
          background: "linear-gradient(135deg, #f1f5f9 30%, #94a3b8 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          How Apple Store Workshops Reduce Product Returns
        </h1>
        <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "18px", color: "#64748b", maxWidth: "560px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Turning post-purchase confusion into product confidence — and measuring the impact on return rates.
        </p>

        {/* Headline stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", maxWidth: "860px", margin: "0 auto" }}>
          {data.stats.map((s, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div style={{ fontSize: "32px", fontFamily: "'Playfair Display', serif", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px" }}>
                <AnimatedNumber target={s.value.replace(/[^0-9]/g, "")} suffix={s.value.replace(/[0-9]/g, "")} />
              </div>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV TABS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", padding: "24px 16px", borderBottom: "1px solid #1e293b", flexWrap: "wrap" }}>
        {[
          { id: "problem", label: "The Problem" },
          { id: "approach", label: "Apple's Approach" },
          { id: "outcomes", label: "Outcomes" },
          { id: "context", label: "Industry Context" },
        ].map(tab => (
          <button key={tab.id} className="tab-btn"
            onClick={() => setActiveTab(tab.id)}
            style={{ color: activeTab === tab.id ? "#60a5fa" : "#475569", background: activeTab === tab.id ? "#1e3a5f" : "none", border: activeTab === tab.id ? "1px solid #3b82f640" : "1px solid transparent" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}>

        {/* PROBLEM TAB */}
        {activeTab === "problem" && (
          <div className="fade-up">
            <SectionTitle label="01" title="The Product Return Problem in Consumer Electronics" />
            <p style={bodyText}>Consumer electronics sit among the most returned product categories in retail. Unlike apparel — where fit and color mismatch drive returns — electronics returns are overwhelmingly driven by a fixable root cause: <em style={{ color: "#93c5fd" }}>customers don't know how to use what they bought</em>.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "36px 0" }}>
              <FactBox headline="41%" sub="of online shoppers returned a non-defective electronics product within the past 12 months" source="Loop Returns Benchmark Report" color="#f472b6" />
              <FactBox headline="61%" sub="of those returns occurred shortly after purchase — driven by frustration or confusion during setup" source="Consumer Electronics Returns Survey, 2019" color="#60a5fa" />
              <FactBox headline="11%" sub="industry-wide return rate for consumer electronics — one of the highest categories in retail" source="Shopify / NRF Industry Data" color="#34d399" />
              <FactBox headline="$743B" sub="in total retail merchandise returned in 2023 alone, with electronics among the top contributing categories" source="NRF 2023 Returns Report" color="#fbbf24" />
            </div>

            <Callout>
              The majority of electronics returns are not product defects — they are <strong>education failures</strong>. When customers don't understand how to set up, configure, or get value from a device, returning it feels like the only option.
            </Callout>

            <p style={bodyText}>This creates a compounding problem for retailers and manufacturers. Each return costs the business far beyond the sticker price: reverse logistics, restocking, refurbishment, and the loss of a potentially loyal customer. The key intervention window is the <strong style={{ color: "#f1f5f9" }}>48–72 hours after purchase</strong> — exactly when device workshops can make a material difference.</p>
          </div>
        )}

        {/* APPROACH TAB */}
        {activeTab === "approach" && (
          <div className="fade-up">
            <SectionTitle label="02" title="How Apple Designed Education Into the Retail Experience" />
            <p style={bodyText}>Apple's retail strategy has always been built around a simple insight: customers who understand their devices don't return them. From the Genius Bar in 2001 to Today at Apple in 2017, the company has systematically invested in in-store education as a direct lever on product satisfaction — and returns.</p>

            <div style={{ margin: "40px 0" }}>
              {data.timeline.map((item, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" style={{ background: i === 3 ? "#8b5cf6" : "#3b82f6" }} />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "12px", color: "#475569" }}>{item.year}</span>
                    <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "15px", color: "#f1f5f9" }}>{item.event}</span>
                  </div>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <Callout>
              <strong>"Today at Apple"</strong> — launched in 2017 — transformed Apple Stores from transactional spaces into community hubs running free hourly educational sessions covering photography, music, coding, art, and device mastery. Over <strong>5 million customers</strong> participated in the first year alone.
            </Callout>

            <p style={bodyText}>The design intent is explicit: Apple's stores evolved from showcasing products to <em style={{ color: "#93c5fd" }}>ensuring customers succeed with them</em>. This shifts the return-risk window from a customer's home into a structured, supported learning environment — dramatically reducing the likelihood of frustration-driven returns.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", margin: "32px 0" }}>
              {[
                { title: "Genius Bar", desc: "One-on-one technical support and personalised product guidance, available by appointment at every Apple Store." },
                { title: "Today at Apple", desc: "Free hourly group sessions on device skills, creative projects, and product features — held globally every day." },
                { title: "Personal Setup", desc: "Dedicated post-purchase sessions to help customers configure new devices, migrate data, and learn core features." },
              ].map((card, i) => (
                <div key={i} style={{ border: "1px solid #1e293b", borderRadius: "12px", padding: "20px", background: "#0a1628" }}>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "14px", color: "#93c5fd", marginBottom: "8px" }}>{card.title}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#64748b", lineHeight: 1.6 }}>{card.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OUTCOMES TAB */}
        {activeTab === "outcomes" && (
          <div className="fade-up">
            <SectionTitle label="03" title="Measurable Outcomes from Product Education Programs" />
            <p style={bodyText}>Apple does not publicly disclose return rate data by program. However, comparable data from electronics retailers who implemented structured product education and workshop programs provides a strong evidentiary basis for the return-reduction effect.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "36px 0" }}>
              {data.outcomes.map((o, i) => (
                <div key={i} className="outcome-card">
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase", marginBottom: "8px" }}>{o.metric}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "42px", fontWeight: 800, color: o.color, lineHeight: 1, marginBottom: "10px" }}>{o.value}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#64748b", lineHeight: 1.5 }}>{o.note}</div>
                </div>
              ))}
            </div>

            <Callout>
              An electronics retailer case study found that detailed compatibility guides, product demonstration videos, and pre-purchase consultation reduced compatibility-related returns by <strong>28%</strong>, cut support tickets by <strong>45%</strong>, and raised customer satisfaction with technical products by <strong>31%</strong>.
            </Callout>

            <p style={bodyText}>For Apple specifically, the virtuous loop is clear: Today at Apple sessions increase product fluency → fluency reduces frustration → reduced frustration eliminates the primary return driver. The program also elevates customer lifetime value — participants report stronger brand loyalty, higher repeat purchase intent, and deeper product ecosystem adoption.</p>

            <div style={{ border: "1px solid #334155", borderRadius: "16px", padding: "28px", background: "#0a1628", marginTop: "36px" }}>
              <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "13px", color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "20px" }}>Return Rate: Online vs. In-Store Retail</div>
              <BarRow pct={30} label="Online electronics purchases returned" delay={100} />
              <BarRow pct={11} label="Average consumer electronics return rate (all channels)" delay={250} />
              <BarRow pct={9} label="In-store electronics return rate (brick-and-mortar)" delay={400} />
              <BarRow pct={8} label="Estimated return rate with structured post-purchase education" delay={550} />
            </div>
          </div>
        )}

        {/* CONTEXT TAB */}
        {activeTab === "context" && (
          <div className="fade-up">
            <SectionTitle label="04" title="Broader Industry Context: Education as a Return Reduction Strategy" />
            <p style={bodyText}>The connection between product education and return rate reduction is not unique to Apple — it is an industry-wide finding backed by multiple data sources. What makes Apple's model distinctive is the scale, quality, and in-person nature of the intervention.</p>

            <div style={{ margin: "36px 0" }}>
              {data.context.map((row, i) => (
                <BarRow key={i} pct={row.pct} label={row.label} delay={i * 150} />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", margin: "36px 0" }}>
              <FactBox headline="3.3×" sub="higher return rate for online purchases vs. in-store — physical retail education closes this gap" source="Investopedia / NRF, 2024" color="#60a5fa" />
              <FactBox headline="$145M" sub="in returns per $1B in sales — the financial case for education programs is compelling" source="NRF 2023 Industry Report" color="#f472b6" />
            </div>

            <Callout>
              Industry best practice guidance consistently identifies <strong>in-depth product education before and after purchase</strong> as the single most effective lever for reducing consumer electronics return rates — specifically targeting the 61% of returns caused by setup frustration.
            </Callout>

            <p style={bodyText}>Online returns run at <strong style={{ color: "#f1f5f9" }}>30%</strong> versus <strong style={{ color: "#f1f5f9" }}>8.9%</strong> for in-store purchases — a gap largely explained by the presence of knowledgeable staff and hands-on product experience in physical retail. Apple's workshop model extends this advantage beyond the purchase moment, providing ongoing education that continuously reduces return risk throughout the device ownership lifecycle.</p>

            <div style={{ border: "1px solid #1e3a5f", borderRadius: "12px", padding: "24px", marginTop: "32px", background: "#060d1f" }}>
              <div style={{ fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: "13px", color: "#3b82f6", marginBottom: "12px" }}>Strategic Implication</div>
              <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
                Apple's investment in device workshops is not philanthropy or brand marketing alone — it is a measurable returns-reduction strategy. By converting the post-purchase period from a high-churn risk window into a structured education experience, Apple systematically eliminates the primary cause of electronics returns while simultaneously increasing product loyalty and ecosystem expansion.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid #1e293b", padding: "32px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.1em", margin: 0 }}>
          SOURCES: NRF 2023 Returns Report · Loop Returns Benchmark · Shopify Ecommerce Returns 2024 · Rocket Returns Industry Analysis 2025 · Work & Co / Apple Today at Apple Case Study
        </p>
      </div>
    </div>
  );
}

const bodyText = {
  fontFamily: "'Lato', sans-serif", fontWeight: 300, fontSize: "16px",
  color: "#94a3b8", lineHeight: 1.8, marginBottom: "20px"
};

function SectionTitle({ label, title }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>Section {label}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 800, color: "#f1f5f9", lineHeight: 1.2, margin: 0 }}>{title}</h2>
    </div>
  );
}

function FactBox({ headline, sub, source, color }) {
  return (
    <div style={{ border: "1px solid #1e293b", borderRadius: "12px", padding: "22px", background: "#0a1628" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 800, color, marginBottom: "8px" }}>{headline}</div>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#94a3b8", lineHeight: 1.5, marginBottom: "10px" }}>{sub}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", color: "#334155", letterSpacing: "0.05em" }}>{source}</div>
    </div>
  );
}

function Callout({ children }) {
  return (
    <div style={{
      borderLeft: "3px solid #3b82f6", paddingLeft: "20px", margin: "32px 0",
      background: "linear-gradient(to right, #1d4ed810, transparent)",
      borderRadius: "0 8px 8px 0", padding: "20px 20px 20px 22px"
    }}>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#cbd5e1", lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}
