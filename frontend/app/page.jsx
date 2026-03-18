import SiteHeader from '../components/SiteHeader';
import BannerBlock from '../components/BannerBlock';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';
import { getHomeData } from '../lib/data';
import Link from 'next/link';

export default async function HomePage() {
  const { featured, latest, banner, usedDemoData } = await getHomeData();

  return (
    <main className="page">
      <SiteHeader />

      <section className="hero">
        <div className="badge">TON Listings</div>
        <h1 style={{ marginTop: 12 }}>SpyTON — Discover TON listings</h1>
        <p className="subtext">
          Submit TON tokens, approve listings, feature strong projects, and place one clean ad banner on the homepage.
        </p>
        <div className="actions">
          <Link href="/submit" className="button primary">Submit Token</Link>
          <Link href="/admin" className="button">Admin Panel</Link>
        </div>
        {usedDemoData ? (
          <p className="subtext" style={{ marginTop: 12 }}>
            Demo mode is active. Add Supabase keys to switch to live storage.
          </p>
        ) : null}
      </section>

      <BannerBlock banner={banner} />

      <section className="section">
        <h2 className="section-title">Featured Listings</h2>
        <div className="grid cards">
          {featured.length ? featured.map((item) => <ListingCard key={item.id} item={item} />) : <div className="card muted">No featured listings yet.</div>}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">New Listings</h2>
        <div className="grid cards">
          {latest.length ? latest.map((item) => <ListingCard key={item.id} item={item} />) : <div className="card muted">No approved listings yet.</div>}
        </div>
      </section>

      <Footer />
    </main>
  );
}
