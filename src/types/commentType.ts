export interface BlogComment {
  clerkUserId: string;
  author: {
    profileImage: string;
    username: string;
  };
  content: string;
  postedAt: string; // ISO date string
  isApproved: boolean;
}