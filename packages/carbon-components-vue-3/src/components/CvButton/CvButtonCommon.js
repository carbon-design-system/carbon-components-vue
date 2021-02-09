import { computed } from "vue";
import { carbonPrefix } from "../../global/settings";
import { buttonKinds, buttonSizes } from "./consts.js";

export const props = {
  disabled: Boolean, // hello
  icon: {
    type: [String, Object],
    default: undefined,
    validator(val) {
      if (!val || typeof val === "string") {
        return true;
      }
      return val.render !== null;
    }
  },
  iconOnly: { type: Boolean },
  kind: {
    type: String,
    default: "primary",
    validator: val => {
      const valid = buttonKinds.includes(val);
      if (!valid) {
        console.error(
          `Invalid button kind specified "${val}". Valid values are [${buttonKinds}]`
        );
      }
      return valid;
    }
  },
  size: {
    type: String,
    default: "",
    validator: val => {
      const valid = buttonSizes.includes(val);
      if (!valid) {
        console.error(
          `Invalid button size specified "${val}". Valid values are [${buttonSizes.slice(
            1
          )}]`
        );
      }
      return valid;
    }
  },
  skeleton: { type: Boolean, default: false } // { type: Boolean }
};

export const useCvButtonCommon = (iconOnly, kind, size, skeleton) => {
  const buttonClasses = computed(() => {
    const classes = [`${carbonPrefix}--btn`];

    if (skeleton) {
      classes.push(`${carbonPrefix}--skeleton`);
    }

    if (iconOnly) {
      classes.push(`${carbonPrefix}--btn--icon-only`);
    }

    if (kind && !skeleton) {
      classes.push(`${carbonPrefix}--btn--${kind.toLowerCase()}`);
    }

    if (size) {
      const _size = size === "small" ? "sm" : size;
      classes.push(`${carbonPrefix}--btn--${_size}`);
    }

    return classes;
  });

  return { buttonClasses };
};
