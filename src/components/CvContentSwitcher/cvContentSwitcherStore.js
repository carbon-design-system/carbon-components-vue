import { reactive } from 'vue';
export default reactive({
  state: { global: { latest: undefined, selected: '', owner: '' } },
  addParent(parentId) {
    this.state[parentId] = { latest: undefined, selected: '', owner: '' };
  },
  setSelected(parentId, childId) {
    this.getParent(parentId).selected = childId;
  },
  getSelected(parentId, childId) {
    return this.getParent(parentId).selected === childId;
  },
  removeParent(parentId) {
    delete this.state[parentId];
  },
  getParent(parentId) {
    if (!this.state[parentId]) this.addParent(parentId);
    return this.state[parentId];
  },
  setContentSelected(parentId, selected) {
    this.getParent(parentId).latest = selected;
  },
  setOwnerContent(parentId, ownerId) {
    this.getParent(parentId).owner = ownerId;
    this.setContentSelected(parentId, ownerId);
  },
  isOwnerContent(parentId, ownerId) {
    return this.getParent(parentId).owner === ownerId;
  },
});
