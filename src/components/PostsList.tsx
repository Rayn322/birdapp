import type { Post, User } from '@prisma/client';
import PostCard from './PostCard';

type Posts = {
  posts:
    | (Post & {
        author: User;
      })[]
    | undefined;
};

const PostsList: React.FC<Posts> = ({ posts }) => {
  return (
    <div className="mt-8">
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
