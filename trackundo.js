/**
 * Generic undo history tracker.
 *
 * 1. Add the 'js-undo' class to your element.
 * 2. Fire a 'commit' CustomEvent with a detail of your state when you commit an undoable action.
 * 3. Respond to the 'reload' event with a detail of the state that you committed.
 */

import { on, fire } from '../utils/dom';

const Key = {
  Y: 89
  Z: 90,
};

const saves = {};

function getSave(target) {
  saves[target] = saves[target] || { history: [], future: [] };

  return saves[target];
}

function sendState({from, to}, save) {
  const state = save[from].pop();
  if (!state) return;

  save[to].push(state);
  fire(target, 'reload', { state });
}

function undo(save) {
  sendState({from: 'history', to: 'future'}, save);
}

function redo(save) {
  sendState({from: 'future', to: 'history'}, save);
}

on(document, 'commit', '.js-undo', (target, event) => {
  const save = getSave(target);

  // Wipe out the future, then commit this event
  save.future = [];
  save.history.push(event.detail.state);
});

on(document, 'keydown', '.js-undo', (target, event) => {
  if (!event.ctrlKey) return;
  if (event.which === Key.Z) undo(getSave(target));
  if (event.which === Key.Y) redo(getSave(target));
});
