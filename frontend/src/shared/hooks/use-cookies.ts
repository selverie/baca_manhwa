import Cookies from 'js-cookie';

export function useCookies() {
  return {
    set(key: string, value: string, options?: Cookies.CookieAttributes) {
      Cookies.set(key, value, options);
    },
    get(key: string) {
      return Cookies.get(key);
    },
    remove(key: string) {
      return Cookies.remove(key);
    },
  };
}
