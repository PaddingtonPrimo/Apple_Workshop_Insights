import react from '@vitejs/plugin-react';

export default {
  base: '/Apple_Workshop_Insights/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
}
