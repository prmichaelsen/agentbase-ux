import esbuild from 'esbuild'
import { execSync } from 'child_process'
import { cpSync } from 'fs'

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'neutral',
  format: 'esm',
  sourcemap: true,
  outfile: 'dist/index.js',
  external: ['react', 'react-dom', 'lucide-react'],
  jsx: 'automatic',
})

// Copy CSS tokens
cpSync('src/lib/tokens.css', 'dist/tokens.css')

// Generate TypeScript declarations
console.log('Generating TypeScript declarations...')
execSync('tsc --emitDeclarationOnly --declaration --declarationMap', {
  stdio: 'inherit'
})

console.log('Build complete!')
