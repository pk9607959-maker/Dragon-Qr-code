/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowLeft,
  Home,
  RotateCcw,
  Mail,
  Package,
  Calendar,
  Gift,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { NavTab } from '../../types';

interface PageProps {
  onNavigate: (tab: NavTab) => void;
}

export const RefundPolicyPage: React.FC<PageProps> = ({ onNavigate }) => {
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
          <span className="text-black font-bold">Return and Refund Policy</span>
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

      {/* Main Document Card */}
      <div className="bg-white border border-[#E3E3E3] rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
        {/* Document Header */}
        <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs shrink-0 mt-0.5">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                Return and Refund Policy
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
                )
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto text-[11px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200">
            30-Day Window
          </span>
        </div>

        {/* Preamble from Policy */}
        <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-800 space-y-2 leading-relaxed">
          <p className="font-semibold text-neutral-900">
            Thank you for shopping at Dragon QR code.
          </p>
          <p>
            If, for any reason, You are not completely satisfied with a purchase We invite You to
            review our policy on refunds and returns. This Return and Refund Policy has been created
            with the help of the{' '}
            <a
              href="https://www.termsfeed.com/return-refund-policy-generator/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-medium underline hover:text-neutral-600"
            >
              Return and Refund Policy Generator
            </a>
            .
          </p>
          <p className="text-xs text-neutral-600">
            The following terms are applicable for any products that You purchased with Us.
          </p>
        </div>

        {/* Key Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">30-Day Cancellation</span>
              <span className="text-neutral-500 text-[11px]">Cancel order without giving any reason</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">14-Day Reimbursement</span>
              <span className="text-neutral-500 text-[11px]">Direct refund via original payment method</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Package className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900 block">Original Packaging</span>
              <span className="text-neutral-500 text-[11px]">Items must be in returned original condition</span>
            </div>
          </div>
        </div>

        {/* Document Body */}
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
                For the purposes of this Return and Refund Policy:
              </p>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Company</strong> (referred to as either
                    &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in
                    this Policy) refers to{' '}
                    <span className="font-semibold text-neutral-900">Dragon QR code</span>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Goods</strong> refer to the items offered
                    for sale on the Service.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0 mt-1.5"></span>
                  <span>
                    <strong className="text-neutral-900">Orders</strong> mean a request by You to
                    purchase Goods from Us.
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

          {/* Section: Your Order Cancellation Rights */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">02.</span>
              Your Order Cancellation Rights
            </h2>
            <p>
              You are entitled to cancel Your Order within 30 days without giving any reason for
              doing so.
            </p>
            <p>
              The deadline for cancelling an Order is 30 days from the date on which You received
              the Goods or on which a third party you have appointed, who is not the carrier, takes
              possession of the product delivered.
            </p>
            <p>
              In order to exercise Your right of cancellation, You must inform Us of your decision
              by means of a clear statement. You can inform Us of your decision by:
            </p>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="text-neutral-500 font-medium block">By email:</span>
                <a
                  href="mailto:dragon3support@gmail.com"
                  className="font-mono font-bold text-neutral-900 hover:text-black underline"
                >
                  dragon3support@gmail.com
                </a>
              </div>
            </div>
            <p>
              We will reimburse You no later than 14 days from the day on which We receive the
              returned Goods. We will use the same means of payment as You used for the Order, and
              You will not incur any fees for such reimbursement.
            </p>
          </section>

          {/* Section: Conditions for Returns */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">03.</span>
              Conditions for Returns
            </h2>
            <p>In order for the Goods to be eligible for a return, please make sure that:</p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The Goods were purchased in the last 30 days</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>The Goods are in the original packaging</span>
              </li>
            </ul>

            <div className="pt-2">
              <p className="font-bold text-neutral-900 text-xs uppercase tracking-wider mb-2">
                The following Goods cannot be returned:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                <li>
                  The supply of Goods made to Your specifications or clearly personalized.
                </li>
                <li>
                  The supply of Goods which according to their nature are not suitable to be
                  returned, deteriorate rapidly or where the date of expiry is over.
                </li>
                <li>
                  The supply of Goods which are not suitable for return due to health protection or
                  hygiene reasons and were unsealed after delivery.
                </li>
                <li>
                  The supply of Goods which are, after delivery, according to their nature,
                  inseparably mixed with other items.
                </li>
              </ul>
            </div>

            <p className="text-xs text-neutral-600">
              We may refuse returns that do not meet the conditions above, to the extent permitted
              by applicable law.
            </p>
            <p className="text-xs text-neutral-600">
              Only regular priced Goods may be refunded. Unfortunately, Goods on sale cannot be
              refunded. This exclusion may not apply to You if it is not permitted by applicable law.
            </p>
          </section>

          {/* Section: Returning Goods */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">04.</span>
              Returning Goods
            </h2>
            <p>You are responsible for the cost and risk of returning the Goods to Us.</p>
            <p>You should send the Goods at the following address:</p>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="font-mono text-xs text-neutral-800 space-y-0.5">
                <div className="font-bold text-neutral-900">Return Address:</div>
                <div>1 Infinite Loop</div>
                <div>Cupertino, CA 95014</div>
                <div>India</div>
              </div>
            </div>

            <p className="text-xs text-neutral-600">
              We cannot be held responsible for Goods damaged or lost in return shipment. Therefore,
              We recommend an insured and trackable mail service. We are unable to issue a refund
              without actual receipt of the Goods or proof of received return delivery.
            </p>
          </section>

          {/* Section: Gifts */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-neutral-900 border-b border-neutral-100 pb-2 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">05.</span>
              Gifts
            </h2>
            <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                <Gift className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-1.5 text-neutral-700">
                <p>
                  If the Goods were marked as a gift when purchased and then shipped directly to you,
                  You&apos;ll receive a gift credit for the value of your return. Once the returned
                  product is received, a gift certificate will be mailed to You.
                </p>
                <p>
                  If the Goods weren&apos;t marked as a gift when purchased, or the gift giver had
                  the Order shipped to themselves to give it to You later, We will send the refund to
                  the gift giver.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Contact Us */}
          <section className="space-y-3 pt-4 border-t border-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <span className="font-mono text-neutral-400 text-xs">06.</span>
              Contact Us
            </h2>
            <p>
              If you have any questions about our Returns and Refunds Policy, please contact us:
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
              onClick={() => onNavigate('disclaimer')}
              className="p-2.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-semibold text-neutral-800 hover:bg-neutral-50 transition-colors text-center"
            >
              Disclaimer &rarr;
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
