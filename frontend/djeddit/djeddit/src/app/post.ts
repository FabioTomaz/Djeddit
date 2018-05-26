import {Topic} from "./topic";
import {User} from "./user";

export class Post {
  id: number;
  topic: Topic;
  title: string;
  content: string;
  clicks: number;
  userUpVotesPost:  number[];
  userDownVotesPost: number[];
  userSaved: number[];
  userHidden: number[];
  date: string;
  userOP: User;
  nComments: number;
}
