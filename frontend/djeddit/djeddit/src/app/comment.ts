export class Comment {
  user: number;
  post: number;
  date: string;
  userUpVotesComments: number[];
  userDownVotesComments: number[];
  text: string;
  reply: number;
  nReplies: number;
}
