import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Keep heavier visual libraries in separate cacheable chunks. The Three.js scene is
// loaded on demand by Hero.jsx, so this prevents 3D dependencies from inflating startup JS.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('/node_modules/')) return undefined

          if (id.includes('/node_modules/@react-three/drei/')) return 'vendor-r3f-drei'
          if (id.includes('/node_modules/@react-three/fiber/')) return 'vendor-r3f-fiber'
          if (id.includes('/node_modules/three/')) return 'vendor-three'
          if (id.includes('/node_modules/gsap/')) return 'vendor-gsap'
          if (id.includes('/node_modules/framer-motion/')) return 'vendor-motion'

          return undefined
        },
      },
    },
  },
})
