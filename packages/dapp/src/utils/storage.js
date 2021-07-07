const STORE_PREFIX = 'maskbridge';

const getKey = key => `${STORE_PREFIX}/${key}`;

const setStorage = (key, value) =>
  localStorage.setItem(getKey(key), JSON.stringify(value));

const getStorage = key => {
  let result;
  const raw = localStorage.getItem(getKey(key));
  try {
    result = JSON.parse(raw ?? '');
  } catch {
    result = null;
  }

  return result;
};

const removeStore = key => {
  localStorage.removeItem(getKey(key));
};

export const storage = {
  get: getStorage,
  set: setStorage,
  remove: removeStore,
};
