let openMenu = null;

function closeOnOutsideClick(e) {
  if (!openMenu) return;
  if (!openMenu.contains(e.target) && !e.target.closest('[data-dropdown-trigger]')) {
    closeDropdown(openMenu);
  }
}

export function openDropdown(menuEl) {
  if (openMenu) {
    closeDropdown(openMenu);
  }
  menuEl.classList.remove('hidden');
  openMenu = menuEl;
  document.addEventListener('click', closeOnOutsideClick);
}

export function closeDropdown(menuEl) {
  menuEl.classList.add('hidden');
  if (openMenu === menuEl) {
    openMenu = null;
  }
  document.removeEventListener('click', closeOnOutsideClick);
}

export function toggleDropdown(triggerEl, menuEl) {
  if (menuEl.classList.contains('hidden')) {
    openDropdown(menuEl);
  } else {
    closeDropdown(menuEl);
  }
}