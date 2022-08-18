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
const base58characters =
  '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'.split('');

/**
 * Return a shorter, nicer, more readable id
 * @param {number} length
 * @returns {string}
 */
function shortId(length) {
  let s = '';
  for (let i = 0; i < length; i++) {
    const c = Math.floor(Math.random() * 58);
    s += base58characters[c];
  }
  return s;
}

export const props = {
  id: String,
};

export const useCvId = (props, readable = false, prefix = '') => {
  const cvId = computed(() => {
    if (props?.id && props.id.length) return props.id;
    else if (readable) return prefix + shortId(5);
    return prefix + genCvId();
  });

  return cvId;
};
