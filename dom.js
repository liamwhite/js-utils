/**
 * DOM utils.
 */

// Query selectors

export function $(selector, node = document) {
  return node.querySelector(selector);
}

export function $$(selector, node = document) {
  return [].slice.call(node.querySelectorAll(selector));
}

// Element manipulation

export function hideEl(...elements) {
  elements.forEach(e => e.classList.add('hidden'));
}

export function showEl(...elements) {
  elements.forEach(e => e.classList.remove('hidden'));
}

export function toggleEl(...elements) {
  elements.forEach(el => el.classList.toggle('hidden'));
}

export function clearEl(...elements) {
  elements.forEach(el => { while (el.firstChild) el.removeChild(el.firstChild); });
}

export function removeEl(...elements) {
  elements.forEach(el => el.parentNode.removeChild(el));
}

// Events

export function on(node, event, selector, callback) {
  delegate(node, event, {[selector]: callback});
}

export function delegate(node, event, selectors) {
  node.addEventListener(event, e => {
    for (const selector of selectors) {
      const target = e.target.closest(selector);
      if (target) selectors[selector](target, event);
    }
  });
}

export function fire(node, event, detail) {
  node.dispatchEvent(new CustomEvent(event, { detail, bubbles: true }));
}

export function onLeftClick(callback, context = document) {
  context.addEventListener('click', event => {
    if (event.button === 0) callback(event);
  });
}

export function whenReady(callback) {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
}

export function once(node, type, listener) {
  function wrapper() {
    node.removeEventListener(type, wrapper);
    return listener.apply(this, arguments);
  }
  node.addEventListener(type, wrapper);
}

// HTML manipulation

export function toEl(str) {
  const div = document.createElement('div');
  div.innerHTML = str;
  return div.children[0];
}

export function escapeHtml(html) {
  return html.replace(/&/g, '&amp;')
             .replace(/>/g, '&gt;')
             .replace(/</g, '&lt;')
             .replace(/"/g, '&quot;');
}
