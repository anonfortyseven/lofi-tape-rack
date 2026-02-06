import { Navbar } from '@/components/Navbar'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy | Drift Tapes',
  description: 'Privacy Policy for Drift Tapes - how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
      </div>

      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-zinc-500">Last updated: February 2025</p>
          </div>

          {/* Quick summary */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-amber-500 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              TL;DR
            </h2>
            <ul className="text-sm text-zinc-300 space-y-1">
              <li>• We only collect what we need to process your orders</li>
              <li>• We never sell your data to anyone</li>
              <li>• We use industry-standard security</li>
              <li>• You can delete your account and data anytime</li>
            </ul>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <div className="text-zinc-400 space-y-4 text-sm leading-relaxed">
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">Account Information</h3>
                  <p>
                    When you create an account, we collect your email address and any profile information you choose to provide. If you sign up with Google, we receive your email and name from Google.
                  </p>
                </div>
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">Purchase Information</h3>
                  <p>
                    When you make a purchase, we collect the information necessary to process your payment and deliver your purchase. This includes your email address for sending download links. Payment processing is handled by Stripe—we never see or store your full credit card details.
                  </p>
                </div>
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">Usage Information</h3>
                  <p>
                    We collect basic analytics to understand how people use our site (pages visited, time spent, etc.). This helps us improve the service. We use privacy-respecting analytics that don&apos;t track individual users across the web.
                  </p>
                </div>
                <div>
                  <h3 className="text-zinc-300 font-medium mb-2">Technical Information</h3>
                  <p>
                    Like most websites, our servers automatically collect information like your IP address, browser type, and device information. This is used for security and to ensure the site works properly.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Process your purchases and send download links</li>
                  <li>Maintain your account and purchase history</li>
                  <li>Send you important updates about your purchases</li>
                  <li>Respond to your support requests</li>
                  <li>Improve our website and service</li>
                  <li>Detect and prevent fraud</li>
                </ul>
                <p>
                  We will only send you marketing emails if you explicitly opt in. You can unsubscribe at any time.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  <strong className="text-zinc-300">We do not sell your personal information.</strong> Period.
                </p>
                <p>We only share information with:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-zinc-300">Payment Processors:</strong> Stripe processes payments on our behalf. They have their own privacy policy.</li>
                  <li><strong className="text-zinc-300">Infrastructure Providers:</strong> We use services like Supabase and Vercel to host our site. They process data on our behalf under strict data processing agreements.</li>
                  <li><strong className="text-zinc-300">Legal Requirements:</strong> We may disclose information if required by law or to protect our rights.</li>
                </ul>
                <p>
                  Artists can see aggregated sales data (like total sales and revenue) but not individual customer information.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">4. Data Security</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  We take security seriously and implement industry-standard measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>All data is encrypted in transit (HTTPS)</li>
                  <li>Passwords are hashed using industry-standard algorithms</li>
                  <li>We use secure authentication through Supabase</li>
                  <li>Payment data is handled by PCI-compliant processors</li>
                  <li>We regularly review and update our security practices</li>
                </ul>
                <p>
                  No system is 100% secure. If you discover a security vulnerability, please report it to security@drifttapes.com.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">5. Your Rights</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><strong className="text-zinc-300">Access:</strong> Request a copy of the data we have about you</li>
                  <li><strong className="text-zinc-300">Correction:</strong> Update inaccurate information</li>
                  <li><strong className="text-zinc-300">Deletion:</strong> Request deletion of your account and data</li>
                  <li><strong className="text-zinc-300">Portability:</strong> Export your data in a machine-readable format</li>
                  <li><strong className="text-zinc-300">Objection:</strong> Object to certain types of processing</li>
                </ul>
                <p>
                  To exercise any of these rights, contact us at privacy@drifttapes.com. We&apos;ll respond within 30 days.
                </p>
                <p>
                  Note: Deleting your account doesn&apos;t affect your right to access music you&apos;ve already purchased and downloaded.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">6. Cookies</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  We use minimal, essential cookies to:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Keep you logged in to your account</li>
                  <li>Remember your cart contents</li>
                  <li>Prevent fraud and abuse</li>
                </ul>
                <p>
                  We don&apos;t use tracking cookies from advertising networks. We don&apos;t participate in cross-site tracking.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">7. Children&apos;s Privacy</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  Our Service is not intended for anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">8. International Transfers</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  Our services are hosted in the United States. If you&apos;re accessing from outside the US, your information will be transferred to, stored, and processed in the US. By using our service, you consent to this transfer.
                </p>
                <p>
                  We ensure that any international transfers comply with applicable data protection laws and that your data receives the same level of protection.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  We may update this Privacy Policy from time to time. We&apos;ll notify you of any significant changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                </p>
                <p>
                  We encourage you to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.
                </p>
              </div>
            </section>

            <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">10. Contact Us</h2>
              <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="list-none space-y-1">
                  <li>Privacy inquiries: <a href="mailto:privacy@drifttapes.com" className="text-amber-500 hover:text-amber-400 transition-colors">privacy@drifttapes.com</a></li>
                  <li>General support: <a href="mailto:support@drifttapes.com" className="text-amber-500 hover:text-amber-400 transition-colors">support@drifttapes.com</a></li>
                </ul>
              </div>
            </section>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <Link href="/" className="text-zinc-500 hover:text-white transition-colors inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
