// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//         },
//     },
// });

// import react from '@vitejs/plugin-react';
// import path from 'path';
// import { defineConfig } from 'vite';

// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//         },
//     },
//     server: {
//         proxy: {
//             // Proxy används endast lokalt
//             '/api': {
//                 target: 'http://localhost:3000', // Backend server
//                 changeOrigin: true,
//                 secure: false,
//             },
//         },
//     },
//     build: {
//         outDir: 'dist', // Byggutmatning
//     },
// });

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        proxy: {
            // Proxy används endast lokalt
            '/api': {
                target: 'http://localhost:3000', // Backend server
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist', // Produktionens output-katalog
        rollupOptions: {
            output: {
                // Optimera namn för produktion
                entryFileNames: '[name].[hash].js',
                chunkFileNames: '[name].[hash].js',
                assetFileNames: '[name].[hash].[ext]',
            },
        },
    },
});
