const STORE_PREFIX = 'maskbridge';

const getKey = key => `${STORE_PREFIX}/${key}`;

const setStorage = (key, value) =>
  sessionStorage.setItem(getKey(key), JSON.stringify(value));

const getStorage = key => {
  let result;
  const raw = sessionStorage.getItem(getKey(key));
  try {
    result = JSON.parse(raw ?? '');
  } catch {
    result = null;
  }

  return result;
};

const removeStore = key => {
  sessionStorage.removeItem(getKey(key));
};

export const session = {
  get: getStorage,
  set: setStorage,
  remove: removeStore,
};
