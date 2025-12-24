export type NextProps<T = object> = {
	params: Promise<{locale: string} & T>
}

export type Children = Readonly<{
	children: React.ReactNode
}>
