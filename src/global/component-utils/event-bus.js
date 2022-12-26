import { EventEmitter } from 'events';

class EventBus extends EventEmitter {}

const busses = {};
/**
 * Get an event bus
 * @param {string} id unique id
 * @returns {EventBus}
 */
export function getBus(id) {
  if (!(id in busses)) busses[id] = new EventBus();
  return busses[id];
}
/**
 * Remove a previously created event bus
 * @param {string} id unique id
 * @returns {EventBus}
 */
export function removeBus(id) {
  delete busses[id];
}
