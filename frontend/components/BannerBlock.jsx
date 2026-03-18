export default function BannerBlock({ banner }) {
  if (!banner) return null;

  return (
    <section className="panel banner section">
      <div>
        <div className="badge">Ad Banner</div>
        <h2 className="section-title" style={{ marginTop: 10 }}>{banner.title}</h2>
        <p className="subtext">Promote your TON token or project with a simple homepage banner slot.</p>
        {banner.link_url ? <a className="button primary" href={banner.link_url} target="_blank">Open Banner Link</a> : null}
      </div>
      <div className="banner-image">
        {banner.image_url ? (
          <img src={banner.image_url} alt={banner.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ height: '100%', minHeight: 180, display: 'grid', placeItems: 'center', color: 'var(--muted)' }}>
            SpyTON Banner Slot
          </div>
        )}
      </div>
    </section>
  );
}
