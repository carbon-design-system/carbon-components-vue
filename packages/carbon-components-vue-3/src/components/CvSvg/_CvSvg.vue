<script>
import { computed, h } from "vue";

export default {
  name: "CvSvg",
  props: {
    svg: {
      type: [String, Object],
      default: undefined,
      validator(val) {
        if (!val || typeof val === "string") {
          return true;
        }
        return val.setup !== null;
      }
    }
  },
  setup(props) {
    const isSvg = computed(
      () => props.svg !== undefined && props.svg.indexOf("<svg") >= 0
    );
    const isSymbol = computed(
      () =>
        props.svg !== undefined && !props.isSvg && props.svg.indexOf("#") >= 0
    );

    return () => {
      if (typeof props.svg === "object") {
        // assume an @carbon/icons-vue icon
        return h(props.svg);
      } else if (isSvg.value) {
        // an SVG document
        return h("svg", { domProps: { innerHTML: props.svg } });
      } else {
        if (isSymbol.value) {
          return h("svg", {}, [h("use", { attrs: { href: props.svg } })]);
        } else {
          // an image of some description.
          return h("img", { attrs: { src: props.svg } });
        }
      }
    };
  }
};
</script>
