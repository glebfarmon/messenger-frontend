import {setRequestLocale} from 'next-intl/server'
import {use} from 'react'
import type {NextProps} from '@/types'

const Home = ({params}: NextProps) => {
	const {locale} = use(params)
	setRequestLocale(locale)

	return <div>Home</div>
}

export default Home
