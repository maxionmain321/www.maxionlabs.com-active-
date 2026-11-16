import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Page from "@/app/commercial-insurance-leads/page";
import { PAGE, CONTENT } from "@/content/answers/commercial-insurance-leads";
import { assertCleanCopy } from "./helpers/copy-guards";

const ROUTE = "/commercial-insurance-leads";

function renderPage() {
  const { container } = render(<Page />);
  const article = container.querySelector("article");
  return {
    container,
    text: container.textContent ?? "",
    articleText: article?.textContent ?? "",
    markup: container.innerHTML,
  };
}

const words = (s: string) => s.split(/\s+/).filter(Boolean);

/** A number as it appears in copy: $4,725, 45.5%, 15, $60,000. */
const NUMBER = /\$?\d[\d,]*(?:\.\d+)?%?/g;

/**
 * The copy a reader actually reads: h1, lede, the sections (with figure captions) and the FAQ, minus the SVG internals
 * (<title>, <desc> and the drawn labels are for crawlers and screen readers, not prose) and minus the sources list.
 */
function readerCopy(article: Element): string {
  const clone = article.cloneNode(true) as Element;
  clone.querySelectorAll("svg").forEach((s) => s.remove());
  const parts = [
    clone.querySelector("h1")?.textContent,
    clone.querySelector("h1 + p")?.textContent,
    ...[...clone.querySelectorAll("section")]
      .filter((s) => s.id !== "sources")
      .map((s) => s.textContent),
  ];
  return parts.join(" ");
}

describe("answer page: are commercial insurance leads worth it, judged on who works them and cost per bound account (plain-book format)", () => {
  it("registers the route with the answer kind, a monthly change frequency and the mixed-side target query", () => {
    expect(PAGE.path).toBe(ROUTE);
    expect(PAGE.kind).toBe("answer");
    expect(PAGE.changeFrequency).toBe("monthly");
    expect(PAGE.targetQuery).toBe("commercial insurance leads");
    expect(PAGE.title.length).toBeGreaterThan(10);
    expect(PAGE.title.length).toBeLessThan(60);
    expect(PAGE.description.length).toBeLessThan(160);
  });

  it("has exactly one h1 that asks whether commercial insurance leads are worth it", () => {
    const { container } = renderPage();
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent ?? "").toMatch(/commercial insurance leads/i);
    expect(h1s[0].textContent ?? "").toMatch(/worth/i);
  });

  it("filters producers from owners and names the who-works-it test inside the first 200 words after the h1", () => {
    const { container } = renderPage();
    const article = container.querySelector("article");
    const h1 = article?.querySelector("h1");
    expect(h1).not.toBeNull();
    let text = "";
    let node: Element | null = h1 as Element;
    while (node && !(node.tagName === "NAV")) {
      text += " " + (node.textContent ?? "");
      node = node.nextElementSibling;
    }
    const first200 = words(text).slice(0, 200).join(" ");
    expect(first200).toMatch(/who-works-it test/i);
    expect(first200).toMatch(/cost per bound account/i);
    // The verdict, both halves: who should buy leads and who should not.
    expect(first200).toMatch(/producer/i);
    expect(first200).toMatch(/owner/i);
  });

  it("renders at least one comparison table server-side with the six options and the brief’s columns", () => {
    const { container } = renderPage();
    const tables = container.querySelectorAll("table");
    expect(tables.length).toBeGreaterThanOrEqual(1);
    const t = [...tables].map((x) => x.textContent ?? "").join(" ");
    for (const col of [
      "Exclusivity",
      "Contact rate",
      "Who qualifies",
      "Typical price",
      "What you own",
    ]) {
      expect(t).toMatch(new RegExp(col, "i"));
    }
    for (const opt of [
      "Shared",
      "Exclusive",
      "Aged",
      "Live transfer",
      "Referral",
      "Qualified sales meeting",
    ]) {
      expect(t).toMatch(new RegExp(opt, "i"));
    }
  });

  it("carries between 4 and 7 FAQ items", () => {
    const { container } = renderPage();
    const n = container.querySelectorAll('[data-testid="faq-item"]').length;
    expect(n).toBeGreaterThanOrEqual(4);
    expect(n).toBeLessThanOrEqual(7);
  });

  it("cites at least three https sources and at least two attributed quotes", () => {
    const { container } = renderPage();
    const sources = [
      ...container.querySelectorAll('[data-testid="source-item"] a'),
    ].map((a) => a.getAttribute("href") ?? "");
    expect(
      sources.filter((h) => h.startsWith("https://")).length,
    ).toBeGreaterThanOrEqual(3);
    expect(CONTENT.sources.length).toBe(sources.length);
    expect(
      container.querySelectorAll("blockquote").length,
    ).toBeGreaterThanOrEqual(2);
  });

  it("links to the booking section, the producer-or-meetings page and the pricing page", () => {
    const { container } = renderPage();
    expect(container.querySelector('a[href="/#book-call"]')).not.toBeNull();
    expect(
      container.querySelector(
        'article a[href="/hire-producer-or-book-meetings"]',
      ),
    ).not.toBeNull();
    expect(
      container.querySelector('article a[href="/pricing"]'),
    ).not.toBeNull();
  });

  it("passes the shared copy guards: no client names, retired terms or dashes", () => {
    const { text, markup } = renderPage();
    expect(() => assertCleanCopy(text, markup)).not.toThrow();
  });

  it("never implies cold calling or working X-dates, and never sells leads or appointment setting in our own voice", () => {
    const { articleText } = renderPage();
    expect(articleText).not.toMatch(/we (cold )?call (the|your|them|owners)/i);
    expect(articleText).not.toMatch(/we work (the |your )?x-dates/i);
    expect(articleText).not.toMatch(
      /we (sell|deliver|book|provide|send) (you )?leads/i,
    );
    expect(articleText).not.toMatch(/our (leads|appointment setting)/i);
  });

  it("tells a solo agent or personal-lines producer on the first screen that this is not for them", () => {
    const { container } = renderPage();
    const article = container.querySelector("article");
    const lede = article?.querySelector("h1 + p")?.textContent ?? "";
    const eyebrow =
      article?.querySelector("h1")?.previousElementSibling?.textContent ?? "";
    expect(eyebrow + " " + lede).toMatch(/solo/i);
    expect(eyebrow + " " + lede).toMatch(/personal lines/i);
  });

  it("stays inside the length band for the plain-book format, 1,500 to 2,200 words of reader copy", () => {
    const { container } = renderPage();
    const n = words(readerCopy(container.querySelector("article")!)).length;
    expect(n).toBeGreaterThanOrEqual(1500);
    expect(n).toBeLessThanOrEqual(2200);
  });

  it("has 7 or 8 section headings, each a full sentence", () => {
    expect(CONTENT.sections.length).toBeGreaterThanOrEqual(7);
    expect(CONTENT.sections.length).toBeLessThanOrEqual(8);
    for (const s of CONTENT.sections)
      expect(words(s.heading).length).toBeGreaterThanOrEqual(6);
  });

  it("states the offer numbers only as offer-v3 publishes them, sells qualified sales meetings, and never says first meeting or booked", () => {
    const { articleText } = renderPage();
    expect(articleText).toContain("$4,725");
    expect(articleText).toContain("$315");
    expect(articleText).toMatch(/7-day/);
    expect(articleText).toMatch(/15 qualified sales meetings a month/);
    expect(articleText).toMatch(/12 in month one/);
    expect(articleText).toMatch(/no-show/i);
    expect(articleText).not.toMatch(/\$500\b/);
    expect(articleText).not.toMatch(/first meetings?/i);
    expect(articleText).not.toMatch(/\bbooked\b/i);
  });

  it("shows the money over 3 months as an illustration: 42 meetings, about 8 accounts, $12,500 to $14,175 paid, gross before producer pay, no lifetime total", () => {
    const { articleText } = renderPage();
    expect(articleText).toMatch(/42 qualified sales meetings/);
    expect(articleText).toMatch(/about 8 bound accounts/);
    expect(articleText).toMatch(/\$14,175/);
    expect(articleText).toMatch(/\$12,500/);
    expect(articleText).toMatch(/about \$25,000 of (gross )?commission/);
    expect(articleText).toMatch(/before producer pay/i);
    expect(articleText).toMatch(/illustration/i);
    expect(articleText).not.toMatch(/lifetime/i);
  });

  it("quotes the lead prices only as the vendors publish them, opened live on 2026-11-16", () => {
    const { articleText } = renderPage();
    expect(articleText).toMatch(/\$12 to \$30/); // Phonexa, shared workers comp web form
    expect(articleText).toMatch(/\$30 to \$120/); // Phonexa, commercial live transfer
    expect(articleText).toMatch(/\$10 to \$45/); // ActiveProspect, shared
    expect(articleText).toMatch(/\$45 to \$120/); // ActiveProspect, exclusive
    expect(articleText).toMatch(/\$0\.50 to \$15/); // ActiveProspect, aged
    expect(articleText).toMatch(/maximum of (3|three) agents/i); // EverQuote
    expect(articleText).toMatch(/\$1,000/); // Schwantz, cost of a sale at a 50% close
  });

  // The plain-book format: drawings a crawler can read, and short paragraphs.

  it("draws at least four inline SVGs, each with a <title> and <desc>, each inside a <figure> with a visible <figcaption>", () => {
    const { container } = renderPage();
    const article = container.querySelector("article")!;
    const svgs = [...article.querySelectorAll("svg")];
    expect(svgs.length).toBeGreaterThanOrEqual(4);
    expect(svgs.length).toBeLessThanOrEqual(5);
    for (const svg of svgs) {
      expect(
        svg.querySelector("title")?.textContent?.trim().length ?? 0,
      ).toBeGreaterThan(5);
      expect(
        svg.querySelector("desc")?.textContent?.trim().length ?? 0,
      ).toBeGreaterThan(20);
      expect(svg.getAttribute("role")).toBe("img");
      const figure = svg.closest("figure");
      expect(figure).not.toBeNull();
      const caption =
        figure!.querySelector("figcaption")?.textContent?.trim() ?? "";
      expect(words(caption).length).toBeGreaterThanOrEqual(8);
    }
  });

  it("every number drawn inside an SVG also appears in the page text, because AI crawlers do not read images", () => {
    const { container } = renderPage();
    const article = container.querySelector("article")!;
    const prose = readerCopy(article);
    const drawn = new Set<string>();
    for (const t of article.querySelectorAll("svg text")) {
      for (const m of (t.textContent ?? "").match(NUMBER) ?? []) drawn.add(m);
    }
    expect(drawn.size).toBeGreaterThan(5);
    const missing = [...drawn].filter((n) => !prose.includes(n));
    expect(missing).toEqual([]);
  });

  it("keeps every paragraph in the sections to four sentences or fewer", () => {
    const { container } = renderPage();
    const article = container.querySelector("article")!;
    const long: string[] = [];
    for (const s of article.querySelectorAll("section")) {
      if (s.id === "sources" || s.id === "faq") continue;
      for (const p of s.querySelectorAll("p")) {
        const text = p.textContent ?? "";
        const sentences = text
          .split(/[.?!]["”]?\s+(?=[A-Z$0-9“"])/)
          .filter((x) => x.trim().length > 0);
        if (sentences.length > 4) long.push(text.slice(0, 60));
      }
    }
    expect(long).toEqual([]);
  });
});
