# MDK Sprint – User Dashboard (React + Vite + TypeScript)

This repo was prepared from a Figma export. It contains a Vite + React + TypeScript app with Tailwind v4 CSS already embedded in `src/index.css`.

## Quick start

```bash
# install
npm i

# dev
npm run dev

# build
npm run build

# preview
npm run preview
```

## Notes

- Some imports in the Figma export contained version suffixes like `from "@radix-ui/react-slot@1.1.2"`. These were normalized to `from "@radix-ui/react-slot"` across the codebase.
- `tsconfig.json` and `tsconfig.node.json` were added to support Vite + TS.
- If you later upgrade to Tailwind toolchain, you can remove the precompiled CSS and add `tailwindcss`, `postcss` and `autoprefixer` as devDependencies.
