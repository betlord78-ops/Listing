'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteHeader from '../../components/SiteHeader';
import Footer from '../../components/Footer';
import { submitListing } from '../../lib/data';

const initialState = {
  name: '',
  symbol: '',
  contract_address: '',
  telegram: '',
  website: '',
  x: '',
  description: '',
  logo_url: ''
};

export default function SubmitPage() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    if (!form.name || !form.symbol || !form.contract_address) {
      setStatus({ type: 'error', text: 'Token name, symbol, and contract address are required.' });
      setLoading(false);
      return;
    }

    if (!form.telegram && !form.website && !form.x) {
      setStatus({ type: 'error', text: 'Add at least one social or website link.' });
      setLoading(false);
      return;
    }

    const result = await submitListing(form);
    if (result.success) {
      setStatus({ type: 'ok', text: result.demo ? 'Submitted in demo mode. Add Supabase keys for live saving.' : 'Listing submitted successfully. It is now pending review.' });
      setForm(initialState);
    } else {
      setStatus({ type: 'error', text: result.error || 'Failed to submit listing.' });
    }

    setLoading(false);
  }

  return (
    <main className="page">
      <SiteHeader />

      <section className="panel">
        <div className="badge">Submit Listing</div>
        <h1 style={{ marginTop: 12 }}>Submit your TON token</h1>
        <p className="subtext">Keep it simple. Submit the core links and description, then approve it later from the admin page.</p>

        <form className="stack" onSubmit={onSubmit} style={{ marginTop: 18 }}>
          <div className="row">
            <div>
              <label className="label">Token Name</label>
              <input className="input" value={form.name} onChange={(e) => onChange('name', e.target.value)} />
            </div>
            <div>
              <label className="label">Symbol</label>
              <input className="input" value={form.symbol} onChange={(e) => onChange('symbol', e.target.value)} />
            </div>
          </div>

          <div>
            <label className="label">Contract Address</label>
            <input className="input" value={form.contract_address} onChange={(e) => onChange('contract_address', e.target.value)} />
          </div>

          <div className="row">
            <div>
              <label className="label">Telegram Link</label>
              <input className="input" value={form.telegram} onChange={(e) => onChange('telegram', e.target.value)} />
            </div>
            <div>
              <label className="label">Website Link</label>
              <input className="input" value={form.website} onChange={(e) => onChange('website', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div>
              <label className="label">X Link</label>
              <input className="input" value={form.x} onChange={(e) => onChange('x', e.target.value)} />
            </div>
            <div>
              <label className="label">Logo URL</label>
              <input className="input" value={form.logo_url} onChange={(e) => onChange('logo_url', e.target.value)} placeholder="Optional for now" />
            </div>
          </div>

          <div>
            <label className="label">Short Description</label>
            <textarea value={form.description} onChange={(e) => onChange('description', e.target.value)} />
          </div>

          {status.text ? <div className={`message ${status.type === 'error' ? 'error' : ''}`}>{status.text}</div> : null}

          <div className="actions">
            <button className="primary" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Listing'}</button>
            <Link href="/" className="button">Back Home</Link>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
