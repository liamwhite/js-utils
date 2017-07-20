/**
 * DOM events
 */

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
