import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // דוגמה — שמור על ה-aliases הקיימים שלך אם היו
      'vaul@1.1.2': 'vaul',
      'sonner@0.3.': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@0.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
    },
  },
  build: {
    outDir: 'dist',
  },
})
