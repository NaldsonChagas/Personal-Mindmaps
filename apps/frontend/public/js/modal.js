import { createElement } from './dom.js';

let overlay = null;

function getOverlay() {
  if (!overlay) {
    overlay = createElement('div', { class: 'modal-overlay hidden' });
    document.body.appendChild(overlay);
  }
  return overlay;
}

export function openModal({ title, bodyHtml, confirmLabel, confirmClass, onConfirm, showCancel = true }) {
  return new Promise((resolve) => {
    const panel = createElement('div', { class: 'modal-panel' });

    const header = createElement('div', { class: 'modal-header' });
    header.appendChild(createElement('h2', { text: title }));
    panel.appendChild(header);

    const body = createElement('div', { class: 'modal-body' });
    if (bodyHtml) {
      body.innerHTML = bodyHtml;
    }
    panel.appendChild(body);

    const footer = createElement('div', { class: 'modal-footer' });
    if (showCancel) {
      const cancelBtn = createElement('button', { class: 'btn btn-ghost', text: 'Cancel', attrs: { type: 'button' } });
      cancelBtn.addEventListener('click', () => {
        close();
        resolve(null);
      });
      footer.appendChild(cancelBtn);
    }

    const confirmBtn = createElement('button', {
      class: `btn ${confirmClass || 'btn-primary'}`,
      text: confirmLabel || 'Confirm',
      attrs: { type: 'button' },
    });
    confirmBtn.addEventListener('click', () => {
      const result = onConfirm ? onConfirm() : true;
      if (result !== false) {
        close();
        resolve(result);
      }
    });
    footer.appendChild(confirmBtn);

    panel.appendChild(footer);

    const el = getOverlay();
    el.innerHTML = '';
    el.appendChild(panel);
    el.classList.remove('hidden');

    const input = el.querySelector('input');
    if (input) {
      setTimeout(() => input.focus(), 50);
    }

    function close() {
      el.classList.add('hidden');
      el.innerHTML = '';
      document.removeEventListener('keydown', handleKeydown);
    }

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        close();
        resolve(null);
      }
    }

    document.addEventListener('keydown', handleKeydown);

    el.addEventListener('click', (e) => {
      if (e.target === el) {
        close();
        resolve(null);
      }
    });
  });
}

export function closeModal() {
  const el = getOverlay();
  el.classList.add('hidden');
  el.innerHTML = '';
}