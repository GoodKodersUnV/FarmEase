export interface Post {
  id: string;
  username: string;
  userAvatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked?: boolean;
  tags: string[];
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface NewPost {
  image: string;
  caption: string;
  tags?: string[];
} 