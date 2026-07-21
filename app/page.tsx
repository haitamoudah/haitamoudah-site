import ChromeLayer from "@/components/ChromeLayer";
import SceneLayer from "@/components/SceneLayer";
import { SpecPanel } from "@/components/SpecPanel";
import { site } from "@/content/site";

function Heading({
  lines,
  as: Tag,
  reveal = false,
}: {
  lines: readonly string[];
  as: "h1" | "h2";
  reveal?: boolean;
}) {
  return (
    <Tag data-reveal={reveal ? "" : undefined}>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 && <br />}
          {line}
          {Tag === "h1" && i === lines.length - 1 && (
            <span className="cursor" aria-hidden="true" />
          )}
        </span>
      ))}
    </Tag>
  );
}

export default function Home() {
  return (
    <>
      <SceneLayer />
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <ChromeLayer />
      <main className="content">
      <section id="hero" className="section min-h-[110vh]">
        <p className="eyebrow">{site.hero.eyebrow}</p>
        <Heading as="h1" lines={site.hero.heading} />
        <p className="lede">{site.hero.lede}</p>
      </section>

      <section id="approach" className="section">
        <p className="eyebrow" data-reveal="">
          {site.approach.eyebrow}
        </p>
        <Heading as="h2" lines={site.approach.heading} reveal />
        {site.approach.paragraphs.map((text, i) => (
          <p
            key={text.slice(0, 24)}
            className={i > 0 ? "body-copy mt-5" : "body-copy"}
            data-reveal=""
          >
            {text}
          </p>
        ))}
        <div data-reveal="">
          <SpecPanel panel={site.approach.panel} />
        </div>
      </section>

      <section id="work" className="section">
        <p className="eyebrow" data-reveal="">
          {site.work.eyebrow}
        </p>
        <Heading as="h2" lines={site.work.heading} reveal />
        {site.work.paragraphs.map((text, i) => (
          <p
            key={text.slice(0, 24)}
            className={i > 0 ? "body-copy mt-5" : "body-copy"}
            data-reveal=""
          >
            {text}
          </p>
        ))}
        <div data-reveal="">
          <SpecPanel panel={site.work.panel} />
        </div>
      </section>

      <section id="contact" className="section">
        <p className="eyebrow" data-reveal="">
          {site.contact.eyebrow}
        </p>
        <Heading as="h2" lines={site.contact.heading} reveal />
        {site.contact.paragraphs.map((text, i) => (
          <p
            key={text.slice(0, 24)}
            className={i > 0 ? "body-copy mt-5" : "body-copy"}
            data-reveal=""
          >
            {text}
          </p>
        ))}
        <div className="cta" data-reveal="">
          {site.contact.buttons.map((btn) => (
            <a
              key={btn.label}
              className={btn.primary ? "btn btn-primary" : "btn"}
              href={btn.href}
              target={btn.external ? "_blank" : undefined}
              rel={btn.external ? "noopener" : undefined}
            >
              {btn.label}
            </a>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}
