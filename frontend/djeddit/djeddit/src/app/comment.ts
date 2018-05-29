import {User} from "./user";
import {Post} from "./post";

export class Comment {
  user: User;
  post: Post;
  date: string;
  userUpVotesComments: number[];
  userDownVotesComments: number[];
  text: string;
  reply: number;
  nReplies: number;
}
