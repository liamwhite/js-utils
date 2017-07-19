/**
 * Request Utils
 */

let csrf;

function csrfToken() {
  csrf = csrf || document.querySelector('meta[name=csrf-token]');
  return csrf && csrf.content;
}

function fetchInternal(verb, endpoint, body, headers) {
  const data = {
    method: verb,
    credentials: 'same-origin',
    headers
  };

  if (body) {
    body._method = verb;
    data.body = JSON.stringify(body);
  }

  return fetch(endpoint, data);
}

export function fetchHtml(verb, endpoint, body) {
  return fetchInternal(verb, endpoint, body, {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': csrfToken(),
  });
}

export function fetchJson(verb, endpoint, body) {
  return fetchInternal(verb, endpoint, body, {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken(),
  });
}

export function handleError(response) {
  if (!response.ok) {
    throw new Error('Received error from server');
  }
  return response;
}
