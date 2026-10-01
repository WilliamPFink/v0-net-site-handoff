import type { Metadata } from "next"
import { LegalPage, LegalSection } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Service | ClearGuidance Studio",
  description:
    "The terms and conditions governing your use of the ClearGuidance Studio, Inc. stock analytics and portfolio management platform.",
  alternates: { canonical: "/terms" },
}

const SUPPORT_EMAIL = "support@clearguidancestudio.com"

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="May 31, 2026">
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing or using ClearGuidance Studio, Inc. (&quot;the Service&quot;), you agree to be bound by these
          Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use the Service.
        </p>
        <p>
          We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting
          the updated Terms on this page. Your continued use of the Service after such modifications constitutes your
          acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection heading="2. Description of Service">
        <p>
          ClearGuidance Studio, Inc. provides stock analytics, portfolio management tools, and financial modeling
          services (&quot;the Service&quot;). The Service includes:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Stock screening and analysis tools</li>
          <li>Discounted Cash Flow (DCF) valuation models</li>
          <li>Portfolio construction and tracking</li>
          <li>Modern Portfolio Theory (MPT) analysis</li>
          <li>Market data visualization and reporting</li>
          <li>Monte Carlo simulations (Advisor Pro tier)</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Important Disclaimers">
        <h3 className="text-sm font-bold text-white">Not Investment, Legal, or Tax Advice</h3>
        <p>
          THE SERVICE IS PROVIDED FOR INFORMATIONAL AND EDUCATIONAL PURPOSES ONLY. NOTHING ON THIS PLATFORM CONSTITUTES
          INVESTMENT ADVICE, FINANCIAL ADVICE, TRADING ADVICE, LEGAL ADVICE, TAX ADVICE, OR ANY OTHER SORT OF ADVICE. YOU
          SHOULD NOT TREAT ANY OF THE CONTENT AS SUCH.
        </p>
        <p>
          ClearGuidance Studio, Inc. does not recommend that any security, portfolio of securities, transaction, or
          investment strategy is suitable for any specific person. The information provided by the Service:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Is not personalized investment, legal, or tax advice</li>
          <li>Should not be the sole basis for any investment, legal, or tax decision</li>
          <li>May contain errors, inaccuracies, or outdated information</li>
          <li>Does not guarantee any specific investment outcome</li>
        </ul>
        <p>
          You are solely responsible for your own investment, legal, and tax decisions. Always conduct your own research
          and consult with a qualified financial advisor, attorney, and tax professional before making any investment,
          legal, or tax decisions.
        </p>
      </LegalSection>

      <LegalSection heading="4. Account Registration">
        <p>To access certain features of the Service, you must create an account. You agree to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Provide accurate, current, and complete information during registration</li>
          <li>Maintain and promptly update your account information</li>
          <li>Maintain the security and confidentiality of your login credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
        <p>You must be at least 18 years old to create an account and use the Service.</p>
      </LegalSection>

      <LegalSection heading="5. Subscription and Billing">
        <h3 className="text-sm font-bold text-white">5.1 Subscription Plans</h3>
        <p>
          The Service offers various subscription tiers (Foundation, Analyst, Advisor Pro) with different features and
          pricing. Details of each plan are available on our pricing page.
        </p>
        <h3 className="text-sm font-bold text-white">5.2 Free Trials</h3>
        <p>
          We may offer free trial periods for certain subscription plans. At the end of the trial period, you will be
          automatically charged for the subscription unless you cancel before the trial ends.
        </p>
        <h3 className="text-sm font-bold text-white">5.3 Billing</h3>
        <p>
          Subscription fees are billed in advance on a monthly or annual basis. All payments are processed securely
          through Stripe. By subscribing, you authorize us to charge your payment method for the subscription fees.
        </p>
        <h3 className="text-sm font-bold text-white">5.4 Cancellation and Refunds</h3>
        <p>
          You may cancel your subscription at any time through your account settings. Upon cancellation, you will retain
          access to the Service until the end of your current billing period. We do not provide refunds for partial
          billing periods, except where required by law.
        </p>
        <h3 className="text-sm font-bold text-white">5.5 Price Changes</h3>
        <p>
          We reserve the right to modify subscription prices. We will provide at least 30 days notice before any price
          increase takes effect on your account.
        </p>
      </LegalSection>

      <LegalSection heading="6. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Use the Service for any illegal purpose or in violation of any laws</li>
          <li>Attempt to gain unauthorized access to the Service or its related systems</li>
          <li>Interfere with or disrupt the Service or servers connected to the Service</li>
          <li>Use any automated means to access the Service without our written permission</li>
          <li>Reverse engineer, decompile, or disassemble any aspect of the Service</li>
          <li>Share your account credentials with others or allow others to access your account</li>
          <li>Redistribute, resell, or commercially exploit the Service without authorization</li>
          <li>Use the Service to transmit malware or other harmful code</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Intellectual Property">
        <p>
          The Service, including its original content, features, and functionality, is owned by ClearGuidance Studio,
          Inc. and is protected by copyright, trademark, and other intellectual property laws.
        </p>
        <p>
          You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your
          personal, non-commercial purposes in accordance with these Terms.
        </p>
        <p>
          Market data displayed in the Service is sourced from third-party providers and is subject to their respective
          terms and conditions.
        </p>
      </LegalSection>

      <LegalSection heading="8. Data Accuracy">
        <p>
          While we strive to provide accurate and timely market data and analysis, we do not guarantee the accuracy,
          completeness, or timeliness of any information provided through the Service. Market data may be delayed and
          should not be relied upon for real-time trading decisions.
        </p>
        <p>
          The valuations, projections, and analysis provided by the Service are based on mathematical models and
          assumptions that may not reflect actual market conditions or future performance.
        </p>
      </LegalSection>

      <LegalSection heading="9. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, CLEARGUIDANCE STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
          SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>Loss of profits, revenue, or anticipated savings</li>
          <li>Loss of data or business interruption</li>
          <li>Investment losses or financial damages</li>
          <li>Any damages arising from your reliance on information provided by the Service</li>
        </ul>
        <p>
          Our total liability for any claim arising out of or relating to these Terms or the Service shall not exceed the
          amount you paid for the Service in the 12 months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection heading="10. Disclaimer of Warranties">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
        <p>
          We do not warrant that the Service will be uninterrupted, error-free, secure, or free from viruses or other
          harmful components.
        </p>
      </LegalSection>

      <LegalSection heading="11. Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless ClearGuidance Studio, its officers, directors, employees,
          and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any
          way connected with your access to or use of the Service, your violation of these Terms, or your violation of
          any rights of another party.
        </p>
      </LegalSection>

      <LegalSection heading="12. Termination">
        <p>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or
          liability, for any reason, including if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by
          their nature should survive termination shall survive, including ownership provisions, warranty disclaimers,
          indemnity, and limitations of liability.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United States, without
          regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall be
          resolved in the courts located in the United States.
        </p>
      </LegalSection>

      <LegalSection heading="14. Severability">
        <p>
          If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or
          eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and
          effect.
        </p>
      </LegalSection>

      <LegalSection heading="15. Entire Agreement">
        <p>
          These Terms, together with our Privacy Policy, constitute the entire agreement between you and ClearGuidance
          Studio, Inc. regarding the Service and supersede all prior agreements and understandings.
        </p>
      </LegalSection>

      <LegalSection heading="16. Contact Information">
        <p>If you have any questions about these Terms, please contact us:</p>
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
