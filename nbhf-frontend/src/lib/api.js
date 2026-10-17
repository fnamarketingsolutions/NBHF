const configuredApi = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const apiOrigin = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'nasarebioharvest.com' || host === 'www.nasarebioharvest.com') {
      return 'https://api.nasarebioharvest.com';
    }
  }
  return configuredApi;
};

const apiPath = (path) => `${apiOrigin()}${path}`;

const parseError = async (response) => {
  try {
    const body = await response.json();
    return body.error || 'Request failed.';
  } catch {
    return 'Request failed.';
  }
};

export const submitQuery = async (payload) => {
  const response = await fetch(apiPath('/api/queries'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
};

export const adminLogin = async (username, password) => {
  const response = await fetch(apiPath('/api/admin/login'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
};

const adminFetch = async (path, options = {}) => {
  const token = sessionStorage.getItem('nbhf-admin-token');
  const response = await fetch(apiPath(path), {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (response.status === 401) {
    sessionStorage.removeItem('nbhf-admin-token');
    throw new Error('Sign in required.');
  }
  if (!response.ok) throw new Error(await parseError(response));
  return response.json();
};

export const fetchStock = async () => {
  const response = await fetch(apiPath('/api/stock'));
  if (!response.ok) throw new Error('Could not load lot values.');
  return response.json();
};

export const saveStock = (stock) =>
  adminFetch('/api/admin/stock', {
    method: 'PUT',
    body: JSON.stringify(stock),
  });

export const fetchQueries = () => adminFetch('/api/admin/queries');

export const setQueryStatus = (id, status) =>
  adminFetch(`/api/admin/queries/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });

export const removeQuery = (id) =>
  adminFetch(`/api/admin/queries/${id}`, { method: 'DELETE' });
