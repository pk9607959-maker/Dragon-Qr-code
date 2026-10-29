/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  Home,
  FileText,
  Mail,
  Scale,
  ShieldAlert,
  Globe2,
  AlertOctagon,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const TermsPage: React.FC<PageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E3E3E3] shadow-xs">
        <div className="flex items-center gap-2 text-xs text-neutral-600 font-mono">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:text-black flex items-center gap-1 font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate('dragon-psycho')}
            className="hover:text-black font-semibold transition-colors"
          >
            Dragon Psycho
          </button>
          <span>/</span>
          <span className="text-black font-bold">Terms and Conditions</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('dragon-psycho')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dragon Psycho
          </button>
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black hover:bg-neutral-800 text-xs font-semibold text-white transition-colors"
          >
            Go to Generator
          </button>
        </div>
      </div>

      {/* Main Legal Document Card */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Document Header */}
        <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                Terms and Conditions
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                Last updated: October 29, 2026
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Official terms for <span className="font-semibold text-black">Dragon QR code</span> (
                <a
                  href="https://dragon-qr-code.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black font-mono text-[11px]"
                >
                  https://dragon-qr-code.vercel.app/
                </a>
                ) &bull; Jurisdiction: <span className="font-semibold text-neutral-800">Uttar Pradesh, India</span>
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200">
            Binding Agreement
          </span>
        </div>

        {/* Preamble from Terms */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-800 space-y-2 leading-relaxed">
          <p className="font-semibold text-neutral-900">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">User Agreement</span>
              <span className="text-neutral-500 text-[11px]">Governs rights and obligations of all users</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Globe2 className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Governing Jurisdiction</span>
              <span className="text-neutral-500 text-[11px]">Laws of Uttar Pradesh, India</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Age Requirement</span>
              <span className="text-neutral-500 text-[11px]">Must be at least 18 years of age</span>
            </div>
          </div>
        </div>

        {/* Full Document Sections Verbatim */}
        <div className="space-y-8 text-sm text-neutral-700 leading-relaxed">
          {/* Section: Interpretation and Definitions */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">01.</span>
              Interpretation and Definitions
            </h2>

            <div className="space-y-2 pl-3 border-l-2 border-neutral-200">
              <h3 className="font-bold text-neutral-900 text-sm">Interpretation</h3>
              <p>
                The words whose initial letters are capitalized have meanings defined under the
                following conditions. The following definitions shall have the same meaning
                regardless of whether they appear in singular or in plural.
              </p>
            </div>

            <div className="space-y-3 pl-3 border-l-2 border-neutral-200">
              <h3 className="font-bold text-neutral-900 text-sm">Definitions</h3>
              <p className="text-xs text-neutral-600">
                For the purposes of these Terms and Conditions:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Affiliate</strong> means an entity that
                    controls, is controlled by, or is under common control with a party, where
                    &quot;control&quot; means ownership of 50% or more of the shares, equity
                    interest or other securities entitled to vote for election of directors or other
                    managing authority.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Country/State</strong> refers to:{' '}
                    <span className="font-bold text-neutral-900">Uttar Pradesh, India</span>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Company</strong> (referred to as either
                    &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these
                    Terms and Conditions) refers to{' '}
                    <span className="font-semibold text-neutral-900">Dragon QR code</span>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Device</strong> means any device that can
                    access the Service such as a computer, a cell phone or a digital tablet.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Service</strong> refers to the Website.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Terms and Conditions</strong> (also
                    referred to as &quot;Terms&quot;) means these Terms and Conditions, including any
                    documents expressly incorporated by reference, which govern Your access to and
                    use of the Service and form the entire agreement between You and the Company
                    regarding the Service. These Terms and Conditions have been created with the help
                    of the{' '}
                    <a
                      href="https://www.termsfeed.com/terms-conditions-generator/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black font-medium underline hover:text-neutral-600"
                    >
                      Terms and Conditions Generator
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Third-Party Social Media Service</strong>{' '}
                    means any services or content (including data, information, products or services)
                    provided by a third party that is displayed, included, made available, or linked
                    to through the Service.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Website</strong> refers to Dragon QR code,
                    accessible from{' '}
                    <a
                      href="https://dragon-qr-code.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-black underline hover:text-neutral-600"
                    >
                      https://dragon-qr-code.vercel.app/
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">You</strong> means the individual
                    accessing or using the Service, or the company, or other legal entity on behalf
                    of which such individual is accessing or using the Service, as applicable.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Acknowledgment */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Acknowledgment
            </h2>
            <p>
              These are the Terms and Conditions governing the use of this Service and the agreement
              between You and the Company. These Terms and Conditions set out the rights and
              obligations of all users regarding the use of the Service.
            </p>
            <p>
              Your access to and use of the Service is conditioned on Your acceptance of and
              compliance with these Terms and Conditions. These Terms and Conditions apply to all
              visitors, users and others who access or use the Service.
            </p>
            <p>
              By accessing or using the Service You agree to be bound by these Terms and Conditions.
              If You disagree with any part of these Terms and Conditions then You may not access the
              Service.
            </p>
            <p className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-900">
              You represent that you are over the age of 18. The Company does not permit those
              under 18 to use the Service.
            </p>
            <p>
              Your access to and use of the Service is also subject to Our Privacy Policy, which
              describes how We collect, use, and disclose personal information. Please read Our
              Privacy Policy carefully before using Our Service.
            </p>
          </section>

          {/* Section: Links to Other Websites */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              Links to Other Websites
            </h2>
            <p>
              Our Service may contain links to third-party websites or services that are not owned or
              controlled by the Company.
            </p>
            <p>
              The Company has no control over, and assumes no responsibility for, the content,
              privacy policies, or practices of any third-party websites or services. You further
              acknowledge and agree that the Company shall not be responsible or liable, directly or
              indirectly, for any damage or loss caused or alleged to be caused by or in connection
              with the use of or reliance on any such content, goods or services available on or
              through any such websites or services.
            </p>
            <p className="text-xs text-neutral-600">
              We strongly advise You to read the terms and conditions and privacy policies of any
              third-party websites or services that You visit.
            </p>

            <div className="pt-2 space-y-2">
              <h3 className="font-bold text-neutral-900 text-sm">
                Links from a Third-Party Social Media Service
              </h3>
              <p>
                The Service may display, include, make available, or link to content or services
                provided by a Third-Party Social Media Service. A Third-Party Social Media Service is
                not owned or controlled by the Company, and the Company does not endorse or assume
                responsibility for any Third-Party Social Media Service.
              </p>
              <p className="text-xs text-neutral-600">
                You acknowledge and agree that the Company shall not be responsible or liable,
                directly or indirectly, for any damage or loss caused or alleged to be caused by or in
                connection with Your access to or use of any Third-Party Social Media Service,
                including any content, goods, or services made available through them. Your use of
                any Third-Party Social Media Service is governed by that Third-Party Social Media
                Service&apos;s terms and privacy policies.
              </p>
            </div>
          </section>

          {/* Section: Termination */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Termination
            </h2>
            <p>
              We may terminate or suspend Your access immediately, without prior notice or
              liability, for any reason whatsoever, including without limitation if You breach these
              Terms and Conditions.
            </p>
            <p>Upon termination, Your right to use the Service will cease immediately.</p>
          </section>

          {/* Section: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">05.</span>
              Limitation of Liability
            </h2>
            <p>
              Notwithstanding any damages that You might incur, the entire liability of the Company
              and any of its suppliers under any provision of these Terms and Your exclusive remedy
              for all of the foregoing shall be limited to the amount actually paid by You through
              the Service or 100 USD if You haven&apos;t purchased anything through the Service.
            </p>
            <p>
              To the maximum extent permitted by applicable law, in no event shall the Company or its
              suppliers be liable for any special, incidental, indirect, or consequential damages
              whatsoever (including, but not limited to, damages for loss of profits, loss of data or
              other information, for business interruption, for personal injury, loss of privacy
              arising out of or in any way related to the use of or inability to use the Service,
              third-party software and/or third-party hardware used with the Service, or otherwise in
              connection with any provision of these Terms), even if the Company or any supplier has
              been advised of the possibility of such damages and even if the remedy fails of its
              essential purpose.
            </p>
            <p className="text-xs text-neutral-600">
              Some states do not allow the exclusion of implied warranties or limitation of
              liability for incidental or consequential damages, which means that some of the above
              limitations may not apply. In these states, each party&apos;s liability will be
              limited to the greatest extent permitted by law.
            </p>
          </section>

          {/* Section: "AS IS" and "AS AVAILABLE" Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">06.</span>
              &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
            </h2>
            <p>
              The Service is provided to You &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; and with
              all faults and defects without warranty of any kind. To the maximum extent permitted
              under applicable law, the Company, on its own behalf and on behalf of its Affiliates
              and its and their respective licensors and service providers, expressly disclaims all
              warranties, whether express, implied, statutory or otherwise, with respect to the
              Service, including all implied warranties of merchantability, fitness for a particular
              purpose, title and non-infringement, and warranties that may arise out of course of
              dealing, course of performance, usage or trade practice.
            </p>
            <p>
              Without limitation to the foregoing, the Company provides no warranty or undertaking,
              and makes no representation of any kind that the Service will meet Your requirements,
              achieve any intended results, be compatible or work with any other software,
              applications, systems or services, operate without interruption, meet any performance
              or reliability standards or be error free or that any errors or defects can or will be
              corrected.
            </p>
            <p>
              Without limiting the foregoing, neither the Company nor any of the company&apos;s
              provider makes any representation or warranty of any kind, express or implied:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>
                (i) as to the operation or availability of the Service, or the information, content,
                and materials or products included thereon;
              </li>
              <li>(ii) that the Service will be uninterrupted or error-free;</li>
              <li>
                (iii) as to the accuracy, reliability, or currency of any information or content
                provided through the Service; or
              </li>
              <li>
                (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of
                the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or
                other harmful components.
              </li>
            </ul>
            <p className="text-xs text-neutral-600">
              Some jurisdictions do not allow the exclusion of certain types of warranties or
              limitations on applicable statutory rights of a consumer, so some or all of the above
              exclusions and limitations may not apply to You. But in such a case the exclusions and
              limitations set forth in this section shall be applied to the greatest extent
              enforceable under applicable law.
            </p>
          </section>

          {/* Section: Governing Law */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">07.</span>
              Governing Law
            </h2>
            <p>
              The laws of the Country/State (<span className="font-bold text-neutral-900">Uttar Pradesh, India</span>),
              excluding its conflicts of law rules, shall govern these Terms and Your use of the
              Service. Your use of the Application may also be subject to other local, state,
              national, or international laws.
            </p>
          </section>

          {/* Section: Disputes Resolution */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">08.</span>
              Disputes Resolution
            </h2>
            <p>
              If You have any concern or dispute about the Service, You agree to first try to resolve
              the dispute informally by contacting the Company.
            </p>
          </section>

          {/* Section: For European Union (EU) Users */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">09.</span>
              For European Union (EU) Users
            </h2>
            <p>
              If You are a European Union consumer, you will benefit from any mandatory provisions of
              the law of the country in which You are resident.
            </p>
          </section>

          {/* Section: United States Legal Compliance */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">10.</span>
              United States Legal Compliance
            </h2>
            <p>
              You represent and warrant that (i) You are not located in a country that is subject to
              the United States government embargo, or that has been designated by the United States
              government as a &quot;terrorist supporting&quot; country, and (ii) You are not listed on
              any United States government list of prohibited or restricted parties.
            </p>
          </section>

          {/* Section: Severability and Waiver */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">11.</span>
              Severability and Waiver
            </h2>

            <div className="space-y-2 pl-3 border-l-2 border-neutral-200">
              <h3 className="font-bold text-neutral-900 text-sm">Severability</h3>
              <p>
                If any provision of these Terms is held to be unenforceable or invalid, such
                provision will be changed and interpreted to accomplish the objectives of such
                provision to the greatest extent possible under applicable law and the remaining
                provisions will continue in full force and effect.
              </p>
            </div>

            <div className="space-y-2 pl-3 border-l-2 border-neutral-200">
              <h3 className="font-bold text-neutral-900 text-sm">Waiver</h3>
              <p>
                Except as provided herein, the failure to exercise a right or to require performance
                of an obligation under these Terms shall not affect a party&apos;s ability to
                exercise such right or require such performance at any time thereafter nor shall the
                waiver of a breach constitute a waiver of any subsequent breach.
              </p>
            </div>
          </section>

          {/* Section: Translation Interpretation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">12.</span>
              Translation Interpretation
            </h2>
            <p>
              These Terms and Conditions may have been translated if We have made them available to
              You on our Service. You agree that the original English text shall prevail in the case
              of a dispute.
            </p>
          </section>

          {/* Section: Changes to These Terms and Conditions */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">13.</span>
              Changes to These Terms and Conditions
            </h2>
            <p>
              We reserve the right, at Our sole discretion, to modify or replace these Terms at any
              time. If a revision is material We will make reasonable efforts to provide at least 30
              days&apos; notice prior to any new terms taking effect. What constitutes a material
              change will be determined at Our sole discretion.
            </p>
            <p>
              By continuing to access or use Our Service after those revisions become effective, You
              agree to be bound by the revised terms. If You do not agree to the new terms, in whole
              or in part, please stop using the Service.
            </p>
          </section>

          {/* Section: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">14.</span>
              Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, You can contact us:
            </p>
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-neutral-500 font-medium block">By email:</span>
                <a
                  href="mailto:dragon3support@gmail.com"
                  className="font-mono font-bold text-sm text-neutral-900 hover:text-black underline underline-offset-2"
                >
                  dragon3support@gmail.com
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Quick Links to Other Dedicated Pages */}
        <div className="pt-6 border-t border-neutral-200">
          <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
            Other Dragon Psycho Pages
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Privacy Policy &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('disclaimer')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Disclaimer &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('refund')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Refund Policy &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about-us')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              About Us &rarr;
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact-us')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Contact Us &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
