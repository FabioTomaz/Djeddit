import {User} from "./user";

export class Profile {
  user: User;
  user_details: string;
  birth_date: string;
  registration_date: string;
  user_picture: string;
  gender: string;
  subscriptions: string[];
  profile_info_permission: string;
  profile_friends_permission: string;
  profile_topics_permission: string;
  profile_posts_permission: string;
  profile_comments_permission: string;
}
