import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
// import ziggy from 'ziggy-js'
import { createRequire } from 'module';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        // // Workaround
        // {
        //     name: 'load+transform-js-files-as-jsx',
        //     async transform(code, id) {
        //         if (!id.match(/src\/.*\.js$/)) {
        //             return null;
        //         }
        //
        //         // Use the exposed transform from vite, instead of directly
        //         // transforming with esbuild
        //         return transformWithEsbuild(code, id, {
        //             loader: 'jsx',
        //             jsx: 'automatic', // 👈 this is important
        //         });
        //     },
        // },
        // // End workaround

    ],

    // Workaround before renaming .js to .jsx
    optimizeDeps: {
        esbuildOptions: {
            loader: {
                '.js': 'jsx',
            },
            include: [
                // Include the specific file or directory if necessary
                'node_modules/react-signature-canvas/**',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },

    css: {
        preprocessorOptions: {
            additionalData: `@import 'resources/css/sb-admin-2.css';`
        }
    }
});

