import { getSupabase } from './supabase';

const demoListings = [
  {
    id: 'demo-1',
    name: 'Spy Alpha',
    symbol: 'ALPHA',
    contract_address: 'EQDemoAlphaAddress123',
    telegram: 'https://t.me/spyton',
    website: 'https://ton.org',
    x: 'https://x.com/ton_blockchain',
    description: 'A sample TON listing card for SpyTON Listings Lite.',
    logo_url: '',
    status: 'approved',
    featured: true,
    created_at: new Date().toISOString()
  },
  {
    id: 'demo-2',
    name: 'Blue Signal',
    symbol: 'BSIG',
    contract_address: 'EQDemoBlueSignal456',
    telegram: 'https://t.me/spyton',
    website: '',
    x: '',
    description: 'TON-only listing starter with a clean layout.',
    logo_url: '',
    status: 'approved',
    featured: false,
    created_at: new Date(Date.now() - 86400000).toISOString()
  }
];

const demoBanner = {
  id: 'banner-1',
  title: 'Advertise your TON token on SpyTON',
  image_url: '',
  link_url: 'https://t.me/spyton',
  active: true
};

export async function getHomeData() {
  const supabase = getSupabase();
  if (!supabase) {
    return {
      featured: demoListings.filter((x) => x.featured),
      latest: demoListings,
      banner: demoBanner,
      usedDemoData: true
    };
  }

  const [featuredRes, latestRes, bannerRes] = await Promise.all([
    supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6),
    supabase
      .from('listings')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(12),
    supabase
      .from('banners')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
  ]);

  return {
    featured: featuredRes.data || [],
    latest: latestRes.data || [],
    banner: bannerRes.data || null,
    usedDemoData: false
  };
}

export async function getListingById(id) {
  const supabase = getSupabase();
  if (!supabase) {
    return demoListings.find((x) => x.id === id) || null;
  }

  const { data } = await supabase.from('listings').select('*').eq('id', id).maybeSingle();
  return data || null;
}

export async function submitListing(payload) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, demo: true };
  }

  const { error } = await supabase.from('listings').insert({
    ...payload,
    status: 'pending',
    featured: false
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getAdminListings() {
  const supabase = getSupabase();
  if (!supabase) {
    return demoListings;
  }

  const { data } = await supabase.from('listings').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function saveBanner(payload) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, demo: true };
  }

  const { error } = await supabase.from('banners').insert(payload);
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateListing(id, updates) {
  const supabase = getSupabase();
  if (!supabase) {
    return { success: true, demo: true };
  }

  const { error } = await supabase.from('listings').update(updates).eq('id', id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
