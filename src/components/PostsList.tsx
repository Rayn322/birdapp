import type { Post, User } from '@prisma/client';

type Posts = {
  posts:
    | (Post & {
        author: User;
      })[]
    | undefined;
};

const PostsList: React.FC<Posts> = ({ posts }) => {
  return (
    <div>
      {posts?.map((post) => (
        <div
          className="m-2 w-96 rounded border-2 border-black p-2"
          key={post.id}
        >
          <h1 className="text-xl">{post.title}</h1>
          <p>{post.content}</p>
          <p>
            {post.author.name} on {post.createdAt.toLocaleDateString()} at{' '}
            {post.createdAt.toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PostsList;
