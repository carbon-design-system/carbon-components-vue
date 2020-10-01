import { settings as carbonSettings } from 'carbon-components';

export default {
  created() {
    this.carbonPrefix = carbonSettings.prefix;
  },
};
