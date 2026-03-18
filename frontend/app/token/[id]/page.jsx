import Link from 'next/link';
import SiteHeader from '../../../components/SiteHeader';
import Footer from '../../../components/Footer';
import { getListingById } from '../../../lib/data';

export default async function TokenPage({ params }) {
  const resolved = await params;
  const item = await getListingById(resolved.id);

  return (
    <main className="page">
      <SiteHeader />
      <section className="panel">
        {!item ? (
          <>
            <h1>Listing not found</h1>
            <div className="actions"><Link href="/" className="button">Back Home</Link></div>
          </>
        ) : (
          <>
            <div className="token-head">
              {item.logo_url ? (
                <img className="logo" src={item.logo_url} alt={item.name} />
              ) : (
                <div className="logo" style={{ display: 'grid', placeItems: 'center', fontWeight: 700 }}>{item.name.slice(0,2).toUpperCase()}</div>
              )}
              <div>
                <h1 style={{ margin: 0 }}>{item.name} ({item.symbol})</h1>
                <div className="muted">Listed on {new Date(item.created_at).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="actions" style={{ marginBottom: 14 }}>
              {item.featured ? <span className="badge featured">Featured</span> : null}
              <span className="badge">TON Listing</span>
            </div>

            <div className="stack">
              <div className="card"><strong>Contract Address</strong><div className="subtext" style={{ marginTop: 8 }}>{item.contract_address}</div></div>
              <div className="card"><strong>Description</strong><div className="subtext" style={{ marginTop: 8 }}>{item.description || 'No description added.'}</div></div>
            </div>

            <div className="actions">
              {item.telegram ? <a className="button primary" href={item.telegram} target="_blank">Open Telegram</a> : null}
              {item.website ? <a className="button" href={item.website} target="_blank">Visit Website</a> : null}
              {item.x ? <a className="button" href={item.x} target="_blank">Open X</a> : null}
            </div>
          </>
        )}
      </section>
      <Footer />
    </main>
  );
}
