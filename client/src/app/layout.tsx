import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';
import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Providers from './Providers';

export const metadata = {
    title: 'Job Applications Manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
            </head>
            <body>
                <Providers>
                    <Notifications />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
