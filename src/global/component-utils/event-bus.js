import { EventEmitter } from 'events';
import { unref } from 'vue';

class EventBus extends EventEmitter {}

const busses = {};
/**
 * Get an event bus
 * @param {string} busId unique id
 * @returns {EventBus}
 */
export function getBus(busId) {
  const id = unref(busId);
  if (!(id in busses)) busses[id] = new EventBus();
  return busses[id];
}
/**
 * Remove a previously created event bus
 * @param {string} busId unique id
 * @returns {EventBus}
 */
export function removeBus(busId) {
  const id = unref(busId);
  delete busses[id];
}
