import { computed } from 'vue';

// https://stackoverflow.com/a/2117523
function genCvId() {
  const randomValues = c =>
    typeof crypto !== 'undefined'
      ? crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4))
      : (Math.random() * 16) >> (c / 4);

  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ randomValues(c)).toString(16)
  );
}

export const props = {
  id: String,
};

export const useCvId = props => {
  const cvId = computed(() => {
    return props?.id && props.id.length ? props.id : genCvId();
  });

  return cvId;
};
