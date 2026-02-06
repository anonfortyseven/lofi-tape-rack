import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create a free Drift Tapes account. Get access to exclusive drops, early releases, and build your personal lofi music library.',
  alternates: {
    canonical: 'https://drifttapes.com/signup',
  },
  openGraph: {
    title: 'Create Account | Drift Tapes',
    description: 'Join thousands of lofi lovers. Get exclusive drops and early access.',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
