# AGENTS.md - CanSat Frontend

This document provides guidelines for AI agents working on the CanSat Frontend project.

## Project Overview

- **Type**: React 19 + TypeScript + Vite web application
- **Purpose**: Dashboard for CanSat telemetry data visualization
- **Key Dependencies**: React 19, Tailwind CSS v4, TypeScript ~5.9, Vite 8

---

## Build & Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc -b` then build for production |
| `npm run lint` | Run ESLint on all TypeScript/TSX files |
| `npm run preview` | Preview production build locally |

### Running Tests

Project has **no test suite configured**. To add tests:

```bash
# Install Vitest
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Add to package.json:
"test": "vitest",
"test:run": "vitest run"
```

**Running a single test file:**
```bash
npm test run src/components/MyComponent.test.tsx
npm test run -- -t "test name pattern"
```

### Type Checking
```bash
npx tsc -b        # Full type check
npx tsc -b --watch  # Watch mode
```

---

## Code Style Guidelines

### TypeScript

- Strict mode enabled (`strict: true`)
- No unused locals/parameters allowed
- Module resolution: Bundler mode
- JSX: react-jsx
- Target: ES2023

### Imports

```typescript
// Order: React → external → internal → types
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './features/Sidebar'
import type { Launch } from './services/api'
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `Dashboard.tsx` |
| Hooks | camelCase with `use` | `useLaunchData` |
| Functions | camelCase | `fetchLaunchData()` |
| Interfaces | PascalCase | `LaunchProps` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |

### Component Structure

```typescript
interface Props {
  prop1: string
  prop2?: number
  onAction: () => void
}

function ComponentName({ prop1, prop2 = 0, onAction }: Props) {
  const [state, setState] = useState('')
  
  const handleClick = () => onAction()
  
  return <div className="...">{/* JSX */}</div>
}

export default ComponentName
```

### Type Definitions

- Always define explicit types for props and parameters
- Use interfaces for object shapes, types for unions
- Export interfaces reused across files

```typescript
interface Launch {
  id: number
  name: string
  created_at: string
  data_count: number
}
```

### Error Handling

```typescript
async function fetchData() {
  try {
    const response = await fetch(API_BASE_URL)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch data:', error)
    throw error
  }
}
```

### React Patterns

- Functional components with hooks only
- Extract reusable logic into custom hooks (prefix with `use`)
- Use `key` prop in lists (stable identifiers, not index)
- Memoize expensive computations with `useMemo`/`useCallback`

### Tailwind CSS

- Use v4 utility classes
- Semantic color names (`text-green-500` for live status)
- Extract repeated class combinations into components

---

## Project Structure

```
src/
├── App.tsx              # Root component
├── main.tsx             # Entry point
├── index.css            # Global styles
├── features/            # Feature components
│   ├── Dashboard.tsx
│   └── Sidebar.tsx
├── services/            # API services
│   └── api.ts
└── components/          # Reusable UI (create as needed)
```

---

## Linting Rules

ESLint includes:
- `@eslint/js` - Recommended JS rules
- `typescript-eslint` - TypeScript rules
- `eslint-plugin-react-hooks` - React hooks rules
- `eslint-plugin-react-refresh` - HMR validation

**Enforced rules:**
- No unused variables/parameters
- Strict TypeScript
- React hooks exhaustive deps

---

## Development Workflow

1. **Before committing**: Run `npm run lint` and `npm run build`
2. **Type check**: Ensure `npx tsc -b` passes
3. **Component location**: `src/features/` or `src/components/`
4. **Testing**: Add tests in `src/__tests__/` or `.test.tsx` alongside components

---

## Adding Dependencies

```bash
npm install package-name           # Production
npm install -D package-name         # Dev dependency
npm run build                      # Verify build works
```

---

## Notes

- Vite 8 project with ES modules (`"type": "module"`)
- No SSR - client-side React only
- API backend: `http://127.0.0.1:8000`
- No authentication implemented
