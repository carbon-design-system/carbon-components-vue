import { Notification } from 'carbon-components';

const kinds = ['error', 'warning', 'info', 'success'];

export default {
  props: {
    kind: {
      type: String,
      required: true,
      validator: value => kinds.includes(value),
    },
    title: String,
    subTitle: String,
  },
  computed: {
    isAlert() {
      return kinds.indexOf(this.kind) < 2;
    },
  },
  mounted() {
    this.carbonComponent = Notification.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
