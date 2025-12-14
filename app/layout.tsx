import type {Metadata} from 'next'
import {Geist} from 'next/font/google'
import {config} from '@/config'
import {DESCRIPTION, KEYWORDS} from '@/constants'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const {title, url, author} = config

export const metadata: Metadata = {
	title: {
		default: title,
		template: `%s | ${title}`
	},
	description: DESCRIPTION,
	keywords: KEYWORDS,
	metadataBase: new URL(url),
	generator: 'Next.js',
	creator: author,
	publisher: author,
	robots: 'index, follow',
	manifest: '/favicons/site.webmanifest',
	openGraph: {
		title,
		description: DESCRIPTION,
		type: 'website'
	},
	twitter: {
		title,
		description: DESCRIPTION
	},
	applicationName: title,
	category: DESCRIPTION,
	appleWebApp: {
		title: title,
		statusBarStyle: 'black-translucent',
		capable: true
	},
	icons: {
		icon: [
			{
				url: '/favicons/android-chrome-240.webp',
				sizes: '240x240',
				type: 'image/webp'
			}
		],
		apple: {
			sizes: '240x240',
			url: '/favicons/android-chrome-240.webp'
		},
		shortcut: {
			url: '/favicons/android-chrome-240.webp'
		}
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} antialiased`}>{children}</body>
		</html>
	)
}
