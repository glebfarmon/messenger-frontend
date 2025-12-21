import type {Metadata} from 'next'
import {hasLocale, NextIntlClientProvider} from 'next-intl'
import {setRequestLocale} from 'next-intl/server'
import {Open_Sans} from 'next/font/google'
import {notFound} from 'next/navigation'
import {QueryProvider, ThemeProvider} from '@/components/providers'
import {Toaster} from '@/components/ui/sonner'
import {config} from '@/config'
import {DESCRIPTION, KEYWORDS} from '@/constants'
import './globals.css'
import {routing} from '@/i18n/routing'

type Props = {
	children: React.ReactNode
	params: Promise<{locale: string}>
}

const openSans = Open_Sans({
	variable: '--font-open-sans',
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

export function generateStaticParams() {
	return routing.locales.map(locale => ({locale}))
}

export default async function RootLayout({children, params}: Props) {
	const {locale} = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}
	setRequestLocale(locale)

	return (
		<html
			lang={locale}
			suppressHydrationWarning>
			<body className={`${openSans.variable} antialiased`}>
				<NextIntlClientProvider messages={null}>
					<ThemeProvider
						attribute={'class'}
						defaultTheme={'system'}
						enableSystem>
						<QueryProvider>
							{children}
							<Toaster />
						</QueryProvider>
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
