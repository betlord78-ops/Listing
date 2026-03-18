'use client';

import { useEffect, useMemo, useState } from 'react';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import { getAdminListings, saveBanner, updateListing } from '../../lib/data';

export default function AdminPage() {
  const [entered, setEntered] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);
  const [banner, setBanner] = useState({ title: '', image_url: '', link_url: '' });

  useEffect(() => {
    const ok = typeof window !== 'undefined' && window.localStorage.getItem('spyton_admin_ok') === '1';
    setEntered(Boolean(ok));
  }, []);

  useEffect(() => {
    if (!entered) return;
    getAdminListings().then(setItems);
  }, [entered]);

  const grouped = useMemo(() => ({
    pending: items.filter((x) => x.status === 'pending'),
    approved: items.filter((x) => x.status === 'approved'),
    rejected: items.filter((x) => x.status === 'rejected')
  }), [items]);

  function login(e) {
    e.preventDefault();
    const expected = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'changeme';
    if (password === expected) {
      window.localStorage.setItem('spyton_admin_ok', '1');
      setEntered(true);
      setMessage('Admin access unlocked.');
    } else {
      setMessage('Wrong password. Set NEXT_PUBLIC_ADMIN_PASSWORD for client-side use, or replace with real auth later.');
    }
  }

  async function act(id, updates) {
    const res = await updateListing(id, updates);
    if (res.success) {
      const next = await getAdminListings();
      setItems(next);
      setMessage('Listing updated.');
    } else {
      setMessage(res.error || 'Failed to update listing.');
    }
  }

  async function saveBannerNow(e) {
    e.preventDefault();
    const res = await saveBanner({ ...banner, active: true });
    setMessage(res.success ? 'Banner saved.' : res.error || 'Failed to save banner.');
    if (res.success) setBanner({ title: '', image_url: '', link_url: '' });
  }

  return (
    <main className="page">
      <SiteHeader />
      {!entered ? (
        <section className="panel" style={{ maxWidth: 520, margin: '0 auto' }}>
          <div className="badge">Admin Access</div>
          <h1 style={{ marginTop: 12 }}>Enter admin password</h1>
          <form className="stack" onSubmit={login}>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {message ? <div className="message error">{message}</div> : null}
            <button className="primary" type="submit">Unlock Admin</button>
          </form>
        </section>
      ) : (
        <div className="stack">
          {message ? <div className="message">{message}</div> : null}

          <section className="panel">
            <div className="badge">Pending Listings</div>
            <h2 className="section-title" style={{ marginTop: 12 }}>Review submissions</h2>
            <table className="table">
              <thead><tr><th>Token</th><th>Contract</th><th>Actions</th></tr></thead>
              <tbody>
                {grouped.pending.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name} ({item.symbol})</td>
                    <td>{item.contract_address}</td>
                    <td>
                      <div className="admin-actions">
                        <button onClick={() => act(item.id, { status: 'approved' })}>Approve</button>
                        <button onClick={() => act(item.id, { status: 'rejected' })}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!grouped.pending.length ? <tr><td colSpan="3" className="muted">No pending listings.</td></tr> : null}
              </tbody>
            </table>
          </section>

          <section className="panel">
            <div className="badge">Approved Listings</div>
            <h2 className="section-title" style={{ marginTop: 12 }}>Manage approved tokens</h2>
            <table className="table">
              <thead><tr><th>Token</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {grouped.approved.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name} ({item.symbol})</td>
                    <td>{item.featured ? 'Featured' : 'Approved'}</td>
                    <td>
                      <div className="admin-actions">
                        <button onClick={() => act(item.id, { featured: !item.featured })}>{item.featured ? 'Remove Feature' : 'Feature'}</button>
                        <button onClick={() => act(item.id, { status: 'rejected', featured: false })}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!grouped.approved.length ? <tr><td colSpan="3" className="muted">No approved listings yet.</td></tr> : null}
              </tbody>
            </table>
          </section>

          <section className="panel">
            <div className="badge">Ad Banner</div>
            <h2 className="section-title" style={{ marginTop: 12 }}>Add homepage banner</h2>
            <form className="stack" onSubmit={saveBannerNow}>
              <input className="input" placeholder="Banner title" value={banner.title} onChange={(e) => setBanner((p) => ({ ...p, title: e.target.value }))} />
              <input className="input" placeholder="Banner image URL" value={banner.image_url} onChange={(e) => setBanner((p) => ({ ...p, image_url: e.target.value }))} />
              <input className="input" placeholder="Banner link URL" value={banner.link_url} onChange={(e) => setBanner((p) => ({ ...p, link_url: e.target.value }))} />
              <button className="primary" type="submit">Save Banner</button>
            </form>
          </section>
        </div>
      )}
      <Footer />
    </main>
  );
}
