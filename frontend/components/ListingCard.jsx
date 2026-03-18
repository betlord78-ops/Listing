import Link from 'next/link';

function initials(name = '') {
  return name.slice(0, 2).toUpperCase() || 'ST';
}

export default function ListingCard({ item }) {
  return (
    <div className="card">
      <div className="token-head">
        {item.logo_url ? (
          <img className="logo" src={item.logo_url} alt={item.name} />
        ) : (
          <div className="logo" style={{ display: 'grid', placeItems: 'center', fontWeight: 700 }}>{initials(item.name)}</div>
        )}
        <div>
          <div style={{ fontWeight: 700 }}>{item.name} ({item.symbol})</div>
          <div className="muted" style={{ fontSize: 13 }}>{item.contract_address}</div>
        </div>
      </div>

      {item.featured ? <div className="badge featured">Featured</div> : null}

      <p className="subtext" style={{ marginTop: 10 }}>{item.description || 'No description added yet.'}</p>

      <div className="actions">
        <Link className="button primary" href={`/token/${item.id}`}>Open Details</Link>
        {item.telegram ? <a className="button" href={item.telegram} target="_blank">Telegram</a> : null}
        {item.website ? <a className="button" href={item.website} target="_blank">Website</a> : null}
      </div>
    </div>
  );
}
