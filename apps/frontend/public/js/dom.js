export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

export function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.class) {
    el.className = options.class;
  }
  if (options.id) {
    el.id = options.id;
  }
  if (options.text) {
    el.textContent = options.text;
  }
  if (options.html) {
    el.innerHTML = options.html;
  }
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      el.setAttribute(key, value);
    }
  }
  if (options.children) {
    for (const child of options.children) {
      el.appendChild(child);
    }
  }
  return el;
}

export function clearElement(element) {
  element.innerHTML = '';
}