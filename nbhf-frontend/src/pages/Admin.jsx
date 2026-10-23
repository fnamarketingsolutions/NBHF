import { useEffect, useMemo, useState } from 'react';
import { adminLogin, fetchQueries, fetchStock, removeQuery, saveStock, setQueryStatus } from '../lib/api';

const TABS = [
  { id: 'general', label: 'General queries', short: 'General' },
  { id: 'agri-waste', label: 'Post-harvest agricultural waste', short: 'Agri waste' },
  { id: 'cow-dung', label: 'Cow dung · Bulk / wholesale', short: 'Cow dung' },
  { id: 'contact', label: 'Contact', short: 'Contact' },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'buy', label: 'Buy' },
  { id: 'sell', label: 'Sell' },
];

const SOURCE_LABEL = {
  general: 'General',
  faqs: 'FAQs',
  'agri-waste': 'Post-harvest agricultural waste',
  'cow-dung': 'Cow dung · Bulk / wholesale',
  industries: 'Industries served',
  contact: 'Contact',
};

const INTENT_LABEL = {
  general: 'General',
  buy: 'Buy',
  sell: 'Sell',
  report: 'Product information',
};

const inTab = (tab, query) => {
  if (tab === 'general') return query.source === 'general' || query.source === 'faqs';
  if (tab === 'agri-waste') return query.source === 'agri-waste';
  if (tab === 'cow-dung') return query.source === 'cow-dung' || query.source === 'industries';
  if (tab === 'contact') return query.source === 'contact';
  return false;
};

const inputClass = 'w-full bg-white border border-black/15 px-3 py-2 text-sm focus:outline-none focus:border-[#174A32]';

const StockEditor = ({ stock, onChange, onSave, saving, message, error }) => {
  const updateRow = (group, index, key, value) => {
    onChange({
      ...stock,
      [group]: stock[group].map((row, rowIndex) => (rowIndex === index ? { ...row, [key]: value } : row)),
    });
  };

  const addRow = (group) => {
    onChange({ ...stock, [group]: [...stock[group], { name: '', value: '', unit: '' }] });
  };

  const removeRow = (group, index) => {
    onChange({ ...stock, [group]: stock[group].filter((_, rowIndex) => rowIndex !== index) });
  };

  const groupFields = (group, title) => (
    <section className="bg-white border border-black/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <h3 className="text-lg font-bold text-[#174A32]">{title}</h3>
        <button type="button" onClick={() => addRow(group)} className="text-xs font-semibold uppercase tracking-wider text-[#174A32]">
          Add parameter
        </button>
      </div>
      <div className="hidden sm:grid sm:grid-cols-[1fr_8rem_6rem_4.5rem] gap-2 mb-2 text-[10px] uppercase tracking-wider text-[#202824]/45">
        <span>Parameter</span>
        <span>Value</span>
        <span>Unit</span>
        <span />
      </div>
      <div className="space-y-2">
        {stock[group].map((row, index) => (
          <div key={`${group}-${index}`} className="grid grid-cols-1 sm:grid-cols-[1fr_8rem_6rem_4.5rem] gap-2">
            <input value={row.name} onChange={(event) => updateRow(group, index, 'name', event.target.value)} placeholder="Parameter" className={inputClass} />
            <input value={row.value} onChange={(event) => updateRow(group, index, 'value', event.target.value)} placeholder="—" className={inputClass} />
            <input value={row.unit} onChange={(event) => updateRow(group, index, 'unit', event.target.value)} placeholder="%" className={inputClass} />
            <button type="button" onClick={() => removeRow(group, index)} className="text-xs font-semibold text-red-700">
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <form onSubmit={onSave} className="max-w-4xl space-y-4">
      <p className="text-sm text-[#202824]/70">
        These values appear on the cow dung page. Leave a value blank to show a dash. Unit is added after the number, for example 18 and %.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-[10px] uppercase tracking-wider text-[#202824]/50 mb-1">Lot</span>
          <input value={stock.lot} onChange={(event) => onChange({ ...stock, lot: event.target.value })} className={inputClass} />
        </label>
        <label className="block">
          <span className="block text-[10px] uppercase tracking-wider text-[#202824]/50 mb-1">Tested</span>
          <input value={stock.tested} onChange={(event) => onChange({ ...stock, tested: event.target.value })} placeholder="16 Oct 2026" className={inputClass} />
        </label>
      </div>
      {groupFields('primary', 'Primary')}
      {groupFields('micro', 'Secondary & micronutrients')}
      {error && <p className="text-sm text-red-700">{error}</p>}
      {message && <p className="text-sm text-[#174A32]">{message}</p>}
      <button type="submit" disabled={saving} className="bg-[#174A32] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 disabled:opacity-60">
        {saving ? 'Saving' : 'Save lot values'}
      </button>
    </form>
  );
};

const formatWhen = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

const Admin = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem('nbhf-admin-token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [tab, setTab] = useState('general');
  const [filter, setFilter] = useState('all');
  const [queries, setQueries] = useState([]);
  const [loadError, setLoadError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stock, setStock] = useState(null);
  const [stockError, setStockError] = useState('');
  const [stockMessage, setStockMessage] = useState('');
  const [savingStock, setSavingStock] = useState(false);

  const load = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const data = await fetchQueries();
      setQueries(data.queries || []);
    } catch (err) {
      if (err.message === 'Sign in required.') setToken('');
      else setLoadError(err.message || 'Could not load queries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return undefined;
    const timer = window.setTimeout(() => {
      load();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [token]);

  const inPage = useMemo(
    () => queries.filter((query) => inTab(tab, query)),
    [queries, tab]
  );

  const visible = useMemo(
    () => inPage.filter((query) => filter === 'all' || query.intent === filter),
    [inPage, filter]
  );

  const openTab = (next) => {
    setTab(next);
    setFilter('all');
  };

  const openStock = async () => {
    setTab('stock');
    setStockMessage('');
    setStockError('');
    if (stock) return;
    try {
      setStock(await fetchStock());
    } catch (err) {
      setStockError(err.message || 'Could not load lot values.');
    }
  };

  const submitStock = async (event) => {
    event.preventDefault();
    setSavingStock(true);
    setStockMessage('');
    setStockError('');
    try {
      setStock(await saveStock(stock));
      setStockMessage('Saved. The cow dung page now shows these lot values.');
    } catch (err) {
      setStockError(err.message || 'Could not save lot values.');
    } finally {
      setSavingStock(false);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    setLoginError('');
    setSigningIn(true);
    try {
      const result = await adminLogin(username.trim(), password);
      sessionStorage.setItem('nbhf-admin-token', result.token);
      setToken(result.token);
      setPassword('');
    } catch (err) {
      setLoginError(err.message || 'Could not sign in.');
    } finally {
      setSigningIn(false);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem('nbhf-admin-token');
    setToken('');
    setQueries([]);
  };

  const mark = async (id, status) => {
    const data = await setQueryStatus(id, status);
    setQueries((current) => current.map((query) => (query.id === id ? data.query : query)));
  };

  const remove = async (id) => {
    await removeQuery(id);
    setQueries((current) => current.filter((query) => query.id !== id));
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex items-center justify-center px-4">
        <form onSubmit={signIn} className="w-full max-w-md bg-white border border-black/10 p-8">
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F7D3A] mb-2">NBHF</p>
          <h1 className="text-3xl font-bold text-[#174A32] mb-6">Admin sign in</h1>
          {loginError && <p className="mb-4 text-sm text-red-700">{loginError}</p>}
          <label className="block text-xs font-mono uppercase text-[#202824]/70 mb-1 font-semibold" htmlFor="admin-user">
            Username
          </label>
          <input
            id="admin-user"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-[#174A32]"
          />
          <label className="block text-xs font-mono uppercase text-[#202824]/70 mb-1 font-semibold" htmlFor="admin-pass">
            Password
          </label>
          <input
            id="admin-pass"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm mb-6 focus:outline-none focus:border-[#174A32]"
          />
          <button
            type="submit"
            disabled={signingIn}
            className="w-full bg-[#174A32] text-white text-xs font-bold uppercase tracking-wider py-3.5 disabled:opacity-60"
          >
            {signingIn ? 'Signing in' : 'Sign in'}
          </button>
        </form>
      </div>
    );
  }

  const activeTab = tab === 'stock'
    ? { label: 'Properties of current stock' }
    : (TABS.find((item) => item.id === tab) || TABS[0]);

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] lg:flex">
      <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-72 shrink-0 bg-[#122E20] text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#A3D9A5]">NBHF</p>
          <h1 className="text-lg font-bold mt-1">Query admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Query tabs">
          {TABS.map((item) => {
            const count = queries.filter((query) => inTab(item.id, query) && query.status === 'new').length;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => openTab(item.id)}
                className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  active ? 'bg-white text-[#174A32]' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate">{item.short}</span>
                  {item.short !== item.label && (
                    <span className={`block text-[11px] font-medium truncate ${active ? 'text-[#174A32]/60' : 'text-white/45'}`}>
                      {item.label}
                    </span>
                  )}
                </span>
                <span className={`shrink-0 min-w-6 text-center text-xs rounded-full px-1.5 py-0.5 ${
                  active ? 'bg-[#174A32] text-white' : 'bg-white/10 text-white/80'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="px-3 pb-2">
          <button
            type="button"
            onClick={openStock}
            className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold ${
              tab === 'stock' ? 'bg-white text-[#174A32]' : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="block">Lot values</span>
            <span className={`block text-[11px] font-medium ${tab === 'stock' ? 'text-[#174A32]/60' : 'text-white/45'}`}>
              Current stock
            </span>
          </button>
        </div>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={signOut}
            className="w-full rounded-lg px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {tab === 'stock' ? (
          <>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#4F7D3A]">Cow dung page</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A32] mt-1 mb-6">Properties of current stock</h2>
            {stock ? (
              <StockEditor
                stock={stock}
                onChange={setStock}
                onSave={submitStock}
                saving={savingStock}
                message={stockMessage}
                error={stockError}
              />
            ) : (
              <p className="text-sm text-[#202824]/70">{stockError || 'Loading lot values…'}</p>
            )}
          </>
        ) : (
        <>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.16em] text-[#4F7D3A]">Inbox</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#174A32] mt-1">{activeTab.label}</h2>
          </div>
          <div className="flex rounded-lg border border-black/10 bg-white p-1" role="tablist" aria-label="Buy or sell">
            {FILTERS.map((item) => {
              const count = inPage.filter((query) => query.status === 'new' && (item.id === 'all' || query.intent === item.id)).length;
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(item.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md ${
                    active ? 'bg-[#174A32] text-white' : 'text-[#174A32] hover:bg-[#F7F6F0]'
                  }`}
                >
                  {item.label}
                  <span className={`ml-2 text-xs ${active ? 'text-[#C89B3C]' : 'text-[#202824]/45'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {loadError && <p className="mb-4 text-sm text-red-700">{loadError}</p>}
        {loading && <p className="text-sm text-[#202824]/70">Loading queries…</p>}

        {!loading && visible.length === 0 && (
          <div className="bg-white border border-dashed border-black/15 rounded-2xl px-6 py-16 text-center text-sm text-[#202824]/60">
            No queries in this tab yet.
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {visible.map((query) => (
            <article key={query.id} className="bg-white border border-black/10 rounded-2xl p-5 flex flex-col min-h-[240px]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-[#174A32] truncate">{query.name}</h3>
                  <p className="text-xs text-[#202824]/55 mt-1">
                    {formatWhen(query.createdAt)}
                    {query.title ? ` · ${query.title}` : ''}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-[#E8F1E4] text-[#174A32]">
                    {INTENT_LABEL[query.intent] || query.intent}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
                    query.status === 'new' ? 'bg-[#C89B3C] text-[#122E20]' : 'bg-black/5 text-[#202824]/55'
                  }`}>
                    {query.status}
                  </span>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wider text-[#202824]/45">Phone</dt>
                  <dd className="font-medium truncate">{query.phone}</dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-[10px] uppercase tracking-wider text-[#202824]/45">From</dt>
                  <dd className="truncate">{SOURCE_LABEL[query.source] || query.source}</dd>
                </div>
                {query.email && (
                  <div className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-wider text-[#202824]/45">Email</dt>
                    <dd className="truncate">{query.email}</dd>
                  </div>
                )}
                {query.company && (
                  <div className="min-w-0">
                    <dt className="text-[10px] uppercase tracking-wider text-[#202824]/45">Company</dt>
                    <dd className="truncate">{query.company}</dd>
                  </div>
                )}
                {query.details && Object.entries(query.details).map(([key, value]) => (
                  value ? (
                    <div key={key} className="min-w-0">
                      <dt className="text-[10px] uppercase tracking-wider text-[#202824]/45">{key}</dt>
                      <dd className="truncate">{value}</dd>
                    </div>
                  ) : null
                ))}
              </dl>

              {query.message && (
                <p className="mt-4 text-sm leading-relaxed bg-[#F7F6F0] rounded-xl px-3 py-2.5 whitespace-pre-wrap">
                  {query.message}
                </p>
              )}

              <div className="mt-auto pt-4 flex gap-2">
                {query.status === 'new' ? (
                  <button type="button" onClick={() => mark(query.id, 'read')} className="text-xs font-semibold uppercase tracking-wider text-[#174A32] border border-[#174A32]/20 rounded-lg px-3 py-2 hover:bg-[#174A32] hover:text-white">
                    Mark read
                  </button>
                ) : (
                  <button type="button" onClick={() => mark(query.id, 'new')} className="text-xs font-semibold uppercase tracking-wider text-[#174A32] border border-[#174A32]/20 rounded-lg px-3 py-2 hover:bg-[#174A32] hover:text-white">
                    Mark new
                  </button>
                )}
                <button type="button" onClick={() => remove(query.id)} className="text-xs font-semibold uppercase tracking-wider text-red-700 border border-red-200 rounded-lg px-3 py-2 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
        </>
        )}
      </main>
    </div>
  );
};

export default Admin;
