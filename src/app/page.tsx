"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Caveat, Libre_Baskerville, Mulish } from "next/font/google";

const libreBaskerville = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"] });
const mulish = Mulish({ subsets: ["latin"], weight: ["700", "800"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600"] });

const INK = "#141414";
const CREAM = "#F1E5C7";
const MUSTARD = "#F2A81D";
const ORANGE = "#E24A1E";
const BLUE = "#1E4FA0";
const GREEN = "#1C9A5A";
const PURPLE = "#7C5DA8";

type HoverKey = "work" | "journal" | "contact" | "process" | "careers" | "cat" | "services" | "clients";
type Expression = "neutral" | "happy" | "nerdy" | "surprised" | "sleepy" | "winking" | "blushing";

// Hover key -> [mascot expression, hand-written caption under the mascot]. Source: the client's
// design handoff (homepage/Silly Billi Homepage Design/design_handoff_homepage).
const FACE_BY_HOVER: Record<HoverKey, [Expression, string]> = {
  work: ["happy", "read. find the story. ship."],
  journal: ["nerdy", "we cut the good parts."],
  contact: ["surprised", "oh? a brief? for me?"],
  process: ["sleepy", "pfft.. i could do it in my sleep"],
  careers: ["winking", "not to brag but..."],
  cat: ["blushing", "oh stop."],
  services: ["happy", "my people."],
  clients: ["nerdy", "brand systems. built to last."],
};
const IDLE: [Expression, string] = ["neutral", "pick one. the cat is watching."];

const CARD_BASE =
  "group relative flex min-h-0 flex-col justify-between gap-2 overflow-hidden border-2 border-[#141414] " +
  "shadow-[4px_4px_0_0_#141414] transition-[transform,box-shadow,filter] duration-[140ms] " +
  "ease-[cubic-bezier(.34,1.4,.5,1)] hover:-translate-x-px hover:-translate-y-px hover:brightness-[1.06] " +
  "active:translate-x-0.5 active:translate-y-0.5 active:shadow-none py-[clamp(12px,2vh,22px)] px-[clamp(14px,1.5vw,24px)]";

function Card({
  hoverKey,
  href,
  gridClass,
  bg,
  color,
  setHover,
  children,
}: {
  hoverKey: HoverKey;
  href: string;
  gridClass: string;
  bg: string;
  color: string;
  setHover: (key: HoverKey | null) => void;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={() => setHover(hoverKey)}
      onMouseLeave={() => setHover(null)}
      onFocus={() => setHover(hoverKey)}
      onBlur={() => setHover(null)}
      style={{ backgroundColor: bg, color }}
      className={`${CARD_BASE} ${gridClass}`}
    >
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className={`${mulish.className} text-[12px] font-extrabold tracking-[0.08em]`}>{children}</span>
  );
}

function useMascotWidth() {
  const [width, setWidth] = useState(220);
  useEffect(() => {
    const recalc = () =>
      setWidth(
        Math.round(Math.max(90, Math.min(window.innerWidth * 0.36, window.innerHeight * 0.52 - 50, 480))),
      );
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);
  return width;
}

export default function Home() {
  const [hover, setHover] = useState<HoverKey | null>(null);
  const mascotWidth = useMascotWidth();
  const [expression, caption] = hover ? FACE_BY_HOVER[hover] : IDLE;

  return (
    <main
      className="h-dvh w-dvw overflow-hidden box-border bg-[#F1E5C7] text-[#141414] py-[clamp(16px,3vh,40px)] px-[clamp(16px,3vw,56px)]"
    >
      <h1 className="sr-only">Silly Billi Studio</h1>
      <div className="grid h-full grid-cols-[1.2fr_1fr_1fr_0.9fr] grid-rows-[1fr_1.3fr_1.3fr_0.9fr] gap-[clamp(10px,1.6vw,24px)]">
        <Card
          hoverKey="work"
          href="/hire-us"
          bg={MUSTARD}
          color={INK}
          setHover={setHover}
          gridClass="col-start-1 col-end-3 row-start-1 row-end-2"
        >
          <Eyebrow>01 — OUR PROCESS</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(24px,3vw,52px)] leading-[1.05]`}>
            How we handle your content
          </span>
        </Card>

        <Card
          hoverKey="journal"
          href="/video-editing"
          bg={PURPLE}
          color={CREAM}
          setHover={setHover}
          gridClass="col-start-3 col-end-4 row-start-1 row-end-2"
        >
          <Eyebrow>02 — SERVICES</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(18px,1.6vw,28px)] leading-[1.1]`}>
            Video Portfolio
          </span>
        </Card>

        <Card
          hoverKey="contact"
          href="/hire-us"
          bg={ORANGE}
          color={INK}
          setHover={setHover}
          gridClass="col-start-4 col-end-5 row-start-1 row-end-3"
        >
          <Eyebrow>03 — CONTACT</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(22px,2.4vw,40px)] leading-[1.08]`}>
            Send us the heavy stuff
          </span>
          <span className={`${libreBaskerville.className} text-[clamp(13px,1.3vw,17px)] leading-[1.3]`}>
            Hand over the raw files and let us handle the narrative, without losing the nuance.
          </span>
        </Card>

        <Link
          href="/about"
          onMouseEnter={() => setHover("process")}
          onMouseLeave={() => setHover(null)}
          onFocus={() => setHover("process")}
          onBlur={() => setHover(null)}
          className="group col-start-1 col-end-2 row-start-2 row-end-4 flex min-h-0 flex-col overflow-hidden border-2 border-[#141414] shadow-[4px_4px_0_0_#141414] transition-[transform,box-shadow,filter] duration-[140ms] ease-[cubic-bezier(.34,1.4,.5,1)] hover:-translate-x-px hover:-translate-y-px hover:brightness-[1.06] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <div
            className="flex-none text-[#F1E5C7] px-[clamp(14px,1.5vw,24px)] pt-[clamp(8px,1.2vh,14px)] pb-[clamp(4px,0.6vh,8px)]"
            style={{ backgroundColor: BLUE }}
          >
            <Eyebrow>04 — THESIS</Eyebrow>
          </div>
          <div
            className="flex min-h-0 flex-1 items-end text-[#F1E5C7] border-b-2 border-[#141414] px-[clamp(14px,1.5vw,24px)] pb-[clamp(14px,2.2vh,24px)]"
            style={{ backgroundColor: BLUE }}
          >
            <span className={`${libreBaskerville.className} text-[clamp(22px,2.1vw,28px)] leading-[1.25]`}>
              We turn dense research and raw files into sharp, high-retention narratives.
            </span>
          </div>
          <div
            className="flex flex-none items-center gap-[clamp(10px,1.2vw,20px)] text-[#F1E5C7] border-b-2 border-[#141414] px-[clamp(14px,1.5vw,24px)] py-[clamp(8px,1.2vh,14px)]"
            style={{ backgroundColor: GREEN }}
          >
            <span className={`${mulish.className} flex-shrink-0 text-[11px] font-extrabold tracking-[0.08em]`}>
              CONTENT EDITOR
            </span>
            <span className={`${libreBaskerville.className} text-[clamp(12px,1.1vw,16px)] font-bold leading-[1.25]`}>
              Knows the software + understands the nuance in your raw footage.
            </span>
          </div>
          <div
            className="flex flex-none items-center gap-[clamp(10px,1.2vw,20px)] text-[#141414] px-[clamp(14px,1.5vw,24px)] py-[clamp(8px,1.2vh,14px)]"
            style={{ backgroundColor: CREAM }}
          >
            <span className={`${mulish.className} flex-shrink-0 text-[11px] font-extrabold tracking-[0.08em]`}>
              TOOL OPERATOR
            </span>
            <span className={`${libreBaskerville.className} text-[clamp(13px,1.2vw,17px)] leading-[1.2]`}>
              Knows the software.
            </span>
          </div>
        </Link>

        <div className="col-start-2 col-end-4 row-start-2 row-end-4 flex min-h-0 flex-col items-center justify-center gap-1 overflow-hidden">
          <Image
            src={`/homepage/expressions/orange/${expression}.webp`}
            alt=""
            width={mascotWidth}
            height={mascotWidth}
            priority
            style={{ width: mascotWidth, height: "auto" }}
          />
          <div
            className={`${caveat.className} min-h-[1.2em] text-center text-[clamp(18px,2.4vh,28px)] leading-[1.2]`}
          >
            {caption}
          </div>
        </div>

        <Card
          hoverKey="careers"
          href="/channels-we-monetized"
          bg={GREEN}
          color={INK}
          setHover={setHover}
          gridClass="col-start-4 col-end-5 row-start-3 row-end-4"
        >
          <Eyebrow>05 — RESULTS</Eyebrow>
          <span
            className={`${libreBaskerville.className} text-[clamp(15px,1.4vw,20px)] font-bold leading-[1.3]`}
            style={{ color: CREAM }}
          >
            -1.5M+ subscribers gained across client channels
            <br />
            <br />
            -4000+ videos delivered
          </span>
        </Card>

        <Card
          hoverKey="cat"
          href="/about"
          bg={PURPLE}
          color={CREAM}
          setHover={setHover}
          gridClass="col-start-1 col-end-2 row-start-4 row-end-5"
        >
          <Eyebrow>06 — ABOUT</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(18px,1.8vw,30px)] leading-[1.1]`}>
            Our Lore
          </span>
        </Card>

        <Card
          hoverKey="services"
          href="/hire-us"
          bg={MUSTARD}
          color={INK}
          setHover={setHover}
          gridClass="col-start-2 col-end-4 row-start-4 row-end-5"
        >
          <Eyebrow>{"07 — WHO WE'RE FOR"}</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(15px,1.4vw,19px)] leading-[1.15]`}>
            Podcasters. Analysts. Macro thinkers. Commentators. Journalists.
          </span>
          <span className={`${libreBaskerville.className} text-[clamp(11px,0.95vw,14px)] leading-[1.25]`}>
            Serious people with serious ideas.
          </span>
        </Card>

        <Card
          hoverKey="clients"
          href="/visual-branding"
          bg={BLUE}
          color={CREAM}
          setHover={setHover}
          gridClass="col-start-4 col-end-5 row-start-4 row-end-5"
        >
          <Eyebrow>08 — ECOSYSTEMS</Eyebrow>
          <span className={`${libreBaskerville.className} text-[clamp(15px,1.4vw,21px)] leading-[1.05]`}>
            Brand &amp; Strategy Systems
          </span>
        </Card>
      </div>
    </main>
  );
}
