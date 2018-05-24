export class Post{
  topic: string;
  title: string;
  content: string;
  clicks: number;
  userUpVotesPost:  number[];
  userDownVotesPost: number[];
  userSaved: number[];
  userHidden: number[];
  date: string;
  userOP: number;
  nComments: number;
}
