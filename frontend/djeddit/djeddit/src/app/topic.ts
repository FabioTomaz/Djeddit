import {User} from "./user";

export class Topic {
  name: string;
  rules: string;
  description: string;
  userCreator: User;
  creation_date: string;
}
