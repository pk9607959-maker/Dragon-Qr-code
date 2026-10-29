/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  Home,
  AlertTriangle,
  FileDown,
  ExternalLink,
  Mail,
  ShieldAlert,
  Scale,
  Printer,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const DisclaimerPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <span className="text-black font-bold">Disclaimer</span>
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
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                Disclaimer
              </h1>
              <p className="text-xs text-neutral-500 font-mono mt-1">
                Last updated: October 26, 2026
              </p>
              <p className="text-xs text-neutral-600 mt-1">
                Official legal declaration for <span className="font-semibold text-black">Dragon QR code</span> (
                <a
                  href="https://dragon-qr-code.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black font-mono text-[11px]"
                >
                  https://dragon-qr-code.vercel.app/
                </a>
                )
              </p>
            </div>
          </div>

          {/* Action buttons: Download original PDF */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <a
              href="/assets/aistudio/Disclaimer_e19b3881.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Disclaimer-Dragon-QR-Code.pdf"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black hover:bg-neutral-800 text-xs font-bold text-white transition-colors shadow-xs"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Official PDF</span>
            </a>
          </div>
        </div>

        {/* Quick Highlights / Key Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Scale className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">General Information</span>
              <span className="text-neutral-500 text-[11px]">Provided for general guidance purposes only</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Use At Your Own Risk</span>
              <span className="text-neutral-500 text-[11px]">No express or implied warranties of performance</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Printer className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Pre-Print Proofing</span>
              <span className="text-neutral-500 text-[11px]">Mandatory physical scanner test runs</span>
            </div>
          </div>
        </div>

        {/* Verbatim Document Body from Disclaimer_e19b3881.pdf */}
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
              <p className="text-xs text-neutral-600">For the purposes of this Disclaimer:</p>
              <ul className="space-y-2 text-xs">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Company</strong> (referred to as either
                    &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                    Disclaimer) refers to <span className="font-semibold text-neutral-900">Dragon QR code</span>.
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
                    <strong className="text-neutral-900">You</strong> means the individual
                    accessing the Service, or the company, or other legal entity on behalf of which
                    such individual is accessing or using the Service, as applicable.
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
              </ul>
            </div>
          </section>

          {/* Section: Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Disclaimer
            </h2>
            <p>
              The information contained on the Service is for general information purposes only.
            </p>
            <p>
              The Company assumes no responsibility for errors or omissions in the contents of the
              Service.
            </p>
            <p>
              In no event shall the Company be liable for any special, direct, indirect,
              consequential, or incidental damages or any damages whatsoever, whether in an action
              of contract, negligence or other tort, arising out of or in connection with the use of
              the Service or the contents of the Service. The Company reserves the right to make
              additions, deletions, or modifications to the contents on the Service at any time
              without prior notice. This Disclaimer has been created with the help of the Disclaimer
              Generator.
            </p>
            <p className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 font-medium">
              The Company does not warrant that the Service is free of viruses or other harmful
              components.
            </p>
          </section>

          {/* Section: External Links Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              External Links Disclaimer
            </h2>
            <p>
              The Service may contain links to external websites that are not provided or maintained
              by or in any way affiliated with the Company.
            </p>
            <p>
              Please note that the Company does not guarantee the accuracy, relevance, timeliness, or
              completeness of any information on these external websites.
            </p>
          </section>

          {/* Section: Errors and Omissions Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Errors and Omissions Disclaimer
            </h2>
            <p>
              The information given by the Service is for general guidance on matters of interest
              only. Even if the Company takes every precaution to ensure that the content of the
              Service is both current and accurate, errors can occur. Plus, given the changing
              nature of laws, rules and regulations, there may be delays, omissions or
              inaccuracies in the information contained on the Service.
            </p>
            <p>
              The Company is not responsible for any errors or omissions, or for the results
              obtained from the use of this information.
            </p>
          </section>

          {/* Section: Fair Use Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">05.</span>
              Fair Use Disclaimer
            </h2>
            <p>
              The Company may use copyrighted material which has not always been specifically
              authorized by the copyright owner. The Company is making such material available for
              criticism, comment, news reporting, teaching, scholarship, or research.
            </p>
            <p>
              The Company believes this constitutes a &quot;fair use&quot; of any such copyrighted
              material as provided for in section 107 of the United States Copyright law (or
              equivalent provisions under applicable law).
            </p>
            <p>
              If You wish to use copyrighted material from the Service for your own purposes that
              go beyond fair use, You must obtain permission from the copyright owner.
            </p>
          </section>

          {/* Section: Views Expressed Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">06.</span>
              Views Expressed Disclaimer
            </h2>
            <p>
              The Service may contain views and opinions which are those of the authors and do not
              necessarily reflect the official policy or position of any other author, agency,
              organization, employer or company, including the Company.
            </p>
            <p>
              If the Service allows users to post content (including comments), such content is the
              sole responsibility of the user who posted it. The Company is not liable for
              user-generated content and reserves the right to remove it for any reason.
            </p>
          </section>

          {/* Section: No Responsibility Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">07.</span>
              No Responsibility Disclaimer
            </h2>
            <p>
              The information on the Service is provided with the understanding that the Company is
              not herein engaged in rendering legal, accounting, tax, or other professional advice
              and services. As such, it should not be used as a substitute for consultation with
              professional accounting, tax, legal or other competent advisers.
            </p>
            <p>
              In no event shall the Company or its suppliers be liable for any special, incidental,
              indirect, or consequential damages whatsoever arising out of or in connection with
              your access or use or inability to access or use the Service.
            </p>
          </section>

          {/* Section: "Use at Your Own Risk" Disclaimer */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">08.</span>
              &quot;Use at Your Own Risk&quot; Disclaimer
            </h2>
            <p>
              All information in the Service is provided &quot;as is&quot;, with no guarantee of
              completeness, accuracy, timeliness or of the results obtained from the use of this
              information, and without warranty of any kind, express or implied, including, but
              not limited to warranties of performance, merchantability and fitness for a
              particular purpose.
            </p>
            <p>
              The Company will not be liable to You or anyone else for any decision made or action
              taken in reliance on the information given by the Service or for any consequential,
              special or similar damages, even if advised of the possibility of such damages.
            </p>
          </section>

          {/* Section: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">09.</span>
              Contact Us
            </h2>
            <p>
              If you have any questions about this Disclaimer, You can contact Us:
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
              onClick={() => onNavigate('terms')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Terms & Conditions &rarr;
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
