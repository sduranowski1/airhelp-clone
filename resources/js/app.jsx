import './bootstrap';
import '../css/app.css';
import '../css/sb-admin-2.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {AuthProvider} from "@/Contexts/AuthContext.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import './i18n'; // Import the i18n setup

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // root.render(<App {...props} />);
        // Wrap your main component with AuthProvider
        root.render(
            <AuthProvider>
                <App {...props} />
            </AuthProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
