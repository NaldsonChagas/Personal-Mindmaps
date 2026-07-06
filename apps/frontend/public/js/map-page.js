import * as api from './api.js';
import { FrontendMindMapAdapter } from './mind-elixir-adapter.js';
import { showError } from './notifications.js';

const state = {
  mapId: null,
  map: null,
  mind: null,
  isLoading: false,
  isSaving: false,
  hasPendingChanges: false,
  lastSavedAt: null,
  autoSaveTimer: null,
  pendingSaveAfterCurrent: false,
  lastContentSnapshot: null,
};

const AUTO_SAVE_DELAY = 2000;

const titleDisplay = document.getElementById('editor-title-display');
const titleInput = document.getElementById('editor-title-input');
const saveBadge = document.getElementById('save-badge');
const saveBtn = document.getElementById('save-btn');
const editorContainer = document.getElementById('mind-map-editor');

function extractMapId() {
  const match = window.location.pathname.match(/^\/map\/(.+)$/);
  return match ? match[1] : null;
}

function updateSaveBadge(status, message) {
  saveBadge.className = 'save-badge';
  if (status === 'saved') {
    saveBadge.classList.add('saved');
    saveBadge.textContent = message || 'Saved';
    saveBtn.disabled = true;
  } else if (status === 'saving') {
    saveBadge.classList.add('saving');
    saveBadge.textContent = message || 'Saving...';
    saveBtn.disabled = true;
  } else if (status === 'unsaved') {
    saveBadge.classList.add('unsaved');
    saveBadge.textContent = message || 'Unsaved changes';
    saveBtn.disabled = false;
  } else if (status === 'error') {
    saveBadge.classList.add('error');
    saveBadge.textContent = message || 'Save failed';
    saveBtn.disabled = false;
  }
}

function showLoading() {
  editorContainer.innerHTML = `
    <div class="editor-loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
      <span>Loading mind map...</span>
    </div>
  `;
}

function showNotFound() {
  editorContainer.innerHTML = `
    <div class="editor-error">
      <h3>Mind map not found</h3>
      <p>This mind map could not be found.</p>
      <a href="/" class="btn btn-primary btn-sm">Back to list</a>
    </div>
  `;
}

function showLoadError() {
  editorContainer.innerHTML = `
    <div class="editor-error">
      <h3>Failed to load</h3>
      <p>There was an error loading this mind map.</p>
      <button id="retry-load-btn" class="btn btn-primary btn-sm">Retry</button>
      <a href="/" class="btn btn-ghost btn-sm">Back to list</a>
    </div>
  `;
  const retryBtn = document.getElementById('retry-load-btn');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => loadMap());
  }
}

function initTitleEditing() {
  titleDisplay.addEventListener('click', () => {
    titleDisplay.classList.add('hidden');
    titleInput.value = titleDisplay.textContent;
    titleInput.classList.remove('hidden');
    titleInput.focus();
    titleInput.select();
  });

  function commitTitle() {
    const value = titleInput.value.trim();
    if (value && value !== titleDisplay.textContent) {
      titleDisplay.textContent = value;
      if (!state.hasPendingChanges) {
        state.hasPendingChanges = true;
        updateSaveBadge('unsaved');
      }
      scheduleAutoSave();
    }
    titleInput.classList.add('hidden');
    titleDisplay.classList.remove('hidden');
  }

  titleInput.addEventListener('blur', commitTitle);
  titleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      titleInput.blur();
    }
    if (e.key === 'Escape') {
      titleInput.value = titleDisplay.textContent;
      titleInput.classList.add('hidden');
      titleDisplay.classList.remove('hidden');
    }
  });
}

function createMindElixirInstance(data) {
  const mind = new MindElixir.default({
    el: editorContainer,
    direction: MindElixir.SIDE,
    editable: true,
    contextMenu: true,
    toolBar: true,
    nodeMenu: true,
    keypress: true,
  });
  mind.init(data);
  return mind;
}

function setupChangeDetection(mind) {
  function detectChange() {
    if (!state.hasPendingChanges) {
      state.hasPendingChanges = true;
      updateSaveBadge('unsaved');
    }
    scheduleAutoSave();
  }

  mind.bus.addListener('operation', detectChange);

  editorContainer.addEventListener('click', (e) => {
    if (e.target.closest('.mind-elixir')) detectChange();
  });

  editorContainer.addEventListener('dblclick', detectChange);
  editorContainer.addEventListener('keydown', (e) => {
    if (e.target.matches('[contenteditable]') || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      detectChange();
    }
  });
}

function scheduleAutoSave() {
  clearTimeout(state.autoSaveTimer);
  state.autoSaveTimer = setTimeout(() => {
    saveMindMap();
  }, AUTO_SAVE_DELAY);
}

async function saveMindMap({ force = false } = {}) {
  if (!state.hasPendingChanges && !force) return;
  if (state.isSaving) {
    state.pendingSaveAfterCurrent = true;
    return;
  }

  state.isSaving = true;
  updateSaveBadge('saving');

  const title = titleDisplay.textContent;

  let content = null;
  if (state.mind) {
    const mindData = state.mind.getData();
    const appContent = FrontendMindMapAdapter.fromMindElixir(mindData);
    content = FrontendMindMapAdapter.toMindElixir(appContent);
  }

  try {
    await api.updateMindMap(state.mapId, { title, content });
    state.hasPendingChanges = false;
    state.lastSavedAt = Date.now();
    updateSaveBadge('saved');
  } catch (err) {
    showError(`Save failed: ${err.message}`);
    updateSaveBadge('error', 'Save failed');
    state.isSaving = false;
    if (state.pendingSaveAfterCurrent) {
      state.pendingSaveAfterCurrent = false;
      saveMindMap();
    }
    return;
  }

  state.isSaving = false;
  if (state.pendingSaveAfterCurrent) {
    state.pendingSaveAfterCurrent = false;
    saveMindMap();
  }
}

async function loadMap() {
  state.isLoading = true;
  showLoading();
  titleDisplay.textContent = 'Loading...';
  saveBadge.textContent = '';
  saveBtn.disabled = true;

  try {
    const response = await api.getMindMap(state.mapId);
    const appContent = FrontendMindMapAdapter.fromMindElixir(response.content);
    state.map = {
      id: response.id,
      title: response.title,
      folderId: response.folderId,
      content: appContent,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };

    titleDisplay.textContent = state.map.title;
    updateSaveBadge('saved', '');

    const mindElixirData = FrontendMindMapAdapter.toMindElixir(appContent);
    state.mind = createMindElixirInstance(mindElixirData);
    setupChangeDetection(state.mind);
  } catch (err) {
    if (err.message && err.message.includes('404')) {
      showNotFound();
    } else {
      showLoadError();
      showError(`Failed to load mind map: ${err.message}`);
    }
    return;
  }

  state.isLoading = false;
}

const backBtn = document.getElementById('back-btn');
backBtn.addEventListener('click', async () => {
  if (state.hasPendingChanges) {
    backBtn.disabled = true;
    await saveMindMap({ force: true });
    backBtn.disabled = false;
  }
  window.location.href = '/';
});

const exportBtn = document.getElementById('export-btn');
exportBtn.addEventListener('click', () => {
  if (state.mind && state.mind.exportPng) {
    state.mind.exportPng();
  }
});

saveBtn.addEventListener('click', () => {
  saveMindMap({ force: true });
});

window.addEventListener('beforeunload', (e) => {
  if (state.hasPendingChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});

state.mapId = extractMapId();
if (!state.mapId) {
  showNotFound();
} else {
  document.title = `Mind Map — Personal MindMaps`;
  initTitleEditing();
  loadMap();
}
