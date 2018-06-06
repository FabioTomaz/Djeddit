import {User} from './user';
import {Post} from './post';
import {Profile} from './profile';

export class Comment {
  id: number;
  user: User;
  post: Post;
  date: string;
  userUpVotesComments: number[];
  userDownVotesComments: number[];
  text: string;
  reply: number;
  nReplies: number;
}
