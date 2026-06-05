import { useFetcher } from '../../shared/hooks';
import { USER_ENDPOINTS } from './core/endpoints';

export function useUserServices() {
  const fetcher = useFetcher();

  function get() {
    return fetcher.get(USER_ENDPOINTS.GET);
  }

  function create(payload: ICreateUserBody) {
    return fetcher.post(USER_ENDPOINTS.CREATE, payload);
  }

  function update(id: string, payload: IUpdateUserBody) {
    return fetcher.put(USER_ENDPOINTS.UPDATE_BY_ID(id), payload);
  }

  function getById(id: string) {
    return fetcher.get(USER_ENDPOINTS.GET_BY_ID(id));
  }

  function deleteById(id: string) {
    return fetcher.delete(USER_ENDPOINTS.DELETE_BY_ID(id));
  }

  return {
    get,
    create,
    update,
    getById,
    deleteById,
  };
}
