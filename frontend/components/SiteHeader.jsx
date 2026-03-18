import Link from 'next/link';

export default function SiteHeader() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-badge" />
        <div>
          <div>SpyTON Listings</div>
          <div className="muted" style={{ fontSize: 13 }}>TON-only listing hub</div>
        </div>
      </div>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/submit">Submit Token</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
