import './globals.css';

export const metadata = {
  title: 'Red Hat Certification Tracker',
  description: 'Track your Red Hat certification journey',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
