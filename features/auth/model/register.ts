export type RegisterPayload = {
	name: string
	email: string
	password: string
}

export type RegisterResponse = {
	hashedEmail: string
}
