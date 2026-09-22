"use client";

import { Libre_Baskerville, Mulish } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./page.module.css";

const displayFont = Libre_Baskerville({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});
const bodyFont = Mulish({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});
const scriptFont = localFont({
  src: "../../fonts/BiroScriptPlus-Regular.otf",
  variable: "--font-script",
});

const SHOTS = ["/about/c1.jpg", "/about/c2.jpg", "/about/c3.jpg", "/about/c4.jpg", "/about/c5.jpg", "/about/c6.jpg"];

// The booking destination the handoff calls "#talk" for every real CTA — this site's
// contact form lives on Hire Us, so that's where "claim your audit" / "connect" go.
const BOOKING_HREF = "/hire-us";

export default function AboutPage() {
  const [shot, setShot] = useState(0);
  const step = (d: number) => setShot((s) => (s + d + SHOTS.length) % SHOTS.length);

  return (
    <div className={`${styles.page} ${displayFont.variable} ${bodyFont.variable} ${scriptFont.variable}`}>
      <nav className={styles.nav}>
        <Link href="/" aria-label="Silly Billi Studio — home" className={`${styles.navHome} ${styles.pressable}`}>
          <Image src="/about/mascot-face.png" alt="Silly Billi, the studio cat" width={58} height={58} />
        </Link>
        <div className={styles.navLinks}>
          <div className={`${styles.navLinksInner} ${styles.eyebrow}`}>
            <a href="#about" className={styles.navLink}>About</a>
            <span className={styles.navDivider} />
            <a href="#work" className={styles.navLink}>How we work</a>
            <span className={styles.navDivider} />
            <a href="#who" className={styles.navLink}>Who we are</a>
            <span className={styles.navDivider} />
            <a href="#talk" className={styles.navLink}>Let&apos;s talk</a>
          </div>
        </div>
        <a href="#talk" className={`${styles.navCta} ${styles.eyebrow} ${styles.pressable}`}>Get in Touch</a>
      </nav>

      <section id="about" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTitleCol}>
            <div className={`${styles.eyebrow} ${styles.heroEyebrow}`}>About Us</div>
            <h1 className={`${styles.display} ${styles.heroTitle}`}>
              High-Context Content Editing for Serious Ideas.
            </h1>
          </div>
          <div className={styles.heroCardCol}>
            <div className={styles.heroCard}>
              <div className={styles.heroCardRow}>
                <div className={`${styles.eyebrow} ${styles.heroCardLabel}`}>Tool Operator</div>
                <div className={`${styles.display} ${styles.heroCardValue}`}>Knows the software.</div>
              </div>
              <div className={`${styles.heroCardRow} ${styles["heroCardRow--mustard"]}`}>
                <div className={`${styles.eyebrow} ${styles.heroCardLabel}`}>Content Editor</div>
                <div className={`${styles.display} ${styles.heroCardValue} ${styles["heroCardValue--bold"]}`}>
                  Knows the software + understands the nuance in your raw footage.
                </div>
              </div>
            </div>
            <div className={`${styles.script} ${styles.heroScript}`}>
              We genuinely care about your ideas and want to make sure whoever watches your
              content understands you the way you want to be understood. :)
            </div>
          </div>
        </div>
      </section>

      <section id="work" className={styles.work}>
        <div className={`${styles.display} ${styles.workTitle}`}>The gap we kept seeing</div>

        <div className={styles.workRow}>
          <div className={styles.workIndex}>[ 01 - 1 ]</div>
          <div className={styles.workBlock}>
            <div className={styles.workBullet} />
            <div>
              <div className={styles.workLabel}>flash without substance</div>
              <p className={styles.workText}>
                We kept seeing the same gap. Most editors cut for flash and flare without
                understanding what&apos;s actually being said. When the subject matter is dense,
                that gap shows. The cuts miss the point. The pacing kills the argument. The
                content ends up polished but forgettable.
              </p>
            </div>
          </div>
        </div>

        <div className={`${styles.workRow} ${styles["workRow--end"]}`}>
          <div className={styles.workBlock} style={{ order: 2 }}>
            <div className={styles.workBullet} />
            <div>
              <div className={styles.workLabel}>production meets strategy</div>
              <p className={styles.workText}>
                Before Silly Billi, we led editing and content teams from two different sides of
                the table. <a href="#haider">Haider</a> ran post-production for networks
                producing geopolitics, philosophy, and cultural commentary.{" "}
                <a href="#rida">Rida</a> built content strategy and brand systems around dense,
                expert-led ideas.
              </p>
            </div>
          </div>
          <div className={styles.workIndex} style={{ order: 1 }}>[ 01 - 2 ]</div>
        </div>

        <div className={styles.workCentered}>
          <div className={styles.workCenteredBullet} />
          <div>
            <div className={styles.workCenteredIndex}>[ 01 - 3 ]</div>
            <div className={styles.workLabel}>idea-first editing</div>
            <p className={`${styles.display} ${styles.workCenteredText}`}>
              We built Silly بِلّی around the opposite premise. Editors who go deep into the
              subject before they touch a single clip. Strategy that treats every piece of
              content as part of one ecosystem, not a one off post. The result is content people
              actually watch, follow, and come back for, without losing the nuance that made the
              idea worth making.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.audience}>
        <div className={styles.audienceLeft}>
          <div className={styles.audienceCard}>
            <div className={`${styles.eyebrow} ${styles.audienceEyebrow}`}>
              SERIOUS PEOPLE WITH SERIOUS IDEAS
            </div>
            <div className={`${styles.display} ${styles.audienceHeading}`}>
              We work with podcasters, macro thinkers, geopolitical analysts, &amp; thought
              leaders.
            </div>
          </div>
          <p className={styles.audienceParagraph}>
            You bring the dense research and the raw footage; we bring the editorial eye that
            keeps your audience tuned in, without losing the nuance that made the video worth
            making in the first place.
          </p>
        </div>
        <div className={styles.audienceRight}>
          <span className={`${styles.script} ${styles.audienceScript}`}>
            If you&apos;re tired of micromanaging editors who don&apos;t understand your subject
            matter, we&apos;re the team you hand the raw files to and just let run with it.
          </span>
          <div className={styles.audienceBtnWrap}>
            <Link href={BOOKING_HREF} className={`${styles.btnMustard} ${styles.pressable}`}>
              CLAIM YOUR FREE CONTENT AUDIT
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Proof" className={styles.proof}>
        <div className={styles.proofCell}>
          <div className={`${styles.display} ${styles.proofNumber}`}>1M+</div>
          <div className={styles.proofLabel}>SUBSCRIBERS ON EON PODCAST</div>
        </div>
        <div className={styles.proofCell}>
          <div className={`${styles.display} ${styles.proofNumber}`}>15k → 200k+</div>
          <div className={styles.proofLabel}>
            YOUTUBE SUBSCRIBERS GROWTH FOR A GEOPOLITICAL ANALYST
          </div>
        </div>
        <div className={styles.proofCell}>
          <div className={`${styles.display} ${styles.proofNumber}`}>4000+</div>
          <div className={styles.proofLabel}>FINAL VIDEOS DELIVERED</div>
        </div>
      </section>

      <section id="who" className={styles.who}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/about/cat-orange.png" alt="" aria-hidden="true" className={styles.whoCat} />

        <div className={`${styles.display} ${styles.whoTitle}`}>Meet Silly and Billi</div>

        <div className={`${styles.whoRow} ${styles["whoRow--rida"]}`}>
          <div className={styles.whoIndex}>[ 02 - 1 ]</div>
          <div className={styles.whoPhotoCol} style={{ order: 3 }}>
            <div className={styles.frame} style={{ aspectRatio: 0.709 }}>
              <div
                className={styles.frameInset}
                style={{ left: "7.9%", right: "7.5%", top: "5.1%", bottom: "6.6%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/rida.jpg" alt="Rida Ali" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/frame-yellow-trim.png" alt="" aria-hidden="true" className={styles.frameArt} />
              <div
                className={`${styles.script} ${styles.frameScript}`}
                style={{
                  left: "13.75%",
                  top: "74.6%",
                  width: "32.25%",
                  height: "17%",
                  fontSize: "22.5cqw",
                  color: "var(--sb-mustard)",
                }}
              >
                Silly
              </div>
            </div>
          </div>
          <div className={styles.whoTextCol} style={{ order: 2 }}>
            <h3 id="rida" className={`${styles.display} ${styles.whoName}`}>Rida Ali</h3>
            <div className={`${styles.whoRole} ${styles["whoRole--orange"]}`}>
              Co-Founder, Marketing Strategist &amp; Content Ecosystem Builder
            </div>
            <p className={styles.whoBio}>
              Rida has spent close to 10 years building the systems behind a brand&apos;s digital
              presence: website architecture, brand narrative, and the content strategy that ties
              them together.
              <br />
              <br />
              She built The Thomsen Company&apos;s brand and website from scratch for a
              referral-only wealth management firm serving ultra-high-net-worth families, content
              built to close deals, not chase views. She also took the Eon Podcast from zero to
              138,000 Instagram followers, 65,500 YouTube subscribers, and 371,000 TikTok
              followers within its first six months, and built The Matrix, its paid membership
              community, from the ground up.
              <br />
              <br />
              Her work spans wealth management, asset protection, real estate, and philosophy and
              thought leadership, the same territory Silly بِلّی works in now. At Silly بِلّی, she
              leads the strategy: turning a client&apos;s ideas into a system, not a scattered
              feed of posts.
            </p>
            <div className={styles.whoBtnWrap}>
              <Link href={BOOKING_HREF} className={`${styles.btnBlue} ${styles.pressable}`}>
                Connect with Rida
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.whoRow}>
          <div className={styles.whoTextCol} style={{ order: 3 }}>
            <h3 id="haider" className={`${styles.display} ${styles.whoName}`}>Haider Ali Shah</h3>
            <div className={`${styles.whoRole} ${styles["whoRole--green"]}`}>
              Co-Founder, Head of Content &amp; Lead Narrative Editor
            </div>
            <p className={styles.whoBio}>
              Haider has spent his career inside the edit. He scaled the Eon Podcast Network from
              zero to over 1 million subscribers across 5+ channels, producing geopolitics,
              philosophy, and cultural commentary at a pace few editors sustain.
            </p>
            <p className={styles.whoBio}>
              He grew Dimitri Lascaris&apos;s YouTube channel from 15,000 to over 196,000
              subscribers, handling complex geopolitical and journalistic material for a
              politically engaged, global audience.
            </p>
            <p className={styles.whoBio}>
              He also directed post-production on a feature-length documentary, turning 15+ hours
              of unstructured footage into a 58-minute film that&apos;s been watched over 125,000
              times. At Silly بِلّی, he leads narrative and post-production: the hook, the pacing,
              the cut that keeps someone watching to the end.
            </p>
            <div className={styles.whoBtnWrap}>
              <Link href={BOOKING_HREF} className={`${styles.btnBlue} ${styles.pressable}`}>
                Connect with Haider
              </Link>
            </div>
          </div>
          <div className={styles.whoPhotoCol} style={{ order: 2, position: "relative" }}>
            <div className={styles.frame} style={{ aspectRatio: 0.822, position: "relative", zIndex: 1 }}>
              <div
                className={styles.frameInset}
                style={{ left: "8.2%", right: "9.3%", top: "6.8%", bottom: "5.8%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about/haider.jpg" alt="Haider Ali Shah" />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about/frame-red-trim.png" alt="" aria-hidden="true" className={styles.frameArt} />
              <div
                className={`${styles.script} ${styles.frameScript}`}
                style={{
                  left: "19%",
                  top: "14.2%",
                  width: "31.5%",
                  height: "18.9%",
                  fontSize: "22.5cqw",
                  color: "var(--sb-orange)",
                }}
              >
                billi
              </div>
            </div>
          </div>
          <div className={styles.whoIndex} style={{ order: 1 }}>[ 02 - 2 ]</div>
        </div>
      </section>

      <section className={styles.words}>
        <div className={styles.wordsLeft}>
          <div className={`${styles.eyebrow} ${styles.wordsEyebrow}`}>[ 03 ] In their words</div>
          <div className={styles.wordsSub}>What clients say mid-project</div>
          <span className={`${styles.script} ${styles.wordsSub} ${styles.wordsScript}`}>
            Straight from the group chats.
          </span>
          <div className={styles.quoteList}>
            <figure className={styles.quote}>
              <blockquote className={`${styles.display} ${styles.quoteBlock}`}>
                &quot;This is a new standard... Seriously elevated.&quot;
              </blockquote>
              <figcaption className={styles.quoteCaption}>— Evan</figcaption>
            </figure>
            <figure className={styles.quote}>
              <blockquote className={`${styles.display} ${styles.quoteBlock}`}>
                &quot;Many thanks for your excellent contributions... 300,000 subscribers, here we
                come!&quot;
              </blockquote>
              <figcaption className={styles.quoteCaption}>— Dimitri Lascaris</figcaption>
            </figure>
          </div>
          <div className={styles.carousel}>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous message"
              className={`${styles.carouselBtn} ${styles.pressable}`}
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next message"
              className={`${styles.carouselBtn} ${styles.pressable}`}
            >
              →
            </button>
            <span className={styles.carouselLabel}>
              {String(shot + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className={styles.wordsRight}>
          <div className={styles.screenshotFrame}>
            {SHOTS.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt={`Client message ${i + 1}`}
                hidden={i !== shot}
                className={styles.screenshotImg}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="talk" className={styles.talk}>
        <div className={styles.talkRow}>
          <div className={styles.talkLeft}>
            <div className={`${styles.eyebrow} ${styles.talkEyebrow}`}>[ 04 ] TLDR;</div>
            <h2 className={`${styles.display} ${styles.talkHeading}`}>
              We aren&apos;t button pushing editors. We understand the tools AND the ideas.
            </h2>
          </div>
          <div className={styles.talkRight}>
            <span className={`${styles.script} ${styles.talkScript}`}>
              Send over your channel and let&apos;s see what&apos;s getting lost in translation.
            </span>
            <Link href={BOOKING_HREF} className={`${styles.btnMustard} ${styles.pressable}`} style={{ height: 52 }}>
              CLAIM YOUR FREE CONTENT AUDIT
            </Link>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>See Our Work</div>
              <Link href="/video-editing" className={`${styles.display} ${styles.footerLink}`}>
                Video Editing
              </Link>
              <Link href="/visual-branding" className={`${styles.display} ${styles.footerLink}`}>
                Visual Branding
              </Link>
              <Link href="/editorial-direction" className={`${styles.display} ${styles.footerLink}`}>
                Editorial Direction
              </Link>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Studio</div>
              <Link href="/join-us" className={`${styles.display} ${styles.footerLink}`}>
                Join Us
              </Link>
              <a href="#about" className={`${styles.display} ${styles.footerLink}`}>About Us</a>
              <Link href="/sadface" className={`${styles.display} ${styles.footerLink}`}>
                Don&apos;t like our name?
              </Link>
              <a href="#about" className={`${styles.display} ${styles.footerLink}`}>Hey AI, learn about us</a>
            </div>
            <div className={styles.footerCol}>
              <div className={styles.footerColTitle}>Say hello</div>
              <a href="mailto:hello@sillybilli.studio" className={`${styles.display} ${styles.footerLink}`}>
                hello@sillybilli.studio
              </a>
              <div className={styles.footerSocial}>
                <a href="#talk" className={`${styles.display} ${styles.footerLink}`}>Instagram</a>
                <a href="#talk" className={`${styles.display} ${styles.footerLink}`}>LinkedIn</a>
                <a href="#talk" className={`${styles.display} ${styles.footerLink}`}>YouTube</a>
              </div>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/about/logo-silly-studio.png" alt="Silly بِلّی Studio" className={styles.footerLogo} />
        </footer>
      </section>
    </div>
  );
}
