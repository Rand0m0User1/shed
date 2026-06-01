// Registers @testing-library/jest-dom matchers (e.g. toBeInTheDocument) with
// Vitest's expect, and loads their TypeScript types. Referenced by
// vite.config.ts -> test.setupFiles, so every test file gets them.
import '@testing-library/jest-dom/vitest'
