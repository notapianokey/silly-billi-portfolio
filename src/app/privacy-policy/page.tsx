import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Silly Billi Studio",
  description:
    "What personal information the Silly Billi Studio website collects, why, who handles it, and your choices.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="26 September 2026">
      <p>
        Silly Billi Studio (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a creative studio offering video
        editing, visual branding, editorial direction, and marketing &amp; ads. This policy explains
        what personal information this website collects, why, who handles it, and the choices you
        have. We collect very little, so it&apos;s short.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>There are no accounts, sign-ups, newsletters, or payments on this site.</li>
        <li>
          We don&apos;t use analytics, advertising, or tracking tools, and the site sets no cookies of
          its own (see our <Link href="/cookies-policy">Cookies Policy</Link>).
        </li>
        <li>
          The only personal information you actively give us is what you type into a contact form.
        </li>
        <li>We never sell your information.</li>
      </ul>

      <h2>What we collect and why</h2>
      <p>
        <strong>Contact forms.</strong> The forms on our <Link href="/hire-us">Hire Us</Link> and{" "}
        <Link href="/join-us">Join Us</Link> pages collect your name, email address, and message,
        along with which of those two pages you used. We use this to reply to you and to discuss a
        possible project or role. We don&apos;t add you to a mailing list.
      </p>
      <p>
        <strong>Technical information.</strong> When you visit, our hosting provider automatically
        processes technical information such as your IP address, browser and device type, the pages
        requested, and timestamps. This is needed to deliver the site, keep it secure, and prevent
        abuse. We don&apos;t use it to identify you personally or to build profiles about you.
      </p>
      <p>
        <strong>What stays in your browser.</strong> The search box on our video pages filters the
        page inside your browser &mdash; what you type is not sent to us. Buttons such as Like,
        Subscribe, and Share on those pages don&apos;t record anything about you.
      </p>

      <h2>Legal basis</h2>
      <p>
        Where the EU or UK GDPR applies, we process contact-form messages because it&apos;s
        necessary to take steps you ask for (such as discussing a project) and for our legitimate
        interests in running our business and answering enquiries. We process technical information
        for our legitimate interests in keeping the site secure and working.
      </p>

      <h2>Who handles your information</h2>
      <p>We use a small number of service providers, who process information on our behalf:</p>
      <ul>
        <li>
          <strong>Vercel Inc.</strong> hosts the website and serves its images and videos.{" "}
          <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">
            Vercel&apos;s privacy notice
          </a>
          .
        </li>
        <li>
          <strong>Google</strong> delivers the messages sent through our contact forms to us, using
          Google Apps Script and email.{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Google&apos;s privacy policy
          </a>
          .
        </li>
      </ul>
      <p>
        Some pages show or link to content from other companies, such as YouTube and Instagram. When
        you play or interact with that content, that company handles your information under its own
        policy &mdash; our <Link href="/cookies-policy">Cookies Policy</Link> has the details. We
        don&apos;t sell or rent personal information, and we disclose it only if the law requires it
        or to protect our legal rights.
      </p>

      <h2>International transfers</h2>
      <p>
        Our providers operate around the world, so your information may be processed outside your own
        country, including in the United States. Where the law requires it, they rely on recognised
        safeguards such as standard contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Contact-form messages live in our email inbox. We keep them for as long as needed to handle
        your enquiry and any work that follows, and to maintain sensible business records, then
        delete them. You can ask us to delete yours sooner at any time. Technical information is kept
        by our hosting provider under its own retention practices.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under the EU/UK GDPR or California privacy law), you
        may have the right to:
      </p>
      <ul>
        <li>ask what personal information we hold about you, and get a copy;</li>
        <li>have inaccurate information corrected;</li>
        <li>have your information deleted;</li>
        <li>object to, or ask us to restrict, how we use it;</li>
        <li>withdraw consent, where we&apos;ve relied on it; and</li>
        <li>complain to your local data protection authority.</li>
      </ul>
      <p>
        We don&apos;t sell or share personal information for advertising, and we won&apos;t treat you
        differently for exercising any of these rights. To make a request, see &ldquo;Contact
        us&rdquo; below.
      </p>

      <h2>Security</h2>
      <p>
        The site is served over HTTPS, and we apply sensible technical safeguards to it. No online
        service is completely secure, though &mdash; so please don&apos;t send passwords, payment
        details, or other sensitive personal information through the contact form.
      </p>

      <h2>Children</h2>
      <p>
        This site isn&apos;t aimed at children under 16, and we don&apos;t knowingly collect their
        personal information. If you believe a child has sent us something, contact us and
        we&apos;ll delete it.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to third-party sites (such as YouTube and Instagram). We don&apos;t control them and
        aren&apos;t responsible for their privacy practices.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at the top
        shows when it last changed.
      </p>

      <h2>Contact us</h2>
      <p>
        For any privacy question or request, send a message through the contact form on our{" "}
        <Link href="/hire-us">Hire Us</Link> page and start it with &ldquo;Privacy request&rdquo;.
        We&apos;ll reply as soon as we reasonably can.
      </p>
    </LegalPage>
  );
}
