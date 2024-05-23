import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react-swc";
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig({
    plugins: [
        // @ts-ignore
        react(),
        // @ts-ignore
        svgr({
                svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
                include: '**/*.svg',
        }),
    ],
    test: {
        // 👋 add the line below to add jsdom to vite
        environment: 'jsdom',
    }
})
