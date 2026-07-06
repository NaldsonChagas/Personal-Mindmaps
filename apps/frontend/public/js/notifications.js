let container = null;

function getContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type, duration) {
  const el = document.createElement('div');
  el.className = `notification-toast ${type}`;
  el.textContent = message;
  getContainer().appendChild(el);
  setTimeout(() => {
    el.classList.add('fade-out');
    setTimeout(() => el.remove(), 300);
  }, duration);
}

export function showSuccess(message) {
  showToast(message, 'success', 3000);
}

export function showError(message) {
  showToast(message, 'error', 5000);
}

export function showInfo(message) {
  showToast(message, 'info', 3000);
}

export function clearNotifications() {
  if (container) {
    container.innerHTML = '';
  }
}
