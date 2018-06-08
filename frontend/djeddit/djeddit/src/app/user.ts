import {Profile} from './profile';

export class User {
  id?: number;
  profile?: Profile;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  date_joined?: string;
  password: string;
}
