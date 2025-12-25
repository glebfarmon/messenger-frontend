import {defineConfig, devices} from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './__tests__/e2e',
	outputDir: '__tests__/e2e/test-results',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['list'], ['html', {outputFolder: '__tests__/e2e/playwright-report', open: 'never'}]],
	use: {
		baseURL: process.env.NEXT_PUBLIC_URL,
		trace: 'on-first-retry'
	},

	projects: [
		{
			name: 'chromium',
			use: {...devices['Desktop Chrome']}
		},

		{
			name: 'firefox',
			use: {...devices['Desktop Firefox']}
		},

		{
			name: 'webkit',
			use: {...devices['Desktop Safari']}
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: {...devices['Pixel 5']}
		},
		{
			name: 'Mobile Safari',
			use: {...devices['iPhone 12']}
		}
	],

	webServer: {
		command: 'pnpm dev',
		url: process.env.NEXT_PUBLIC_URL,
		reuseExistingServer: !process.env.CI
	}
})
