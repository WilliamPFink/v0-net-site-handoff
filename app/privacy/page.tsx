import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy | ClearGuidance Studio",
  description:
    "How ClearGuidance Studio, Inc. collects, uses, discloses, and safeguards your information when you use our platform.",
  alternates: { canonical: "/privacy" },
}

const SUPPORT_EMAIL = "support@clearguidancestudio.com"

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="May 31, 2026">
      <LegalSection heading="1. Introduction">
        <p>
          ClearGuidance Studio, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting
          your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
          you use our stock analytics and portfolio management platform at clearguidancestudio.com (the
          &quot;Service&quot;).
        </p>
        <p>
          Please read this Privacy Policy carefully. By accessing or using the Service, you acknowledge that you have
          read, understood, and agree to be bound by this Privacy Policy.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information We Collect">
        <h3 className="text-sm font-bold text-white">2.1 Personal Information</h3>
        <p>When you create an account or subscribe to our Service, we may collect:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Name and email address</li>
          <li>Account credentials</li>
          <li>Billing information and payment details (processed securely through Stripe)</li>
          <li>Subscription preferences and tier selection</li>
        </ul>
        <h3 className="text-sm font-bold text-white">2.2 Usage Information</h3>
        <p>We automatically collect certain information when you use the Service:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Device information (browser type, operating system)</li>
          <li>IP address and general location data</li>
          <li>Pages visited and features used</li>
          <li>Watchlists, saved models, and portfolio configurations</li>
          <li>Search queries and stock symbols viewed</li>
        </ul>
        <h3 className="text-sm font-bold text-white">2.3 Financial Data</h3>
        <p>
          To provide our analytics services, we process stock market data from third-party providers. We do not collect
          or store your personal brokerage account information, trading history, or actual investment holdings unless you
          explicitly provide them.
        </p>
      </LegalSection>

      <LegalSection heading="3. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Provide, maintain, and improve the Service</li>
          <li>Process subscriptions and payments</li>
          <li>Send you technical notices, updates, and support messages</li>
          <li>Respond to your comments, questions, and customer service requests</li>
          <li>Personalize your experience and deliver relevant content</li>
          <li>Monitor and analyze usage patterns and trends</li>
          <li>Detect, prevent, and address technical issues or fraud</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Information Sharing and Disclosure">
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share your information in the
          following circumstances:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>
            <span className="text-zinc-300 font-semibold">Service Providers:</span> With third-party vendors who perform
            services on our behalf (e.g., Stripe for payments, Supabase for authentication)
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Legal Requirements:</span> When required by law or to respond
            to legal process
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Protection of Rights:</span> To protect the rights, property,
            or safety of ClearGuidance Studio, our users, or others
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Business Transfers:</span> In connection with a merger,
            acquisition, or sale of assets
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Data Security">
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information
          against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Encryption of data in transit and at rest</li>
          <li>Secure authentication through industry-standard protocols</li>
          <li>Regular security assessments and updates</li>
          <li>Limited access to personal information by employees</li>
        </ul>
        <p>
          However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to
          protect your personal information, we cannot guarantee its absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="6. Cookies and Tracking Technologies">
        <p>
          We use cookies and similar tracking technologies to track activity on our Service and hold certain
          information. Cookies are files with small amounts of data that may include an anonymous unique identifier.
        </p>
        <p>We use cookies for:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>
            <span className="text-zinc-300 font-semibold">Essential Cookies:</span> Required for the Service to function
            properly (authentication, security)
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Analytics Cookies:</span> To understand how visitors interact
            with our Service
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Preference Cookies:</span> To remember your settings and
            preferences
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Advertising Cookies:</span> To serve and measure
            advertisements through Google AdSense and its partners
          </li>
        </ul>
        <p>
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
          you do not accept cookies, you may not be able to use some portions of our Service.
        </p>
      </LegalSection>

      <LegalSection heading="6a. Advertising and Google AdSense">
        <p>
          We use Google AdSense, a third-party advertising service provided by Google LLC, to display advertisements on
          our Service. Google AdSense uses cookies and similar technologies to serve ads based on your prior visits to
          our Service and other websites.
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>
            Google, as a third-party vendor, uses cookies (including the DoubleClick cookie) to serve ads based on your
            visits to this and other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit
            to our Service and/or other sites on the Internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Google Ads Settings
            </a>
            . You can also opt out of third-party vendor cookies at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>
          For more information on how Google uses data when you use our partners&apos; sites or apps, please review the{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Google Privacy &amp; Terms
          </a>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Services">
        <p>Our Service integrates with third-party services that have their own privacy policies:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Stripe: For payment processing — Stripe Privacy Policy</li>
          <li>Supabase: For authentication and data storage — Supabase Privacy Policy</li>
          <li>Vercel: For hosting and analytics — Vercel Privacy Policy</li>
          <li>Financial Modeling Prep: For market data — FMP Privacy Policy</li>
          <li>Google AdSense: For displaying advertisements — Google Privacy Policy</li>
        </ul>
      </LegalSection>

      <LegalSection heading="8. Your Rights and Choices">
        <p>Depending on your location, you may have certain rights regarding your personal information:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>
            <span className="text-zinc-300 font-semibold">Access:</span> Request a copy of the personal information we
            hold about you
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Correction:</span> Request correction of inaccurate personal
            information
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Deletion:</span> Request deletion of your personal information
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Portability:</span> Request transfer of your data to another
            service
          </li>
          <li>
            <span className="text-zinc-300 font-semibold">Opt-out:</span> Unsubscribe from marketing communications
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:text-blue-300 transition-colors">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </LegalSection>

      <LegalSection heading="9. Data Retention">
        <p>
          We retain your personal information for as long as your account is active or as needed to provide you the
          Service. We may also retain and use your information to comply with legal obligations, resolve disputes, and
          enforce our agreements.
        </p>
        <p>
          When you delete your account, we will delete or anonymize your personal information within 30 days, unless we
          are required to retain it for legal purposes.
        </p>
      </LegalSection>

      <LegalSection heading="10. Children's Privacy">
        <p>
          Our Service is not intended for individuals under the age of 18. We do not knowingly collect personal
          information from children under 18. If we become aware that we have collected personal information from a child
          under 18, we will take steps to delete such information.
        </p>
      </LegalSection>

      <LegalSection heading="11. International Data Transfers">
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These
          countries may have different data protection laws. By using the Service, you consent to the transfer of your
          information to the United States and other jurisdictions where we and our service providers operate.
        </p>
      </LegalSection>

      <LegalSection heading="12. Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this
          Privacy Policy periodically for any changes.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact Us">
        <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
        <p>
          ClearGuidance Studio, Inc.
          <br />
          Email:{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-blue-400 hover:text-blue-300 transition-colors">
            {SUPPORT_EMAIL}
          </a>
          <br />
          Website: clearguidancestudio.com
        </p>
      </LegalSection>
    </LegalPage>
  )
}
