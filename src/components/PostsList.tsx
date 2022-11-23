import type { Post, User } from '@prisma/client';
import PostCard from './PostCard';

type Posts = {
  posts:
    | (Post & {
        author: User;
      })[]
    | undefined;
  refetch: () => void;
};

const PostsList: React.FC<Posts> = ({ posts, refetch }) => {
  return (
    <div className="mt-8">
      {posts?.map((post) => (
        <PostCard post={post} key={post.id} refetch={refetch} />
      ))}
    </div>
  );
};

export default PostsList;
