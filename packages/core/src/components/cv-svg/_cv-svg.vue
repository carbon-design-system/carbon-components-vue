<script>
import CvWrapper from '../cv-wrapper/_cv-wrapper';

export default {
  name: 'CvSvg',
  components: { CvWrapper },
  props: {
    svg: {
      type: [String, Object],
      default: undefined,
      validator(val) {
        if (!val || typeof val === 'string') {
          return true;
        }
        return val.render !== null;
      },
    },
  },
  computed: {
    isSvg() {
      return this.svg !== undefined && this.svg.indexOf('<svg') >= 0;
    },
    isSymbol() {
      return this.svg !== undefined && !this.isSvg && this.svg.indexOf('#') >= 0;
    },
  },
  render(createElement) {
    if (typeof this.svg === 'object') {
      return createElement('component', { is: this.svg });
    } else if (this.isSvg) {
      return createElement('svg', { domProps: { innerHTML: this.svg } });
    } else {
      if (this.isSymbol) {
        return createElement('svg', {}, [createElement('use', { attrs: { href: this.svg } })]);
      } else {
        return createElement('img', { attrs: { src: this.svg } });
      }
    }
  },
};
</script>
