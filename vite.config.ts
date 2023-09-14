import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { checker } from 'vite-plugin-checker';
import { svgSpritemap } from 'vite-plugin-svg-spritemap';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        '@root': path.resolve(__dirname),
      },
    },
    server: {
      port: Number(env.VITE_PORT)
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      checker({ typescript: true }),
      svgSpritemap({
        pattern: 'src/resources/icons/*.svg',
        filename: 'icons/spritemap.svg',
        prefix: 'sprite',
      }),
      svgSpritemap({
        pattern: 'src/resources/icons/raw/*.svg',
        filename: 'icons/raw-spritemap.svg',
        prefix: 'sprite',
        currentColor: false,
      }),
    ],
  };
});
