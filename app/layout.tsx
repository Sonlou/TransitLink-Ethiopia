import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TransitLink Ethiopia - Smart Informal Transport Discovery',
  description: 'Smart informal transportation discovery platform for African cities like Addis Ababa. Instantly find nearby minibuses, seat details, and routes.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
