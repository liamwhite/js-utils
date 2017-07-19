import { $ } from '../utils/dom';

function xhrProgress(method, url, data, progress, success, error) {
  const csrf = $('meta[name="csrf-token"]').content;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      success(new Response(xhr.responseText, {status: xhr.status}));
    } else  {
      error(new Error('Failed to complete upload'));
    }
  }

  xhr.open(method, url, true);
  xhr.upload.addEventListener('progress', progress);
  xhr.setRequestHeader('X-CSRF-Token', csrf);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.send(data);
}

export function fetchProgress(method, url, data, progress) {
  return new Promise((resolve, reject) => xhrProgress(method, url, data, progress, resolve, reject));
}
