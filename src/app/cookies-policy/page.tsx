import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookies Policy — Silly Billi Studio",
  description:
    "How the Silly Billi Studio website uses cookies and similar technologies, and which third parties may set them.",
};

export default function CookiesPolicyPage() {
  return (
    <LegalPage title="Cookies Policy" updated="26 September 2026">
      <p>
        This policy explains how this website uses cookies and similar technologies. It should be
        read together with our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies are small text files that a website can store on your device. Similar technologies,
        such as local storage, work in much the same way, so we refer to all of them as
        &ldquo;cookies&rdquo; here.
      </p>

      <h2>Our own cookies</h2>
      <p>
        Silly Billi Studio doesn&apos;t set any cookies of its own on this site &mdash; no analytics,
        advertising, social-media tracking, or login cookies &mdash; and we don&apos;t store anything
        in your browser&apos;s local or session storage. Because there&apos;s nothing to accept or
        refuse, we don&apos;t show a cookie banner.
      </p>

      <h2>Third-party content that may use cookies</h2>
      <p>
        A few parts of the site involve other companies. We don&apos;t control the cookies they set,
        so please read their policies:
      </p>
      <ul>
        <li>
          <strong>YouTube.</strong> Some video pages play the video through an embedded YouTube
          player. We use YouTube&apos;s privacy-enhanced mode (youtube-nocookie.com), which is
          designed not to store information about you unless you play the video. If you do play it,
          Google may set cookies or use similar technologies. See{" "}
          <a
            href="https://policies.google.com/technologies/cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            how Google uses cookies
          </a>
          .
        </li>
        <li>
          <strong>Instagram.</strong> Our pages are able to display Instagram posts using
          Instagram&apos;s official embed. None are shown at the moment, but if we add any,
          Instagram (Meta) may set cookies when the embed loads. See{" "}
          <a
            href="https://help.instagram.com/1896641480634370"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram&apos;s cookies policy
          </a>
          .
        </li>
        <li>
          <strong>Hosting.</strong> This site and its images and videos are delivered by Vercel. We
          haven&apos;t set anything up that places cookies on visitors&apos; devices; if Vercel ever
          needs to (for example to run a security check), it would be strictly to keep the site
          secure and working.
        </li>
        <li>
          <strong>Links to other sites.</strong> When you follow a link to another website, that
          site&apos;s own cookies and policies apply.
        </li>
      </ul>

      <h2>Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser&apos;s settings, and you can normally block
        third-party cookies on their own. How to do it depends on your browser:
      </p>
      <ul>
        <li>
          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/kb/clear-cookies-and-site-data-firefox"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>
      <p>
        Since we set none ourselves, browsing this site with cookies switched off won&apos;t affect
        how our own pages work.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we add analytics, embeds, or other tools that use cookies, we&apos;ll update this page
        when they go live and, where the law requires it, ask for your consent first. The
        &ldquo;Last updated&rdquo; date at the top shows when it last changed.
      </p>

      <h2>Contact us</h2>
      <p>
        Questions? Send a message through the contact form on our <Link href="/hire-us">Hire Us</Link>{" "}
        page.
      </p>
    </LegalPage>
  );
}
