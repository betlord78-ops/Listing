import './globals.css';

export const metadata = {
  title: 'SpyTON Listings',
  description: 'TON-only token listings for SpyTON'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
