// This module wires together the cv-content-switcher, cv-content-switcher-button and cv-content-switcher-content components.
// It allows the switcher content to appear in an unrelated location to the switcher
import Vue from 'vue';

export default {
  state: {},
  setState(ownerId, selected) {
    Vue.set(this.state, ownerId, selected);
  },
  remove(ownerId) {
    this.setState(ownerId, true); // make content visible if controller does not exist
    setTimeout(() => {
      delete this.state[ownerId];
    }, 1);
  },
  getState(ownerId) {
    if (this.state[ownerId] === undefined) {
      this.setState(ownerId, false);
    }
    return this.state[ownerId];
  },
};
