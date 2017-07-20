/**
 * Event delegation system for common actions
 */

import { $, $$, makeEl } from './dom';
import { fire, delegate } from './events';

const headers = () => ({
  'Accept': 'text/javascript',
  'X-CSRF-Token': window.booru.csrfToken
});

function confirm(event, target) {
  if (!window.confirm(target.dataset.confirm)) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}

function disable(event, target) {
  // failed validations prevent the form from being submitted;
  // stop here or the form will be permanently locked
  if (target.type === 'submit' && target.closest(':invalid') !== null) return;

  // delay is needed because Safari stops the submit if the button is immediately disabled
  target.innerHTML = target.dataset.disableWith;
  requestAnimationFrame(() => target.disabled = 'disabled');
}

// you should use button_to instead of link_to[method]!
function linkMethod(event, target) {
  event.preventDefault();

  const form   = makeEl('form',  { action: target.href, method: 'POST' });
  const csrf   = makeEl('input', { type: 'hidden', name: window.booru.csrfParam, value: window.booru.csrfToken });
  const method = makeEl('input', { type: 'hidden', name: '_method', value: target.dataset.method });

  document.body.appendChild(form);

  form.appendChild(csrf);
  form.appendChild(method);
  form.submit();
}

function formRemote(event, target) {
  event.preventDefault();

  fetch(target.action, {
    credentials: 'same-origin',
    method: (target.dataset.method || target.method || 'POST').toUpperCase(),
    headers: headers(),
    body: new FormData(target)
  }).then(response =>
    fire(target, 'fetchcomplete', response)
  );
}

function formReset(event, target) {
  $$('input[disabled][data-disable-with]', target).forEach(input =>
    input.removeAttribute('disabled')
  );
}

function linkRemote(event, target) {
  event.preventDefault();

  fetch(target.href, {
    credentials: 'same-origin',
    method: target.dataset.method.toUpperCase(),
    headers: headers()
  }).then(response =>
    fire(target, 'fetchcomplete', response)
  );
}

function leftClick(func) {
  return (event, target) => { if (event.button === 0) func(event, target); };
}

delegate(document, 'click', {
  'a[data-confirm],button[data-confirm],input[data-confirm]': leftClick(confirm),
  'a[data-disable-with],button[data-disable-with],input[data-disable-with]': leftClick(disable),
  'a[data-method]:not([data-remote])': leftClick(linkMethod),
  'a[data-remote]': leftClick(linkRemote),
});

delegate(document, 'submit', {
  'form[data-remote]': formRemote
});

delegate(document, 'reset', {
  'form': formReset
});
