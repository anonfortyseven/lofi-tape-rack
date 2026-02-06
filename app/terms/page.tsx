import { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Drift Tapes. Read our terms for using the lofi music store, purchasing music, and licensing.',
  alternates: {
    canonical: 'https://drifttapes.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-zinc-500">Last updated: February 2025</p>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-zinc max-w-none">
            <div className="space-y-8">
              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    By accessing or using Drift Tapes (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
                  </p>
                  <p>
                    These terms apply to all visitors, users, and others who access or use the Service.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">2. Purchases & Licenses</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    When you purchase music from Drift Tapes, you receive a personal, non-exclusive, non-transferable license to download, store, and play the purchased content for your own personal, non-commercial use.
                  </p>
                  <p>
                    <strong className="text-zinc-300">You may:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Download and keep the purchased music files indefinitely</li>
                    <li>Play the music on any device you own</li>
                    <li>Make personal backup copies</li>
                    <li>Use the music in personal, non-monetized content (e.g., home videos)</li>
                  </ul>
                  <p>
                    <strong className="text-zinc-300">You may not:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Resell, redistribute, or share purchased music files</li>
                    <li>Use purchased music in commercial projects without a separate license</li>
                    <li>Upload purchased music to streaming platforms or file-sharing services</li>
                    <li>Claim ownership or authorship of purchased music</li>
                  </ul>
                  <p>
                    For commercial licensing inquiries, please contact us at licensing@drifttapes.com.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">3. Accounts</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <p>
                    You are responsible for safeguarding the password you use to access the Service and for any activities or actions under your password.
                  </p>
                  <p>
                    You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">4. Refund Policy</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    We offer a 30-day money-back guarantee on all purchases. If you&apos;re not satisfied with your purchase for any reason, contact us within 30 days of your purchase date for a full refund.
                  </p>
                  <p>
                    To request a refund, email support@drifttapes.com with your order number and the reason for your request.
                  </p>
                  <p>
                    Please note that requesting a refund does not require you to delete the downloaded files, but continued use of refunded content would be a violation of these terms.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">5. Intellectual Property</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    The Service and its original content (excluding content provided by users or artists), features, and functionality are and will remain the exclusive property of Drift Tapes and its licensors.
                  </p>
                  <p>
                    All music and related artwork available on Drift Tapes remains the intellectual property of the respective artists. Your purchase grants you a license to use the content as described above, not ownership of the underlying intellectual property.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">6. Prohibited Uses</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    You may not use the Service:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To interfere with or circumvent the security features of the Service</li>
                  </ul>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    In no event shall Drift Tapes, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Your access to or use of or inability to access or use the Service</li>
                    <li>Any conduct or content of any third party on the Service</li>
                    <li>Any content obtained from the Service</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  </ul>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">8. Changes to Terms</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </section>

              <section className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">9. Contact Us</h2>
                <div className="text-zinc-400 space-y-3 text-sm leading-relaxed">
                  <p>
                    If you have any questions about these Terms, please contact us:
                  </p>
                  <ul className="list-none space-y-1">
                    <li>Email: <a href="mailto:legal@drifttapes.com" className="text-amber-500 hover:text-amber-400 transition-colors">legal@drifttapes.com</a></li>
                    <li>Support: <a href="mailto:support@drifttapes.com" className="text-amber-500 hover:text-amber-400 transition-colors">support@drifttapes.com</a></li>
                  </ul>
                </div>
              </section>
            </div>
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
