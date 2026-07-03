const mapId = window.location.pathname.split('/map/')[1] || null;

if (mapId) {
  const titleEl = document.getElementById('map-title');
  if (titleEl) {
    titleEl.textContent = `Mind Map: ${mapId}`;
  }
}