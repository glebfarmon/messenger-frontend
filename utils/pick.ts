type GetFieldType<T, P extends string> = P extends `${infer Left}.${infer Right}`
	? Left extends keyof T
		? GetFieldType<T[Left], Right>
		: undefined
	: P extends keyof T
		? T[P]
		: undefined

type NestedPath<P extends string, V> = P extends `${infer Left}.${infer Right}`
	? {[K in Left]: NestedPath<Right, V>}
	: {[K in P]: V}

function getDeepValue<T extends Record<string, unknown>, P extends string>(
	obj: T,
	path: P
): GetFieldType<T, P> | undefined {
	const parts = path.split('.')
	let current: unknown = obj

	for (const key of parts) {
		if (current !== null && typeof current === 'object' && key in current) {
			current = (current as Record<string, unknown>)[key]
		} else {
			return undefined
		}
	}

	return current as GetFieldType<T, P>
}

export function pick<T extends Record<string, unknown>, P extends string>(
	obj: T,
	path: P
): NestedPath<P, GetFieldType<T, P>> | Record<string, never> {
	const value = getDeepValue(obj, path)

	if (value === undefined) {
		return {}
	}

	const parts = path.split('.')

	const result = parts.reverse().reduce<unknown>((acc, key, index) => {
		return {[key]: index === 0 ? value : acc}
	}, value)

	return result as NestedPath<P, GetFieldType<T, P>>
}
