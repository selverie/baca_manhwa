import { useAxios } from './use-axios';
import { COOKIES_KEY } from '../constants';
import { useCookies } from './use-cookies';

export function useFetcher() {
  const cookies = useCookies();
  const axiosInstance = useAxios({
    headers: {
      Authorization: `Bearer ${cookies.get(COOKIES_KEY.TOKEN)}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // if (ENV.DEBUG_MODE) {
      //   console.log(
      //     `${response.config.method?.toUpperCase()} ${response.config.url} - ${
      //       response.status
      //     } - ${JSON.stringify(response.data, null, 4).substring(0, 1000)}`,
      //   );
      // }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}
