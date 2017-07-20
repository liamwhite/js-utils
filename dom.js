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

export function makeEl(tag, attr = {}) {
  const el = document.createElement(tag);
  for (const prop in attr) el[prop] = attr[prop];
  return el;
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
