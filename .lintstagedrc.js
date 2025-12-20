const buildEslintCommand = filenames => `eslint --fix ${filenames.join(' ')}`

const config = {
	'*.{js,jsx,ts,tsx}': [buildEslintCommand]
}

export default config
