import useSWRMutation from 'swr/mutation';
import { useUserServices } from '../services';

export function useCreateUser() {
  const services = useUserServices();
  const swr = useSWRMutation(
    'create-user',
    (_, { arg }: { arg: ICreateUserBody }) => services.create(arg),
  );

  return swr;
}
