import useSWR from 'swr';
import { useUserServices } from '../services';
import { baseRevalidateOptions } from './swr-options';

export function useUsers() {
  const services = useUserServices();
  const swr = useSWR('get-users', () => services.get(), baseRevalidateOptions);

  return swr;
}
