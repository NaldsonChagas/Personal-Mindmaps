import { qs, createElement, clearElement } from './dom.js';
import { openModal } from './modal.js';
import { toggleDropdown, closeDropdown } from './dropdown.js';
import * as api from './api.js';

const state = {
  folders: [],
  mindMaps: [],
  currentFolderId: null,
  currentFolderName: null,
};

function showError(message) {
  const banner = qs('#error-banner');
  if (!banner) return;
  banner.textContent = message;
  banner.classList.remove('hidden');
  setTimeout(() => banner.classList.add('hidden'), 5000);
}

function sortByNewest(arr) {
  return arr.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function lucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

async function fetchAndRender() {
  try {
    const [folders, mindMaps] = await Promise.all([
      api.getFolders(),
      api.getMindMaps(state.currentFolderId),
    ]);
    state.folders = sortByNewest(folders);
    state.mindMaps = sortByNewest(mindMaps);
  } catch (err) {
    showError(err.message);
  }
  renderAll();
}

function renderAll() {
  renderFolders();
  renderMindMaps();
  updateHeader();
  lucideIcons();
}

function updateHeader() {
  const sectionTitle = qs('#section-title');
  const backBtn = qs('#folder-back-btn');
  if (state.currentFolderId && state.currentFolderName) {
    sectionTitle.textContent = `Mind maps in ${state.currentFolderName}`;
    backBtn.classList.remove('hidden');
  } else {
    sectionTitle.textContent = 'All mind maps';
    backBtn.classList.add('hidden');
  }
}

function renderFolders() {
  const grid = qs('#folders-grid');
  const empty = qs('#folders-empty');
  clearElement(grid);

  if (state.folders.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  for (const folder of state.folders) {
    const card = createElement('div', { class: 'card folder-card' });
    card.innerHTML = `<i data-lucide="folder"></i><span class="folder-name">${escapeHtml(folder.name)}</span>`;
    card.addEventListener('click', () => {
      state.currentFolderId = folder.id;
      state.currentFolderName = folder.name;
      fetchAndRender();
    });
    grid.appendChild(card);
  }
}

function renderMindMaps() {
  const grid = qs('#maps-grid');
  const empty = qs('#maps-empty');
  clearElement(grid);

  if (state.mindMaps.length === 0) {
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');

  for (const map of state.mindMaps) {
    const wrapper = createElement('div', { class: 'map-card-wrapper' });

    const card = createElement('div', { class: 'card map-card' });
    card.innerHTML = `<i data-lucide="file-text"></i><div class="map-card-info"><div class="map-card-title">${escapeHtml(map.title)}</div></div>`;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.map-card-actions')) return;
      window.location.href = `/map/${map.id}`;
    });

    const actions = createElement('div', { class: 'map-card-actions' });

    const trigger = createElement('button', {
      class: 'btn btn-icon',
      attrs: { 'aria-label': `Actions for ${map.title}`, 'data-dropdown-trigger': '' },
    });
    trigger.innerHTML = '<i data-lucide="more-vertical"></i>';

    const menu = createElement('div', { class: 'dropdown-menu hidden' });

    const renameItem = createElement('button', { class: 'dropdown-item', attrs: { type: 'button' } });
    renameItem.innerHTML = '<i data-lucide="pencil"></i> Rename';
    renameItem.addEventListener('click', () => {
      closeDropdown(menu);
      handleRename(map);
    });
    menu.appendChild(renameItem);

    const moveItem = createElement('button', { class: 'dropdown-item', attrs: { type: 'button' } });
    moveItem.innerHTML = '<i data-lucide="move"></i> Move to folder';
    moveItem.addEventListener('click', () => {
      closeDropdown(menu);
      handleMove(map);
    });
    menu.appendChild(moveItem);

    const deleteItem = createElement('button', { class: 'dropdown-item dropdown-item-danger', attrs: { type: 'button' } });
    deleteItem.innerHTML = '<i data-lucide="trash-2"></i> Delete';
    deleteItem.addEventListener('click', () => {
      closeDropdown(menu);
      handleDelete(map);
    });
    menu.appendChild(deleteItem);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown(trigger, menu);
    });

    actions.appendChild(trigger);
    actions.appendChild(menu);
    card.appendChild(actions);
    wrapper.appendChild(card);
    grid.appendChild(wrapper);
  }
}

async function handleNewFolder() {
  const result = await openModal({
    title: 'New folder',
    bodyHtml: '<label class="label" for="folder-name-input">Folder name</label><input id="folder-name-input" class="input" type="text" placeholder="My folder" autofocus />',
    confirmLabel: 'Create',
    onConfirm: () => {
      const input = document.getElementById('folder-name-input');
      const name = input ? input.value.trim() : '';
      if (!name) {
        input?.focus();
        return false;
      }
      return name;
    },
  });
  if (!result) return;
  try {
    await api.createFolder({ name: result });
    await fetchAndRender();
  } catch (err) {
    showError(err.message);
  }
}

async function handleNewMindMap() {
  const result = await openModal({
    title: 'New mind map',
    bodyHtml: `<label class="label" for="map-title-input">Title</label><input id="map-title-input" class="input" type="text" placeholder="My mind map" autofocus />${state.currentFolderId ? `<input type="hidden" id="map-folder-id" value="${state.currentFolderId}" />` : ''}`,
    confirmLabel: 'Create',
    onConfirm: () => {
      const input = document.getElementById('map-title-input');
      const title = input ? input.value.trim() : '';
      if (!title) {
        input?.focus();
        return false;
      }
      return { title, folderId: state.currentFolderId || undefined };
    },
  });
  if (!result) return;
  try {
    const map = await api.createMindMap(result);
    window.location.href = `/map/${map.id}`;
  } catch (err) {
    showError(err.message);
  }
}

async function handleRename(map) {
  const result = await openModal({
    title: 'Rename mind map',
    bodyHtml: `<label class="label" for="rename-input">New title</label><input id="rename-input" class="input" type="text" value="${escapeHtml(map.title)}" autofocus />`,
    confirmLabel: 'Rename',
    onConfirm: () => {
      const input = document.getElementById('rename-input');
      const title = input ? input.value.trim() : '';
      if (!title) {
        input?.focus();
        return false;
      }
      return title;
    },
  });
  if (!result) return;
  try {
    await api.updateMindMap(map.id, { title: result });
    await fetchAndRender();
  } catch (err) {
    showError(err.message);
  }
}

async function handleDelete(map) {
  const result = await openModal({
    title: 'Delete mind map',
    bodyHtml: `<p>Are you sure you want to delete <strong>${escapeHtml(map.title)}</strong>? This action cannot be undone.</p>`,
    confirmLabel: 'Delete',
    confirmClass: 'btn-danger',
    onConfirm: () => true,
  });
  if (!result) return;
  try {
    await api.deleteMindMap(map.id);
    await fetchAndRender();
  } catch (err) {
    showError(err.message);
  }
}

async function handleMove(map) {
  const currentFolderId = map.folderId;

  const panel = document.createElement('div');
  panel.id = 'move-modal-body';

  const folderList = document.createElement('div');
  folderList.id = 'move-folder-list';
  panel.appendChild(folderList);

  const createArea = document.createElement('div');
  createArea.id = 'move-create-area';
  createArea.style.marginTop = 'var(--space-3)';
  panel.appendChild(createArea);

  function renderFolderOptions(selectedId) {
    folderList.innerHTML = '';

    const noFolder = document.createElement('button');
    noFolder.className = `dropdown-item${!selectedId ? ' selected' : ''}`;
    noFolder.innerHTML = '<i data-lucide="x"></i> No folder';
    noFolder.style.width = '100%';
    noFolder.style.borderRadius = 'var(--radius-sm)';
    noFolder.style.marginBottom = 'var(--space-1)';
    noFolder.style.background = !selectedId ? 'var(--color-surface-muted)' : '';
    noFolder.addEventListener('click', () => renderFolderOptions(null));
    folderList.appendChild(noFolder);

    for (const f of sortByNewest(state.folders)) {
      const btn = document.createElement('button');
      btn.className = `dropdown-item${selectedId === f.id ? ' selected' : ''}`;
      btn.innerHTML = `<i data-lucide="folder"></i> ${escapeHtml(f.name)}`;
      btn.style.width = '100%';
      btn.style.borderRadius = 'var(--radius-sm)';
      btn.style.marginBottom = '2px';
      btn.style.background = selectedId === f.id ? 'var(--color-surface-muted)' : '';
      btn.addEventListener('click', () => renderFolderOptions(f.id));
      folderList.appendChild(btn);
    }

    createArea.innerHTML = '';
    const createBtn = document.createElement('button');
    createBtn.className = 'btn btn-ghost btn-sm';
    createBtn.innerHTML = '<i data-lucide="plus"></i> Create new folder';
    createBtn.addEventListener('click', () => {
      createBtn.style.display = 'none';
      showInlineCreateForm(selectedId);
    });
    createArea.appendChild(createBtn);

    storeSelected(selectedId);
    if (window.lucide) window.lucide.createIcons();
  }

  let selectedFolderId = currentFolderId;

  function storeSelected(id) {
    selectedFolderId = id;
  }

  function showInlineCreateForm(selectedId) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.gap = 'var(--space-2)';

    const input = document.createElement('input');
    input.className = 'input';
    input.type = 'text';
    input.placeholder = 'Folder name';
    input.autofocus = true;
    setTimeout(() => input.focus(), 50);
    container.appendChild(input);

    const createBtn = document.createElement('button');
    createBtn.className = 'btn btn-primary btn-sm';
    createBtn.textContent = 'Create';
    container.appendChild(createBtn);

    createArea.innerHTML = '';
    createArea.appendChild(container);

    createBtn.addEventListener('click', async () => {
      const name = input.value.trim();
      if (!name) return;
      try {
        const newFolder = await api.createFolder({ name });
        state.folders = sortByNewest([...state.folders, newFolder]);
        renderFolderOptions(newFolder.id);
      } catch (err) {
        showError(err.message);
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') createBtn.click();
    });
  }

  renderFolderOptions(currentFolderId);

  const modalPromise = openModal({
    title: `Move "${map.title}"`,
    bodyHtml: '',
    confirmLabel: 'Move',
    onConfirm: () => {
      const panelEl = document.getElementById('move-modal-body');
      if (!panelEl) return false;
      return selectedFolderId;
    },
  });

  const modalBody = document.querySelector('.modal-body');
  if (modalBody) {
    modalBody.appendChild(panel);
  }

  const confirmed = await modalPromise;

  if (confirmed === null) return;

  const folderId = confirmed || null;

  try {
    await api.moveMindMap(map.id, { folderId });
    await fetchAndRender();
  } catch (err) {
    showError(err.message);
  }

  const moveBody = qs('#move-modal-body');
  if (moveBody) {
    const container = moveBody.closest('.modal-panel');
    if (container) {
      const modalOverlay = container.closest('.modal-overlay');
      if (modalOverlay) {
        modalOverlay.classList.add('hidden');
        modalOverlay.innerHTML = '';
      }
    }
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function init() {
  const newFolderBtn = qs('#btn-new-folder');
  const newMapBtn = qs('#btn-new-map');
  const backBtn = qs('#folder-back-btn');

  if (newFolderBtn) {
    newFolderBtn.addEventListener('click', handleNewFolder);
  }
  if (newMapBtn) {
    newMapBtn.addEventListener('click', handleNewMindMap);
  }
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      state.currentFolderId = null;
      state.currentFolderName = null;
      fetchAndRender();
    });
  }

  fetchAndRender();
}

document.addEventListener('DOMContentLoaded', init);