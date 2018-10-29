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
    useAlert() {
      return kinds.indexOf(this.kind) < 2;
    },
  },
  data() {
    return {
      carbonComponent: null,
    };
  },
  mounted() {
    this.carbonComponent = Notification.create(this.$el);
  },
  beforeDestroy() {
    this.carbonComponent.release();
  },
};
