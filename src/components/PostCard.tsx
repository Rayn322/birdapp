import type { Post, User } from '@prisma/client';
import Image from 'next/image';

type PostType = { post: Post & { author: User } };

const PostCard: React.FC<PostType> = ({ post }) => {
  return (
    <div className="m-2 w-96 rounded border-2 border-black p-2" key={post.id}>
      <div className="flex items-center gap-2">
        {post.author.image && (
          <Image
            src={post.author.image}
            width={32}
            height={32}
            alt={`${post.author.name}'s profile picture`}
            className="rounded-full"
          />
        )}
        <p>{post.author.name}</p>
      </div>
      <h1 className="mt-2 text-xl">{post.title}</h1>
      <p className="my-1">{post.content}</p>
      <p className="text-gray-600">
        {post.createdAt.toLocaleDateString()} at{' '}
        {post.createdAt.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default PostCard;
