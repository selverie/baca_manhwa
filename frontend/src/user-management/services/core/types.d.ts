type Role = 'admin' | 'user';

interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface ICreateUserBody {
  name: string;
  email: string;
}

interface IUpdateUserBody {
  name: string;
  email: string;
}
