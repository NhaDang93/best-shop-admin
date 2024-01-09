const cookies = require('js-cookie');

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
async function loadString(key: string): Promise<string | null> {
  try {
    return await cookies.get(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await cookies.set(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
async function load(key: string): Promise<any | null> {
  try {
    const almostThere = await cookies.get(key);
    return JSON.parse(almostThere);
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
async function save(key: string, value: any): Promise<boolean> {
  try {
    await cookies.set(key, JSON.stringify(value));
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
async function remove(key: string): Promise<void | null> {
  try {
    await cookies.remove(key);
  } catch {
    return null;
  }
}

export const Cookies = {
  load,
  save,
  loadString,
  saveString,
  remove,
};
