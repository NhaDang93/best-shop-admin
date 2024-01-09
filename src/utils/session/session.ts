/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
function load(key: string): any {
  try {
    const almostThere = sessionStorage?.getItem(key) ?? '';
    return almostThere;
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
function save(key: string, value: any): boolean {
  try {
    sessionStorage.setItem(key, value);

    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
async function remove(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    return null;
  }
}

export const Session = {
  load,
  save,
  remove,
};
