import {chain} from '@/proxies/chain'
import {withAuthProxy} from '@/proxies/withAuth'
import {withIntlProxy} from '@/proxies/withIntl'

export default chain([withAuthProxy, withIntlProxy])

export const config = {
	matcher: '/((?!api|_next|_vercel|.*\\..*).*)'
}
