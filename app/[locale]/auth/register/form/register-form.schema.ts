import * as v from 'valibot'

export const formSchema = v.pipe(
	v.object({
		name: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.regex(/^[\p{L}\s'\-]+$/u)),
		email: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.email()),
		password: v.pipe(v.string(), v.nonEmpty(), v.minLength(8), v.maxLength(24))
	})
)

export type FormSchema = v.InferOutput<typeof formSchema>
