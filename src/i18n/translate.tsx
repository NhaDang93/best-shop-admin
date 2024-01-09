import i18n from '.';

export function translate(key: string, option?: any) {
  if (option) {
    return i18n.t(key, '', option) as string;
  }
  return i18n.t(key) as string;
}
