import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your Drift Tapes account to access your music library, downloads, and personalized recommendations.',
  alternates: {
    canonical: 'https://drifttapes.com/login',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
