import mitt from 'mitt';
import { unref } from 'vue';

const busses = {};
/**
 * Get an event bus
 * @param {string} busId unique id
 * @returns {Emitter}
 */
export function getBus(busId) {
  const id = unref(busId);
  if (!(id in busses)) busses[id] = mitt();
  return busses[id];
}
/**
 * Remove a previously created event bus
 * @param {string} busId unique id
 * @returns {Emitter}
 */
export function removeBus(busId) {
  const id = unref(busId);
  delete busses[id];
}
