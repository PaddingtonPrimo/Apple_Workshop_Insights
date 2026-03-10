import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  base: '/Apple_Workshop_Insights/',
  build: {
    outDir: 'dist'
  }
}
