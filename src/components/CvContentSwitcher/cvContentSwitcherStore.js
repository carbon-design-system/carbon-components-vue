import { reactive } from 'vue';
export default reactive({
  state: { global: { latest: undefined, selected: '', owner: '' } },
  addParent(parentId) {
    this.state[parentId] = { latest: undefined, selected: '', owner: '' };
    // eslint-disable-next-line no-console
    // console.log(
    //   `addParent(${parentId})`,
    //   JSON.stringify(this.getParent(parentId))
    // );
  },
  setSelected(parentId, childId) {
    this.getParent(parentId).selected = childId;
    // // eslint-disable-next-line no-console
    // console.log(
    //   `setSelected(${parentId}, ${childId})`,
    //   JSON.stringify(this.getParent(parentId))
    // );
  },
  getSelected(parentId, childId) {
    return this.getParent(parentId).selected === childId;
  },
  removeParent(parentId) {
    delete this.state[parentId];
    // eslint-disable-next-line no-console
    // console.log(`removeParent(${parentId})`, JSON.stringify(this.state));
  },
  getParent(parentId) {
    if (!this.state[parentId]) this.addParent(parentId);
    return this.state[parentId];
  },
  setContentSelected(parentId, selected) {
    this.getParent(parentId).latest = selected;
    // // eslint-disable-next-line no-console
    // console.log(
    //   `setContentSelected(${parentId}, ${selected})`,
    //   JSON.stringify(this.getParent(parentId))
    // );
  },
  setOwnerContent(parentId, ownerId) {
    this.getParent(parentId).owner = ownerId;
    this.setContentSelected(parentId, ownerId);
    // eslint-disable-next-line no-console
    // console.log(
    //   `setOwnerContent(${parentId}, ${ownerId})`,
    //   JSON.stringify(this.getParent(parentId))
    // );
  },
  isOwnerContent(parentId, ownerId) {
    // eslint-disable-next-line no-console
    // console.log(
    //   `isOwnerContent(${parentId}, ${ownerId}) = ${
    //     this.getParent(parentId).owner === ownerId
    //   }`,
    //   JSON.stringify(this.getParent(parentId))
    // );
    return this.getParent(parentId).owner === ownerId;
  },
});
