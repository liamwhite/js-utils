/**
 * Automatically-resizing <input>s, <textarea>s.
 */

import { on } from '../utils/dom';

on(document, 'keyup', 'input.js-auto-resize', input => {
  const width = input.clientWidth;

  input.style.width = '0px';
  input.style.marginLeft = `${width}px`;
  input.style.width = `${input.scrollWidth + 20}px`;
  input.style.marginLeft = '';
});

on(document, 'keyup', 'textarea.js-auto-resize', input => {
  const height = input.clientHeight;

  input.style.height = '0px';
  input.style.marginBottom = `${height}px`;
  input.style.height = `${input.scrollHeight + 20}px`;
  input.style.marginBottom = '';
});
