const BASE_URL = (window.APP_CONFIG && window.APP_CONFIG.API_URL) || 'http://localhost:3000';

async function request(path, options = {}) {
  const url = `${BASE_URL}/api${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (res.status === 204) return null;
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      if (body.message) message = body.message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export function getFolders() {
  return request('/folders');
}

export function createFolder(payload) {
  return request('/folders', { method: 'POST', body: JSON.stringify(payload) });
}

export function renameFolder(id, payload) {
  return request(`/folders/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteFolder(id) {
  return request(`/folders/${id}`, { method: 'DELETE' });
}

export function getMindMaps(folderId) {
  const query = folderId ? `?folderId=${folderId}` : '';
  return request(`/mind-maps${query}`);
}

export function getMindMap(id) {
  return request(`/mind-maps/${id}`);
}

export function createMindMap(payload) {
  return request('/mind-maps', { method: 'POST', body: JSON.stringify(payload) });
}

export function updateMindMap(id, payload) {
  return request(`/mind-maps/${id}`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function moveMindMap(id, payload) {
  return request(`/mind-maps/${id}/move`, { method: 'PATCH', body: JSON.stringify(payload) });
}

export function deleteMindMap(id) {
  return request(`/mind-maps/${id}`, { method: 'DELETE' });
}